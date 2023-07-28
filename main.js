//Entrega final Pablo Messa
//Esta es una página de venta de bicicletas, mi idea es escalarla y poder personalizar las bicicletas con componentes de diferentes calidades e ir mostrando al usuario el precio final.



function mostrarCatalogo(array) {
   //resetear el DOM
   bicicletasDiv.innerHTML = ``
   //Recorrer array para imprimir en el DOM
   for (let bici of array) {
      let nuevaBiciDiv = document.createElement("div")
      //agregar class bootstrap
      nuevaBiciDiv.className = "col-12 col-md-6 col-lg-4 my-2"
      nuevaBiciDiv.innerHTML = `
      <div id="${bici.id}" class="card" style="width: 16rem;">
      <img class="card-img-top img-fluid" style="height: 200px;"src="img/${bici.imagen}" alt="bicicleta de alta gama">
      <div class="card-body">
      <h4 class="card-title"><strong>${bici.marca}</strong></h4>
      <p>Modelo:<strong> ${bici.modelo}</strong></p>
      <p class="">Precio U$D: <strong>${bici.precio}</strong></p>
      <button id="agregarBtn ${bici.id}" class="btn btn-outline-dark">Agregar al carrito</button>
      </div>
      </div>
      `
      bicicletasDiv.appendChild(nuevaBiciDiv)

      let agregarBtn = document.getElementById(`agregarBtn ${bici.id}`)

      agregarBtn.addEventListener("click", () =>{
         Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se cargó su producto al carrito!',
            showConfirmButton: false,
            timer: 1000
          })

         agregarAlCarrito(bici)
      })
      
   }
   
}
function agregarAlCarrito(bici){
   //preguntar si existe el producto en el array

   let biciAgregada = productosEnCarrito.find((elem)=>elem.id == bici.id) 
   
   if(biciAgregada == undefined){
      productosEnCarrito.push(bici)
      localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
      console.log(productosEnCarrito)
   }else{

      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Su producto ya está en el carrito!',
         footer:`Usted puede modificar la cantidad de unidades en el carrito`,
         timer: 1500
         })
   
     console.log(`La bicicleta ${bici.tipo} ${bici.marca} ya existe en el carrito `)
   }
}

function cargarProductosCarrito(array){
modalBodyCarrito.innerHTML = ``
array.forEach((productoCarrito) => {
      
   modalBodyCarrito.innerHTML += `
   
   <div id="productoCarrito${productoCarrito.id}" class="card" style="width: 16rem;">
   <img class="card-img-top img-fluid" style="height: 200px;"src="img/${productoCarrito.imagen}" alt="bicicleta de alta gama">
   <div class="card-body">
   <h4 class="card-title"><strong>${productoCarrito.marca}</strong></h4>
   <p class="card-text">Modelo:<strong> ${productoCarrito.modelo}</strong></p>
   <p class="card-text">Precio U$D: <strong>${productoCarrito.precio}</strong></p>
   <p class="card-text">Unidades: <strong>${productoCarrito.cantidad}</strong></p>
   <p class="card-text">SubTotal: U$D ${productoCarrito.cantidad * productoCarrito.precio}</p>
   <button class="btn-success bg-success"  style="border-radius:15px;border-color:white; color:white;height:46px; width:40px; "id="botonSumarUnidad${productoCarrito.id}"><i class=""></i>+1</button>
   <button class="btn-danger bg-black" style="border-radius:15px;border-color:white;color:white; height:46px; width:40px;"id="botonEliminarUnidad${productoCarrito.id}"><i class=""></i>-1</button>
   <button id="eliminarBtn${productoCarrito.id}" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
   </div> 
   </div>
   `
  }) 
 
  //adjuntar evento eliminar
  array.forEach((productoCarrito) => {

   //Evento para sumar un aunidad
   document.getElementById(`botonSumarUnidad${productoCarrito.id}`).addEventListener("click", () =>{
      productoCarrito.sumarUnidad()
      console.log(productoCarrito.cantidad)
      localStorage.setItem("carrito", JSON.stringify(array))
      cargarProductosCarrito(array)
   })

   //Evento para sumar un aunidad
   document.getElementById(`botonEliminarUnidad${productoCarrito.id}`).addEventListener("click", () => {
      console.log(`se ha restado un nuevo producto al carrito`)
      let cantidadUnidades = productoCarrito.restarUnidad()
      if(cantidadUnidades == 0){

        let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
        cardProducto.remove()
        let productoEliminar = array.find((bici)=> bici.id == productoCarrito.id)
        console.log(productoEliminar)
        localStorage.removeItem(productoEliminar)
        let position = array.indexOf(productoEliminar)
        console.log(position)
        array.splice(position, 1)
        console.log(array)
        localStorage.setItem("carrito",JSON.stringify(array))
        calcularTotal(array)
         
      }
      console.log(cantidadUnidades)
      console.log(productoCarrito.cantidad)
      localStorage.setItem("carrito", JSON.stringify(array))
      cargarProductosCarrito(array)
   })

   //Evento para eliminar todo el producto
   //maipular el DOM sin guardar en variable}
   document.getElementById(`eliminarBtn${productoCarrito.id}`).addEventListener("click", ()=>{
      //borrar del DOM
      let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
      cardProducto.remove()
     let productoEliminar = array.find((bici)=> bici.id == productoCarrito.id)
     console.log(productoEliminar)
     localStorage.removeItem(productoEliminar)
     let position = array.indexOf(productoEliminar)
     console.log(position)
     array.splice(position, 1)
     console.log(array)
     localStorage.setItem("carrito",JSON.stringify(array))
     calcularTotal(array)
   })
  })
  calcularTotal(array)
}

const DateTime = luxon.DateTime
setInterval(()=>{
   let hora = document.getElementById("hora")
   let horaMostrar = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
   hora.innerHTML = `${horaMostrar}`
})

//capturo ID del boton
let bicicletasDiv = document.getElementById("bicicletas")
// let verCatalogo = document.getElementById("verCatalogo")
// let ocultarCatalogo = document.getElementById("ocultarCatalogo")
let ordenarMenorPrecio = document.getElementById("menMayBtn")
let ordenarMayorPrecio = document.getElementById("mayMenBtn")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")
let eliminarProductoCarrito = document.getElementById(`botonEliminar${productosEnCarrito.id}`)
let themeBtn = document.getElementById("themeBtn")
let finalizarCompra = document.getElementById("botonFinalizarCompra")
let loader = document.getElementById("loader")
let loaderTexto = document.getElementById("loaderTexto")

//pasar evento:


finalizarCompra.addEventListener("click", () =>{

   if(productosEnCarrito.length == 0 ){
      Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Su carrito está vacío',
                  showConfirmButton: false,
                  timer: 1000
                });
   }else
      Swal.fire({
               position: 'top-end',
               icon: 'success',
               title: 'Su compra ha sido realizada con éxito',
               showConfirmButton: false,
               timer: 1000
             }).then(()=>{
               localStorage.removeItem(`carrito`)
               productosEnCarrito.length = 0

             })
             
            
      })



      
let themeMode = localStorage.getItem("themeMode")
localStorage.setItem("themeMode", themeMode)
document.body.classList.add(themeMode)

themeBtn.addEventListener("click", () =>{
   let themeMode = localStorage.getItem("themeMode", localStorage.value)
   switch(themeMode){
      case"null":
      document.body.classList.add("bg-dark")
      localStorage.setItem("themeMode","bg-dark")

      case"default":
      document.body.classList.add("bg-dark")
      localStorage.setItem("themeMode","bg-dark")
      break

      case"bg-dark":      
      document.body.classList.remove("bg-dark")
      document.body.classList.add("bg-info")
      localStorage.setItem("themeMode","bg-info")
      break

      case"bg-info":      

      document.body.classList.remove("bg-info")
      document.body.classList.add("bg-success")
      localStorage.setItem("themeMode","bg-success")
      break

      case"bg-success":           
      document.body.classList.remove("bg-success")
      localStorage.setItem("themeMode", "default")
      
      break
   
   }
})


selectOrden.addEventListener("change", () => {
   console.log(selectOrden.value)
   switch(selectOrden.value){
      case "1":
         ordenarMayorMenor(catalogo)
      break
      case "2":
         ordenarMenorMayor(catalogo)
      break
      case "3":
         ordenarPorTipo(catalogo)
      break
      default:
         mostrarCatalogo(catalogo)
      break
   }
})

ordenarMayorPrecio.addEventListener("click", () => {
   mostrarCatalogo(catalogo)
})
ordenarMenorPrecio.addEventListener("click", () => {
   ordenarMenorMayor(catalogo)
})

// verCatalogo.addEventListener("click", () => {
//    mostrarCatalogo(catalogo)
// })

// ocultarCatalogo.onclick = () => {
//    bicicletasDiv.innerHTML = ``
// }


botonCarrito.addEventListener("click", () =>{
   cargarProductosCarrito(productosEnCarrito)
})
// Funciones para ordenar array por criterio

function calcularTotal(array){

   let total = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.precio * productoCarrito.cantidad), 0)
 
   total == 0 ? precioTotal.innerHTML= `No hay productos en el carrito` : precioTotal.innerHTML = `El total es U$D:<strong>${total}</strong>`

}

function ordenarMayorMenor(array) {
   const mayorMenor = [].concat(array)
   mayorMenor.sort((par1, par2) => par2.precio - par1.precio)
   mostrarCatalogo(mayorMenor)
}


function ordenarMenorMayor(array) {
   const menorMayor = [].concat(array)
   menorMayor.sort((a, b) => a.precio - b.precio)

   mostrarCatalogo(menorMayor)
}


function ordenarPorTipo(array){
   const arrayPorTipo = [].concat(array)
   arrayPorTipo.sort( (a,b) =>{
      if (a.tipo > b.tipo) {
         return 1
       }
       if (a.tipo < b.tipo) {
         
         return -1
       }
       return 0
   })
 
   mostrarCatalogo(arrayPorTipo)
 }
 
 function buscarPorTipo(){
   if(Bici.tipo == tolowecase("mtb"))
   console.log("buscar por tipo funciona")
}

//setTimeout para imprimir carrito 
setTimeout(()=>{
   loaderTexto.remove()
   loader.remove()
   mostrarCatalogo(catalogo)
},2000)









