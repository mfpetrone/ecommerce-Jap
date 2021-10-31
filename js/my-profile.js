//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    document.getElementById("guardarcambios").onclick = function () {
        let primerNombre = document.getElementById("primernombre").value;
        let segundoNombre = document.getElementById("segundonombre").value;
        let primerApellido = document.getElementById("primerapellido").value;
        let segundoApellido = document.getElementById("segundoapellido").value;
        let edad = document.getElementById("edad").value;
        let email = document.getElementById("e-mail").value;
        let tel = document.getElementById("telefono").value;


        //cree el objeto - el array
        let guardardatos = {

            "primernombre": primerNombre,
            "segundonombre": segundoNombre,
            "primerapellido": primerApellido,
            "segundoapellido": segundoApellido,
            "edad": edad,
            "emailusuario": email,
            "telefonocontacto": tel
        };

        //guardo los datos, almaceno los datos

        localStorage.setItem('guardadatos', JSON.stringify(guardardatos));
    };
    //quiero que se me devuelvan los datos que guarde en el json 
    let datosamostrar = JSON.parse(localStorage.getItem('guardadatos'));
    //console.log(datosamostrar)
    document.getElementById("primernombre").value = datosamostrar.primernombre;
    document.getElementById("segundonombre").value = datosamostrar.segundonombre;
    document.getElementById("primerapellido").value = datosamostrar.primerapellido;
    document.getElementById("segundoapellido").value = datosamostrar.segundoapellido;
    document.getElementById("edad").value = datosamostrar.edad;
    document.getElementById("e-mail").value = datosamostrar.emailusuario;
    document.getElementById("telefono").value =  datosamostrar.telefonocontacto ;
});