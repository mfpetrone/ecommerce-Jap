//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    fetch(PRODUCT_INFO_URL)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            let imagenes = []

            //console.log("abc")
            let nombre = data.name
            let descripcion = data.description
            let precio = data.cost
            let moneda = data.currency
            let cantvenida = data.soldCount
            let categoria = data.category
            let images = data.images
            for (let i = 0; i < images.length; i++) {
                let imagen = images[i]
                //console.log(imagen)


                imagenes += `<img style="height:160px;width:190px;" src="` + imagen + `" alt=" " class="img-thumbnail"></img> `
                //console.log(imagenes)

                let productoselect = "";

                productoselect += `
                        <div>
                            <div><h1>`+ nombre + `</h1></div> 
                            <hr class="my-3"> 
                            <p><strong>Precio</strong></p>
                            <div>`+ moneda + " " + precio + `</div> 
                            <br> 
                            <p><strong>Descripción</strong></p>
                            <div >`+ descripcion + `</div>
                            <br>
                            <p><strong>Categoría</strong></p>
                            <div>` + categoria + `</div>
                            <br>
                            <p><strong>Cantidad vendida</strong></p>
                            <div >`+ cantvenida + `</div>
                            <br>
                            <p><strong>Imagenes ilustrativas</strong></p>
                            <div class="row text-center text-lg-left pt-2"> ` + imagenes + ` </div>
                            <br>
                        </div>
                    `



                document.getElementById("productoinfo-list-container").innerHTML = productoselect

            };
            let relatedProducts = data.relatedProducts
            for (let i = 0; i < relatedProducts.length; i++) {
                let posicion = relatedProducts[i]
                //console.log(posicion)
                fetch(PRODUCTS_URL)
                    .then(response => response.json())
                    .then(data => { //traer nombre y foto
                        let autorelacionado = data[posicion].name
                        //console.log(autorelacionado)
                        let monedarelacionada = data[posicion].currency
                        let costorelacionada = data[posicion].cost
                        let imagenrelacionada = data[posicion].imgSrc

                        document.getElementById("producto-relacionado").innerHTML += `
                   
                            <div class="list-group-item list-group-item-action">
                                 <div class="row">
                                    <div class="col-3"> 
                                     <img src="` + imagenrelacionada + `" alt="  " class="img-thumbnail">                                    </div>
                                 <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                     <h4 class="mb-1">`+ autorelacionado + `</h4>
                                     <small class="text-muted">` + monedarelacionada + " " + costorelacionada + `</small>
                                </div>
                                   
                            </div>
                        `

                    });


            };


        });


    fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let coment = data[i]
                let puntos = coment.score
                let comento = coment.description
                let usuario = coment.user
                let fecha = coment.dateTime

                document.getElementById("cometariospersonas").innerHTML += `
                <div>
                    <p><strong>Usuario:  ` + usuario + `</strong> </p>
                    <p><strong> Calificación: `+ puntos + `</strong> <span class="fa fa-star checked"></span></p>
                    <p>` + comento + ` </p>
                    <p>Fecha del comentario: `+ fecha + ` </p>      
                    <br>
                </div>
                `
            };
        });
});