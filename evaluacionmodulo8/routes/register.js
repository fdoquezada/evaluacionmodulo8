//carga de las librerias
const express=require("express");
//inicializacion del router donde guardaremos las rutas del login
const router=express.Router();
//carga de las funciones del controlador del login
const {getRegister,postRegister}=require("../controllers/register");
const {prevenirLoginRegistro}=require("../middleware/autenticacion");
//agregar las rutas
router.get("/",prevenirLoginRegistro,getRegister);
router.post("/",prevenirLoginRegistro,postRegister);

module.exports=router;