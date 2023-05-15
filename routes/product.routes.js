const express = require('express'); 
const router = express.Router();  

const Product = require("../models/Product.model.js")


//* GET /product/products => renderiza todos los productos

router.get('/products', (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('products/products.hbs', {products: products})
      })
    .catch(err => next(err))
})

//* GET /product/products/:id => renderiza un producto por su id

router.get('/products/:id', (req, res, next) => {
    Product.findById(req.params.id)
   .then(products => {
        res.render('products/product-details.hbs', {products: products})
      })
   .catch(err => next(err))
})







module.exports = router;  