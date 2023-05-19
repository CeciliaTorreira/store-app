const express = require("express");
const router = express.Router();

// Requerimos modelo de usuario
const User = require("../models/User.model.js");

// Requerimos paquete de bcrypt ya instalado
const bcrypt = require("bcryptjs");

//* RUTAS DE AUTENTIFICACIÓN

//* GET "/auth/signup" => Renderiza el formulario de creación de usuario

router.get("/signup", (req, res, next) => {
  res.render("authentication/signup.hbs");
});

//* POST "/auth/signup" => Crea un nuevo usuario y lo añade a la base de datos

router.post("/signup", (req, res, next) => {
  //! Sabemos que la info viene de req.body
  if (
    req.body.email === "" ||
    req.body.username === "" ||
    req.body.password === ""
  ) {
    res.render("authentication/signup.hbs", {
      errorMessage: "Todos los campos son obligatorios.",
    });
    return;
  }

  // Vamos a validar la contraseña ☼ ♥ ♫ ♫ ► ☼ ♣ ♫

  const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPattern.test(req.body.password) === false) {
    res.render("authentication/signup.hbs", {
      errorMessage:
        "Tu contraseña necesita al menos una mayúscula, un caracter especial y una longitud de ocho caracteres.",
    });

    return;
  }

  User.findOne({ email: req.body.email, username: req.body.username })
    .then((foundUser) => {
      if (foundUser !== null) {
        res.render("authentication/signup.hbs", {
          errorMessage:
            "Ya existe una cuenta con ese nombre de usuario o correo electrónico.",
        });
        return;
      }
      return bcrypt.genSalt(12);
    })
    .then((salt) => {
      return bcrypt.hash(req.body.password, salt);
    })
    .then((hashPassword) => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });
    })
    .then(() => {
      res.redirect("/auth/login");
    })

    .catch((error) => {
      console.log(error);
    });
});

//* GET "/auth/login" => Renderizamos la página de inicio de sesión

router.get("/login", (req, res, next) => {
  res.render("authentication/login.hbs");
});

//* POST "/auth/login" => Recibe la información del usuario y le permite acceder a su cuenta.

router.post("/login", async (req, res, next) => {
  // Todos los campos son obligatorios de rellenar.
  if (req.body.username === "" || req.body.password === "") {
    res.render("authentication/login.hbs", {
      errorMessage: "Por favor, introduce tu nombre de usuario y contraseña.",
    });
    return;
  }

  try {
    // Comprobamos que las credenciales coinciden con una cuenta ya creada en la base de datos.

    const foundUser = await User.findOne({ username: req.body.username });

    if (foundUser === null) {
      res.render("authentication/login.hbs", {
        errorMessage: "No existe ningún usuario registrado con ese nombre.",
      });

      return;
    }

    // Comprobamos que la contraseña coincide con la cuenta en la base de datos.

    const correctPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (correctPassword === false) {
      res.render("authentication/login.hbs", {
        errorMessage: "Contraseña incorrecta.",
      });

      return;
    }

    req.session.activeUser = foundUser; // Sesión creada

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
});

//* GET "/auth/logout" => Cierra la sesión actual

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
