//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    fetch(PRODUCT_INFO_URL)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            let imagenes= []
            
            //console.log("abc")
            let nombre = data.name
            let descripcion = data.description
            let precio = data.cost
            let moneda = data.currency
            let cantvenida = data.soldCount
            let categoria = data.category
            let images = data.images 
                for (let i =0 ; i < images.length; i++){
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