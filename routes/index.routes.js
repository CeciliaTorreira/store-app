const express = require('express');
const router = express.Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//* AUTH.ROUTES 

const authRouter = require("./auth.routes.js") 
router.use("/auth", authRouter) 


//* RUTAS DE PERFIL

const profileRouter = require("./profile.routes.js") 
router.use("/profile", profileRouter) 

//* RUTAS DE PRODUCTOS

const productRouter = require("./product.routes.js") 
router.use("/product", productRouter)




module.exports = router;
