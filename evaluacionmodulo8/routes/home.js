//cargar express
const express=require("express");
//funciones
const {getHome}=require("../controllers/home")
const {verificarSesionCookie}=require("../middleware/autenticacion");
//creamos el router
const router=express.Router();


//asingar la ruta
router.get("/",verificarSesionCookie,getHome);

module.exports=router