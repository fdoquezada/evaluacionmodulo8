//cargar librerias
const bcrypt=require("bcrypt");
const jwt=require("../utils/jwt");
const {Usuario}=require("../models");
require("dotenv").config();


const getRegister=function(req,res){
    res.render("register");
}

const postRegister=async function(req,res){
    //cargar datos del formulario
    const usuario=req.body;
    //--------------chequeos del formulario
    //revisar si existen estos datos
    if(!usuario){
        return res.status(404).json({error:"No se encontraron datos"});
    }
    //no hay correo
    if(!usuario.email){
        return res.status(404).json({error:"No se encontraron datos de email"});
    }
    //si no hay password
    if(!usuario.password || usuario.password.trim()==""){
        return res.status(404).json({error:"No se encontraron datos de password"});
    }
    //---------chequeos de ls base de datos
    let userDB;
    try {
        userDB=await Usuario.findByPk(usuario.email);
    } catch (error) {
        console.log("Error DB en postRegister user:"+ error.message);
        return res.status(500).json({error:"Error interno"});
    }
    if(userDB){
        return res.status(500).json({error:"usuario ya está registrado"});
    }
    //chquequeo de username
    let usernameDB;
    try {
        usernameDB=await Usuario.findOne({where:{username:usuario.username}});
    } catch (error) {
        console.log("Error DB en postRegister username:"+ error.message);
        return res.status(500).json({error:"Error interno"});
    }
    if(usernameDB){
        return res.status(500).json({error:"username ya está en uso, elija otro"});
    }
    //todo ok, encriptamos y damos rol
    usuario.password=await bcrypt.hash(usuario.password,Number(process.env.JWT_SALT));
    usuario.idRol=2;
    //guardar los datos
    try {
        await Usuario.create(usuario);
    } catch (error) {
        console.log("Error DB en insert registro:"+ error.message);
        return res.status(500).json({error:"Error interno"});
    }
    //todo salió OK
    const token = await jwt.generarToken(usuario);
    //enviar cookie
    res.cookie(process.env.JWT_COOKIE, token, { httpOnly: true });
    //enviamos info en la response
    res.header('auth-token', { token }).json({
        error: null,
        msg: "autenticación correcta",
        token: token
    })

}

module.exports={getRegister,postRegister}

