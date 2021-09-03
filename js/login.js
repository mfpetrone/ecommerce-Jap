//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    
    document.getElementById("sendBtn").onclick = function() {
        let usuario = document.getElementById("usuario").value
        
        let contraseña = document.getElementById("clave").value;
        
        if (usuario != " " && contraseña != " ") {

            localStorage.setItem("usuario", usuario)
            window.location.href = "./home.html";

        }
        
        

    }

});
 