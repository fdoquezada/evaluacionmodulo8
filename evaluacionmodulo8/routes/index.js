//carga de librias
const express=require("express");
const fs=require("fs");
const path=require("path");

//crear un router donde se guardaran las rutas
const router=express.Router();
//guardar el nombre de este archivo (index.js)
const basename= path.basename(__filename);

//leer los archvinos que hay en la carpeta
fs
  .readdirSync(__dirname) //buscar todos los nombres de los archivos de la carpeta (routes)
  .filter(file => { //filtro que devuelve los archovs que:
    //no empiezen por "."
    //que no sean este archvivo (index.js)
    //que tengan extension .js
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
   //esto es nuevo
   //router.use("/login",require("./routes/login.js"));
   router.use("/"+path.parse(file).name,require("./"+path.parse(file).base));
  });
  
module.exports=router