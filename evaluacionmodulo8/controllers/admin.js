//función GET de la ruta /home
const getAdmin=function (req,res){ 
    res.render("admin",req.datos);
}
//exportar funciones
module.exports={getAdmin}