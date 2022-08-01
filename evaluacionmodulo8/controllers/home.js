//función GET de la ruta /home
const getHome=function (req,res){
    res.render("index",req.datos);
}
//exportar funciones
module.exports={getHome}

