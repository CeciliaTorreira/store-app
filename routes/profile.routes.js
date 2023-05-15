const express = require('express'); 
const router = express.Router();  

const User = require("../models/User.model.js")
const Product = require("../models/Product.model.js")
// const Purchase = require("../models/Purchase.model.js")


// * RUTAS DE USUARIO 


//* GET "/profile" => Renderiza el perfil de un usuario estándar.

router.get("/", (req, res, next) =>{
    User.findOne(req.session.activeUser)
    .populate("purchasesMade")
    .then((foundUser)=>{
        res.render("users-views/dashboard.hbs", {
            foundUser: foundUser
        })
    })
    .catch((error) => {
        next(error)
    })
})



//* RUTAS PRIVADA PARA ADMINS

//* GET "/profile/admin" ==> Renderiza la vista privada únicamente para admins

router.get("/admin", (req, res, next)=>{
    User.findOne(req.session.activeUser)
    .then((foundUser)=>{

        res.render("users-views/admin-dashboard.hbs", {
            foundUser: foundUser
        })

    })
    .catch((error) => {
        next(error)
    })
})


//* GET "/profile/add-product" => Renderiza la vista privada de admins para crear nuevos productos y añadirlos a la base de datos.

router.get("/add-product", (req, res, next)=>{
  
  res.render("users-views/admin-add-product.hbs")

})



//* POST "/profile/add-product" => Recibe la información del admin y crea el producto en la base de datos

router.post("/add-product", (req, res, next)=>{
    Product.create({
   name: req.body.name,
   price: req.body.price,
   category: req.body.category,
   description: req.body.description,
   // productImage: req.file.path // todo
    })
    .then(()=>{
        res.redirect("/profile/admin")
    })
    .catch((error)=>{
        console.log(error)
      })
    // res.render("users-views/admin-add-product.hbs")

})





module.exports = router;  