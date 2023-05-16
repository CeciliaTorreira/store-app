const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model.js");
const Purchase = require("../models/Purchase.model.js");


const {isLoggedIn, isAdmin} = require("../middlewares/authentication.middlewares.js")


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
      res.render("products/product-details.hbs", { products: products,
      isAdmin: req.session.activeUser.role === "admin" && req.session.activeUser,
      activeUser: req.session.activeUser });
    })
    .catch((err) => next(err));
});

//* GET /product/:id/purchase => comprar un producto por su id

router.get("/:id/purchase", isLoggedIn, (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.render("products/purchase.hbs", { product: product });
    })
    .catch((err) => next(err));
});

//* POST /product/:id/purchase => comprar un producto por su id

router.post("/:id/purchase", isLoggedIn, (req, res, next) => {

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


//* GET /product/product-search => Renderiza la vista de la búsqueda de un producto

router.get("/product-search", (req, res, next)=>{
  Product.findOne({ name: req.query.productName })
.then((foundProduct)=>{
  res.render("products/search.hbs", {
    foundProduct: foundProduct
  })
})
.catch((error)=>{
  console.log(error);
})
})


//* GET "/product/products/:id/edit" => Renderiza la vista para editar un producto

router.get("/products/:id/edit", isAdmin, isLoggedIn, (req, res, next)=>{
  Product.findById(req.params.id)
  .then((product)=>{
     res.render("products/edit-product.hbs", {
      product: product
     })
  })
  .catch((error)=>{
    next(error)
})  
})   

//* POST "/product/products/:id/edit" => Recibe la información del admin y actualiza un producto

router.post("/products/:id/edit", isAdmin, isLoggedIn, (req, res, next)=>{
  Product.findByIdAndUpdate(req.params.id, {
   name: req.body.name, 
   price: req.body.price, 
   category: req.body.category,
   description: req.body.description}, 
   {new: true})
   
   .then(()=>{
    res.redirect("/product/products")
   })
   .catch((error)=>{
    next(error);
   })
  
})



//* POST "/product/products/:id/delete" => Borra un producto de la base de datos

router.post("/products/:id/delete", isAdmin, isLoggedIn, (req, res, next)=>{
  Product.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect("/product/products")
  })
  .catch((error)=>{
    console.log(error);
  })
})



module.exports = router;
