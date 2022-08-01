//cargar express
const express=require("express");
//funciones
const {getAdmin}=require("../controllers/admin")
const {verificarSesionCookie}=require("../middleware/autenticacion");
const {verificarPermiso}=require("../middleware/permisos");
//creamos el router
const router=express.Router();


//asingar la ruta
router.get("/",verificarSesionCookie,verificarPermiso,getAdmin);

module.exports=router