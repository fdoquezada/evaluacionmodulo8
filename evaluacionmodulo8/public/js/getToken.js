//se ejecuta cuando se carga la página
window.onload=function(e){
    //carga del frmulario
    let formulario=document.querySelector("form");
    //agregar el evento submit al formulario
    formulario.addEventListener("submit",async function(e){
        e.preventDefault();
        //generar objeto con las credenciales
        let credenciales={
            //podemos obtenerlo por el id:
            //email:document.getElementById("floatingInput").value
            //o por el atributo "name"
            email:formulario.email.value,
            password:formulario.password.value
        }
        //enviar los datos al server
        let respuesta=await fetch("/login",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(credenciales)
        })        
        let datos=await respuesta.json();
        //verificar que existan datos

        let mensajeError = document.getElementById("msjError");
        if(!datos){
            //alert("Error: error en la comunicación");
            mensajeError.classList.remove("esconderError");
            mensajeError.classList.add("mostrarError");
            mensajeError.innerText="Error: error en la comunicación"
            return;
        }
        //rvisar si hay errores
        if(datos.error){
            //alert(datos.error);            
            mensajeError.classList.remove("esconderError");
            mensajeError.classList.add("mostrarError");
            mensajeError.innerText=datos.error
            return;
        }
        //si todo está OK
        //paso opcional para cuando trabajen con API RESTful
        localStorage.setItem("TOKEN_EJERCICIO_JWT",datos.token);
        //redireccionar al home
        location.assign("/home");

    })
}