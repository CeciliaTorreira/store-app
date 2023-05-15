const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model.js");
const Purchase = require("../models/Purchase.model.js");

//* GET /product/products => renderiza todos los productos

router.get("/products", (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("products/products.hbs", { products: products });
    })
    .catch((err) => next(err));
});

//* GET /product/products/:id => renderiza un producto por su id

router.get("/products/:id", (req, res, next) => {
  Product.findById(req.params.id)
    .then((products) => {
      res.render("products/product-details.hbs", { products: products });
    })
    .catch((err) => next(err));
});

//* GET /product/:id/purchase => comprar un producto por su id

router.get("/:id/purchase", (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.render("products/purchase.hbs", { product: product });
    })
    .catch((err) => next(err));
});

//* POST /product/:id/purchase => comprar un producto por su id

router.post("/:id/purchase", (req, res, next) => {
  if (
    req.body.buyerName === "" ||
    req.body.shippingAddress === "" ||
    req.body.paymentMethod === ""
  ) {
    res.render("products/purchase.hbs", {
      errorMessage: "Por favor, rellene todos los campos",
    });
    return;
  }
  Product.findById(req.params.id)
    .then((response) => {
      Purchase.create({
        buyerName: req.body.buyerName,
        shippingAddress: req.body.shippingAddress,
        purchasedProduct: response,
        paymentMethod: req.body.paymentMethod,
      });
    })

    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => next(err));
});

module.exports = router;
