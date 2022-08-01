//carga de las librerias
const express=require("express");
//inicializacion del router donde guardaremos las rutas del login
const router=express.Router();
//carga de las funciones del controlador del login
const {getLogout}=require("../controllers/logout");
//agregar las rutas
router.get("/",getLogout);


module.exports=router;