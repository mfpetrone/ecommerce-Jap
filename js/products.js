document.addEventListener("DOMContentLoaded", function (e){
    
    let url="https://japdevdep.github.io/ecommerce-api/product/all.json"; 
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                
                 for(let i=0; i < data.length; i++){
                        let auto = data[i]
            
                        let nombre = auto.name;
                        let descripcion = auto.description;                        
                        let moneda = auto.currency;
                        let costo = auto.cost;
                        let imagen = auto.imgSrc;
                        let cantvendido = auto.soldCount;

                        document.getElementById("producto-list-container").innerHTML +=`
                            <div class="list-group-item list-group-item-action">
                                        <div class="row">
                                            <div class="col-3">
                                                 <img src="` + imagen + `" alt="` + descripcion + `" class="img-thumbnail">
                                             </div>
                                             <div class="col">
                                                 <div class="d-flex w-100 justify-content-between">
                                                     <h4 class="mb-1">`+ nombre + `</h4>
                                                     <small class="text-muted">` + moneda + " " + costo + `</small>
                                                 </div>
                                                 <div><p class="mb-1">` + descripcion + `</p></div>
                                                 <div><p class="mb-2">`+"Cantidad vendida: " + cantvendido + `</p small></div>
                                             </div>
                                       </div>
                        `
                        
                        
                 }   
             });
})