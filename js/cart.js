//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    fetch(CART_INFO_URL)
        .then(response => response.json())
        .then(data => {

            let nombre = data.articles[0].name
            let cantidad = data.articles[0].count
            let preciounitario = data.articles[0].unitCost
            let moneda = data.articles[0].currency
            let imagen = data.articles[0].src


            document.getElementById("productoseleccionado").innerHTML += `
                <div>
                <table class="table table-hover">
                    <tr>
                        <td ></td>
                        <td ><strong>Producto</strong></td>
                        <td ><strong>Costo unitario</strong></td>
                        <td ><strong>Cantidad</strong></td>
                        <td ><strong>Subtotal</strong></td>
                    </tr>
                    <tr>
                        <td><img src="` + imagen + `" class="img-thumbnail"></td>
                        <td>`+ nombre + `</td>
                        <td> ` + moneda + " " + preciounitario + `</td>
                        <td >
                            <input id="cantselect" type="number" min="2" value="`+ cantidad + `" class=cantidadselecc>
                            
                        </td>
                        <td id="subtotal"></td>
                    </tr>
                </table>
            `
    let cantidadacomp= document.getElementById("cantselect").value
    subtotal= preciounitario * cantidadacomp
    
    
    //console.log(cantidadacomp)

    document.getElementById("subtotal").innerHTML=  `<strong>` + moneda + " " + subtotal+`</strong> `


    });
    // document.getElementById("costoenvio").onclick = function () {
    //         let premium= document.getElementById("premiumradio").value
    //         let express= document.getElementById("expressradio").value
    //         let estandar= document.getElementById("estandaradio").value
    //         if(premium!="") {localStorage.setItem("premiumradio", premium)
    //             if(express!="") { localStorage.setItem("expressradio", express)

    //         }}

   // }  
});