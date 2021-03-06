document.addEventListener("DOMContentLoaded", function (e) {
    var listaproductos = [];
    let url = "https://japdevdep.github.io/ecommerce-api/product/all.json";

    fetch(url)
        .then(response => response.json())
        .then(data => {


            for (let i = 0; i < data.length; i++) {
                let auto = data[i]
                listaproductos.push(auto)
                let nombre = auto.name;
                let descripcion = auto.description;
                let moneda = auto.currency;
                let costo = auto.cost;
                let imagen = auto.imgSrc;
                let cantvendido = auto.soldCount;



                //linea 24 agregue etiqueta a para que direccione al html product-info
                document.getElementById("producto-list-container").innerHTML += `
                    <div class="col-md-6">
                        <div class="card mb-6 shadow-sm">
                            <a title="producto" href="product-info.html"><img src="` + imagen + `" alt=" class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></a>
                            <div class="card-body">
                                <h4 class="card-text">`+ nombre + `</h4>
                                <p>` + moneda + " " + costo + `</p> 
                                <p class="card-text">` + descripcion + `</p>
                                <p class="card-text">`+ "Cantidad vendida: " + cantvendido + `</p>
                                 
                            </div>
                        </div>
                    </div> `

                // esto era lo que tenia antes de cambiar a los cuadrados
                //              <div >
                //                  <div class="col-md-6 mb-3" > 
                //                     <div class = "card mb-4 shadow-sm">
                //                         <a title="producto" href="product-info.html"><img src="` + imagen + `" alt="` + descripcion + `" class="img-thumbnail"> </a>

                //                         <div class= "card-body" id="prueba">
                //                             <div class="d-flex w-100 justify-content-between">
                //                             <h4 class="card-text">`+ nombre + `</h4>

                //                             </div>

                //                             <div><p class="mb-1">` + descripcion + `</p></div>
                //                             <div><p class="mb-1">`+ "Cantidad vendida: " + cantvendido + `</p></div>
                //                             <div><small class="text-muted">` + moneda + " " + costo + `</small></div>
                //                         </div>
                //                     </div>
                //                 </div>

                //          `


            }
            // document.getElementById("producto-list-container").innerHTML = prueba + "</div>"+ "</div>";
        });



    document.getElementById("rangoafiltrarbtn").onclick = function () {
        let min = document.getElementById("minimo").value;
        let max = document.getElementById("maximo").value;

        let url = "https://japdevdep.github.io/ecommerce-api/product/all.json";

        let select = "";

        fetch(url)
            .then(response => response.json())
            .then(data => {

                for (let i = 0; i < data.length; i++) {
                    let auto = data[i]

                    let nombre = auto.name;
                    let descripcion = auto.description;
                    let moneda = auto.currency;
                    let costo = auto.cost;
                    let imagen = auto.imgSrc;
                    let cantvendido = auto.soldCount;

                    if (min <= costo && costo <= max) {
                        select += `
                        <div class="col-md-6">
                            <div class="card mb-6 shadow-sm">
                                <a title="producto" href="product-info.html"><img src="` + imagen + `" alt=" class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></a>
                                <div class="card-body">
                                    <h4 class="card-text">`+ nombre + `</h4>
                                    <p>` + moneda + " " + costo + `</p> 
                                    <p class="card-text">` + descripcion + `</p>
                                    <p class="card-text">`+ "Cantidad vendida: " + cantvendido + `</p>
                                     
                                </div>
                            </div>
                        </div> `
                        
                        document.getElementById("producto-list-container").innerHTML = select
                    }

                }

            });

        document.getElementById("limpiarrango").onclick = function () {
            window.location.href = "./products.html";
        }


    }
    //console.log(listaproductos)

    var orden_cantidad = "Cantidad";
    var orden_des_precio = "Precio.";
    var orden_cres_precio = "Precio";

    function ordenar(criterio, array) {
        let result = [];
        if (criterio === orden_cantidad) {
            result = array.sort(function (a, b) {
                let acont = parseInt(a.soldCount)
                let bcont = parseInt(b.soldCount)
                if (acont > bcont) { return -1; }
                if (acont < bcont) { return 1; }
                return 0;
            });
        }
        else if (criterio === orden_des_precio) {
            result = array.sort(function (a, b) {
                let aprecio = parseInt(a.cost)
                let bprecio = parseInt(b.cost)
                if (aprecio > bprecio) { return -1; }
                if (aprecio < bprecio) { return 1; }
                return 0;
            });
        } else if (criterio === orden_cres_precio) {
            result = array.sort(function (a, b) {
                let aprecio = parseInt(a.cost)
                let bprecio = parseInt(b.cost)
                if (aprecio > bprecio) { return 1; }
                if (aprecio < bprecio) { return -1; }
                return 0;
            });
        }
        return result
    }

    document.getElementById("decrcant").addEventListener("click", function () {
        let listaordenada = ordenar(orden_cantidad, listaproductos);
        //console.log(listaordenada)
        let relevancia = ""
        for (let i = 0; i < listaordenada.length; i++) {
            let auto = listaordenada[i]

            let nombre = auto.name;
            let descripcion = auto.description;
            let moneda = auto.currency;
            let costo = auto.cost;
            let imagen = auto.imgSrc;
            let cantvendido = auto.soldCount;

            relevancia += `
                <div class="col-md-6">
                    <div class="card mb-6 shadow-sm">
                        <a title="producto" href="product-info.html"><img src="` + imagen + `" alt=" class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></a>
                        <div class="card-body">
                            <h4 class="card-text">`+ nombre + `</h4>
                            <p>` + moneda + " " + costo + `</p> 
                            <p class="card-text">` + descripcion + `</p>
                            <p class="card-text">`+ "Cantidad vendida: " + cantvendido + `</p>
                         
                        </div>
                    </div>
                </div> `

            // relevancia += `
            //       <div class="list-group-item list-group-item-action">
            //            <div class="row" >
            //                <div class="col-3">
            //                <a title="producto" href="product-info.html"><img src="` + imagen + `" alt="` + descripcion + `" class="img-thumbnail"> </a>
            //                </div>
            //                <div class="col">
            //                    <div class="d-flex w-100 justify-content-between">
            //                       <h4 class="mb-1">`+ nombre + `</h4>
            //                       <small class="text-muted">` + moneda + " " + costo + `</small>
            //                </div>
            //                <div><p class="mb-1">` + descripcion + `</p></div>
            //                <div><p class="mb-1">`+ "Cantidad vendida: " + cantvendido + `</p></div>
            //                </div>
            //            </div>
          
            //           `
            document.getElementById("producto-list-container").innerHTML = relevancia
        }
    });

    document.getElementById("decrprecio").addEventListener("click", function () {
        let listaordenada = ordenar(orden_des_precio, listaproductos);
        let descendenteprecio = ""
        for (let i = 0; i < listaordenada.length; i++) {
            let auto = listaordenada[i]

            let nombre = auto.name;
            let descripcion = auto.description;
            let moneda = auto.currency;
            let costo = auto.cost;
            let imagen = auto.imgSrc;
            let cantvendido = auto.soldCount;

            descendenteprecio += `
                    <div class="col-md-6">
                        <div class="card mb-6 shadow-sm">
                            <a title="producto" href="product-info.html"><img src="` + imagen + `" alt=" class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></a>
                            <div class="card-body">
                                <h4 class="card-text">`+ nombre + `</h4>
                                <p>` + moneda + " " + costo + `</p> 
                                <p class="card-text">` + descripcion + `</p>
                                <p class="card-text">`+ "Cantidad vendida: " + cantvendido + `</p>
                                 
                            </div>
                        </div>
                    </div> `

            // descendenteprecio += `
            //       <div class="list-group-item list-group-item-action">
            //            <div class="row">
            //                <div class="col-3">
            //                <a title="producto" href="product-info.html"><img src="` + imagen + `" alt="` + descripcion + `" class="img-thumbnail"> </a>
            //                </div>
            //                <div class="col">
            //                    <div class="d-flex w-100 justify-content-between">
            //                       <h4 class="mb-1">`+ nombre + `</h4>
            //                       <small class="text-muted">` + moneda + " " + costo + `</small>
            //                </div>
            //                <div><p class="mb-1">` + descripcion + `</p></div>
            //                <div><p class="mb-1">`+ "Cantidad vendida: " + cantvendido + `</p></div>
            //                </div>
            //            </div>

            //           `
            document.getElementById("producto-list-container").innerHTML = descendenteprecio
        }
    });

    document.getElementById("crecprecio").addEventListener("click", function () {
        let listaordenada = ordenar(orden_cres_precio, listaproductos);
        let ascendeteprecio = ""
        for (let i = 0; i < listaordenada.length; i++) {
            let auto = listaordenada[i]

            let nombre = auto.name;
            let descripcion = auto.description;
            let moneda = auto.currency;
            let costo = auto.cost;
            let imagen = auto.imgSrc;
            let cantvendido = auto.soldCount;

            ascendeteprecio += `
                <div class="col-md-6">
                    <div class="card mb-6 shadow-sm">
                        <a title="producto" href="product-info.html"><img src="` + imagen + `" alt=" class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></a>
                        <div class="card-body">
                            <h4 class="card-text">`+ nombre + `</h4>
                            <p>` + moneda + " " + costo + `</p> 
                            <p class="card-text">` + descripcion + `</p>
                            <p class="card-text">`+ "Cantidad vendida: " + cantvendido + `</p>
                         
                        </div>
                    </div>
                </div> `

            // ascendeteprecio += `
            //       <div class="list-group-item list-group-item-action">
            //            <div class="row">
            //                <div class="col-3">
            //                <a title="producto" href="product-info.html"><img src="` + imagen + `" alt="` + descripcion + `" class="img-thumbnail"> </a>
            //                </div>
            //                <div class="col">
            //                    <div class="d-flex w-100 justify-content-between">
            //                       <h4 class="mb-1">`+ nombre + `</h4>
            //                       <small class="text-muted">` + moneda + " " + costo + `</small>
            //                </div>
            //                <div><p class="mb-1">` + descripcion + `</p></div>
            //                <div><p class="mb-1">`+ "Cantidad vendida: " + cantvendido + `</p></div>
            //                </div>
            //            </div>
          
            //           `
            document.getElementById("producto-list-container").innerHTML = ascendeteprecio
        }

    });
})