const{Usuario}=require("../models");

const verificarPermiso=async function(req,res,next){
    //obtenero los datos del token (que se generarorn en
    //el middleware anterior de autenticacion)
    let datos=req.datos;
    //busco el usuario en la BD
    let usuario;
    try {
        usuario=await Usuario.findByPk(datos.email);
    } catch (error) {
        console.log("Error al buscar permiso:"+ error.message);
        return res.status(500).json({error:"Error interno"});
    }
    //existe el usuario
    if(!usuario){
        return res.status(403).render("forbidden");
    }
    //si el usuario existe pero no tiene permiso:
    if(usuario.idRol!=1){
        return res.status(403).render("forbidden");
    }
    //todo ok
    next();
}

module.exports={verificarPermiso}