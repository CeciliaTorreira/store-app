//! Función para comprobar si un usuario tiene sesion activa o no
//! Si no ha iniciado sesión no se le permite acceso a rutas privadas de perfiles

function isLoggedIn(req, res, next) {
    if (req.session.activeUser === undefined){
        res.redirect("/")
    }
    else 
    {
        next()
    }
}

//! Función para determinar si un usuario es admimistrador o no

function isAdmin(req, res, next){
    if(req.session.activeUser.role === "admin"){
        next()
    }
    else{
        res.redirect("/")
    }
}


function updateLocals(req, res, next){
    if (req.session.activeUser === undefined){
        res.locals.isUserActive = false
    }
    else{
        res.locals.isUserActive = true
    }
    next()
}


module.exports = { 
isLoggedIn: isLoggedIn,
updateLocals: updateLocals,
isAdmin: isAdmin
}