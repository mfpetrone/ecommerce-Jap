//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    fetch(CART_INFO_URL)
        .then(response => response.json())
        .then(data => {

            let nombre = data.articles[0].name
            let cantidad = data.articles[0].count
            let preciounitario = data.articles[0].unitCost
            let moneda = data.articles[0].currency
            let imagen = data.articles[0].src
            let subtotales = cantidad * preciounitario
            let costoenvio = parseFloat(document.querySelector('input[name="deliverytype"]:checked').value)
            //console.log(costoenvio)

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
                            <input id="cantselect" type="number" min="1" value="`+ cantidad + `" class=cantidadselecc>
                            
                        </td>
                        <td id="subtotal"></td>
                    </tr>
                </table>
            `

            //cuando carga la pagina
            calcular()

            function calcular() {
                subtotales = cantidad * preciounitario
                costoenvio = parseFloat(document.querySelector('input[name="deliverytype"]:checked').value)
                document.getElementById("subtotal").innerHTML = `<strong>` + moneda + " " + subtotales + `</strong> `
                document.getElementById("costoproducto").innerHTML = `<strong>` + moneda + " " + subtotales + `</strong> `
                document.getElementById("costoenvio").innerHTML = `<strong>` + moneda + " " + Math.round((subtotales * costoenvio), 0) + `</strong>`
                document.getElementById("total").innerHTML = `<strong>` + moneda + " " + Math.round(subtotales * (1 + costoenvio), 0) + `</strong>`
                //console.log(subtotales,costoenvio,cantidad)
            }
            //cuando ocurre un change en la cantidad.
            document.getElementById("cantselect").addEventListener("change", function (e) {
                cantidad = parseInt(e.target.value);
                calcular()
            });

            Array.from(document.querySelectorAll('input[name="deliverytype"]')).map(item => item.addEventListener("change", () => calcular()))
        });

    
       
        
        document.getElementById("credito").onclick = function(){
             if (document.getElementById("credito").checked){
            document.getElementById("infotarjeta").style.display = "block";
            document.getElementById("infobanco").style.display = "none";
            } 
        }
        document.getElementById("banco").onclick = function(){
            if (document.getElementById("banco").checked){
           document.getElementById("infobanco").style.display = "block";
           document.getElementById("infotarjeta").style.display = "none";
           } 
        }
 
    function habilitar() {
        let ntarjeta = document.getElementById("numerotarjeta").value
        
        let codseguridad = document.getElementById("codseguridad").value
        let vencimiento = document.getElementById("vencimiento").value
        let cuenta = document.getElementById("numerocuenta").value
        
        if (document.getElementById("credito").checked ||document.getElementById("banco").checked){
            if(ntarjeta.length != 0 && codseguridad.length != 0 && vencimiento.length != 0 || cuenta.length != 0){
                document.getElementById("guardar").disabled = false 
            }   
        } 
          else{
            document.getElementById("guardar").disabled = true 
            }
    }
    document.getElementById("numerotarjeta").addEventListener("keyup",habilitar)
    document.getElementById("codseguridad").addEventListener("keyup",habilitar)
    document.getElementById("vencimiento").addEventListener("keyup",habilitar)
    document.getElementById("numerocuenta").addEventListener("keyup",habilitar)
    document.getElementById("guardar").addEventListener("click",() => {alert("Medio de pago válido")})

    document.getElementById("comprar").onclick = function (){
        let pais = document.getElementById("pais").value
        let calle = document.getElementById("calle").value
        let npuerta = document.getElementById("npuerta").value
      

        if(pais.length == 0 ){ alert("Ingresar el pais")

        }
          if(calle.length == 0 ){ alert("Ingresar la calle")

        }
          if(npuerta.length == 0 ){ alert("Ingresar el N° de puerta")

        }
          if(!document.getElementById("credito").checked && !document.getElementById("banco").checked){ alert("Debe indicar medio de pago")}
        
        if(pais.length !=0 && calle.length !=0 && npuerta.length != 0 && (document.getElementById("credito").checked || document.getElementById("banco").checked )){
            alert("Compra realizada con éxito")
        }
        
     }
        

});
