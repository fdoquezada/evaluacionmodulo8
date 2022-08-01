//carga de librerias
const express = require('express')
const router=require("./routes");
const bodyparser=require("body-parser");
const cookieParser=require("cookie-parser");

//configuracion
const app = express();
//carpeta de archivos estáticos
app.use(express.static("public"));
//motor de vistas ejs
app.set("view engine","ejs");
//carpeta de las vistas
app.set("views",__dirname+"/views");
//body parser para leer datos de formulario
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.json());

//carga de rutas---siempre al final
app.use("/",router);
//redireccion de la ruta raíz
app.get("/",function(req,res){
    res.redirect("/home");
})

module.exports=app;
