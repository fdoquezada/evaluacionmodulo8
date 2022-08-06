//cargar librerias o módulos
const chalk=require("chalk");
const app=require("./app");
require("dotenv").config();

//iniciamos el server
app.listen(process.env.APP_PORT,function(){
    console.log();
    console.log("***************"+
    chalk.cyan.inverse("servidor iniciado en puerto "+
    process.env.APP_PORT)
    +"***************")
})



