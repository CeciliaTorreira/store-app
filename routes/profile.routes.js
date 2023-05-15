const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");
const Product = require("../models/Product.model.js");
const Purchase = require("../models/Purchase.model.js");

// * RUTAS DE USUARIO

//* GET "/profile" => Renderiza el perfil de un usuario estándar.

router.get("/", (req, res, next) => {
  User.findOne(req.session.activeUser)
    .populate("purchasesMade")
    .then((foundUser) => {
      res.render("users-views/dashboard.hbs", {
        foundUser: foundUser,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//* RUTAS PRIVADA PARA ADMINS

//* GET "/profile/admin" ==> Renderiza la vista privada únicamente para admins

router.get("/admin", async (req, res, next) => {
  try {
    const foundUser = await User.findOne(req.session.activeUser)
    res.render("users-views/admin-dashboard.hbs", {
      foundUser: foundUser,
    });
  } catch (error) {
    next(error);
  }
});

//* GET "/profile/add-product" => Renderiza la vista privada de admins para crear nuevos productos y añadirlos a la base de datos.

router.get("/add-product", (req, res, next) => {
  res.render("users-views/admin-add-product.hbs");
});

//* POST "/profile/add-product" => Recibe la información del admin y crea el producto en la base de datos

router.post("/add-product", (req, res, next) => {
  if (
    req.body.name === "" ||
    req.body.price === "" ||
    req.body.category === "" ||
    req.body.description === ""
  ) {
    res.render("users-views/admin-add-product.hbs", {
      errorMessage: "Por favor, rellene todos los campos",
    });
    return;
  }
  Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    // productImage: req.file.path // todo
  })
    .then(() => {
      res.redirect("/profile/admin");
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render("users-views/admin-add-product.hbs")
});

//* GET /profile/purchase-history => Renderiza la vista de las compras en la web

router.get("/purchase-history", (req, res, next) => {
    Purchase.find().populate("purchasedProduct")
   
    .then((foundPurchase) => {
         res.render("users-views/admin-purchase-history.hbs", {
            foundPurchase: foundPurchase
         })
    })

    .catch((error) => {
        next(error);
    })
})

module.exports = router;
