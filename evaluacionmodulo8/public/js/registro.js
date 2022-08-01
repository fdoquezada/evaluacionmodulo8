window.onload=function(e){
    let formulario=document.querySelector("form");
    formulario.addEventListener("submit",async function(e){
        //evitar que el formulario se mande solo
        e.preventDefault();
        //revisar que el password no esté vacío
        if(formulario.password.value.trim()==""){
            return;
        }
        //revisar si los password (password y confirmación) son iguales o no 
        let errormsg=document.getElementById("errormsg");
        if(formulario.password.value!=formulario.password2.value){            
            //muestra el mensaje de error
            errormsg.classList.remove("esconderError");
            errormsg.classList.add("mostrarError");
            return;
        }
        //esconde el mensaje de error
        errormsg.classList.remove("mostrarError");
        errormsg.classList.add("esconderError");

        //crear la estructura con datos apra enviar el registro
        const credenciales={
            email:formulario.email.value,
            username:formulario.username.value,
            nombre:formulario.nombre.value,
            password:formulario.password.value,
        }

        //enviar datos
        //enviar los datos al server
        let respuesta=await fetch("/register",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(credenciales)
        })      
        let mensajeError = document.getElementById("msjError");
        //obtener los datos
        let datos=await respuesta.json();  
        //revisar los datos
        if(!datos){
            //alert("Error de comunicación");
            mensajeError.classList.remove("esconderError");
            mensajeError.classList.add("mostrarError");
            mensajeError.innerText="Error en la comunicación"
            return;
        }
        //verificar si viene algún error
        if(datos.error){
            //alert(datos.error)
            mensajeError.classList.remove("esconderError");
            mensajeError.classList.add("mostrarError");
            mensajeError.innerText=datos.error
            return;
        }

        //todo ok
        location.assign("/home");

    })

}
