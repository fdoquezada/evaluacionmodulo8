require("dotenv").config();
const jwt=require("../utils/jwt");

//esta es para APIRESTful
const verificarSesionHeader=async function(req,res,next){

}
//esta es para vistas
const verificarSesionCookie=async function(req,res,next){
    //si no hay cookie, redirijo
    if(!req.cookies){        
        return res.redirect("/login");
    }
    //leo la cookie
    const token=req.cookies[process.env.JWT_COOKIE];
    //si no hay token, lo mando al login
    if(!token){        
        return res.redirect("/login");
    }
    //revisar si el token es válido
    let datos=await jwt.verificarToken(token);
    //si el token no es válido, redirijo
    if(!datos){        
        return res.redirect("/login");
    }
    //hay datos. todo OK, agrego los datos al request y sigo el flujo
    //en este caso, hacia el controller (a menos que agregue otro middleware antes)
    req.datos=datos
    next();
}

const prevenirLoginRegistro=async function(req,res,next){
    //si no hay cookie, redirijo
    if(!req.cookies){        
        return next();
    }
    //leo la cookie
    const token=req.cookies[process.env.JWT_COOKIE];
    //si no hay token, lo mando al login
    if(!token){        
        return next();
    }
    //revisar si el token es válido
    let datos=await jwt.verificarToken(token);
    //si el token no es válido, redirijo
    if(!datos){        
        return next();
    }
    //hay datos. todo OK, agrego los datos al request y sigo el flujo
    //en este caso, hacia el controller (a menos que agregue otro middleware antes)    
    return res.redirect("/");
}

module.exports={verificarSesionHeader,verificarSesionCookie,prevenirLoginRegistro}
