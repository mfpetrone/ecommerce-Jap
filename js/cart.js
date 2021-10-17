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

});