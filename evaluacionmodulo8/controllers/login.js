//carga de modelo
const {Usuario} = require("../models");
const jwt=require("../utils/jwt");
const bcrypt=require("bcrypt");
require("dotenv").config()

const getLogin=function(req,res){
    res.render("login");
}
//post que captura los datos de email y password del formulario de login
const postLogin=async function(req,res){
    //revisa si existe el body
    if(!req.body){
        return res.status(500).json({error:"ERROR BODY"});
    }
    //revisa si existe el email
    if(!req.body.email){
        return res.status(500).json({error:"ERROR EMAIL"});
    }
    //viene ok los datos  
    let usuario;
    //buscar usuario por el email
    try {
        usuario=await Usuario.findByPk(req.body.email);
    } catch (error) {
        console.log("Error al buscar usuario:" + error.message);
        return res.status(500).json({error:"Error BD"});
    } 
    //revisar si se encontró un usuario con ese mail
    if(!usuario){
        return res.status(400).json({error:"Usuario no encontrado"});
    }
    //los password no coinciden
    if(!(await bcrypt.compare(req.body.password,usuario.password))){
        return res.status(401).json({error:"Error de credenciales"});
    }
    //todo salió OK
    const token=await jwt.generarToken(usuario);
    //enviar cookie
    res.cookie(process.env.JWT_COOKIE,token,{httpOnly:true});
    //enviamos info en la response
    res.header('auth-token',{token}).json({
        error:null,
        msg:"autenticación correcta",
        token:token
    })

}

module.exports={getLogin,postLogin}