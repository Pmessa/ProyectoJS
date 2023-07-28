// Clase contructora
class Bici {
    constructor(id, marca, modelo, tipo, color, talle, precio, imagen) {
       this.id = id;
       this.marca = marca;
       this.modelo = modelo;
       this.tipo = tipo;
       this.color = color;
       this.talle = talle;
       this.precio = precio;
       this.imagen = imagen;
       this.cantidad = 1
    }
    //Método para sumar y restar la cantidad de productos
 
 sumarUnidad(){
    this.cantidad = this.cantidad + 1
    return this.cantidad
 }
 restarUnidad(){
    this.cantidad = this.cantidad - 1
    return this.cantidad
 }
 }
 
 
 
 // instanciación de objetos
 
 const bici1 = new Bici(1, "Specialized", "Epic Hardtail", "MTB", "blanca", "M", 5000, "specializedMtb.png")
 const bici2 = new Bici(2, "Merida", "Big Nine 9000", "MTB", "Azul", "S", 4850, "meridaMtb.png")
 const bici3 = new Bici(3, "Scott", "SCOTT SCALE RC SL", "MTB", "verde", "L", 2600, "scottMtb.png")
 const bici4 = new Bici(4, "Trek", "Procaliber 9.8", "MTB", "rojo", "M", 3600, "trekMtb.png")
 const bici5 = new Bici(5, "Specialized", "Tarmac SL7 Pro", "Ruta", "Gris", "52", 4450, "specializedRuta.png")
 const bici6 = new Bici(6, "Merida", "SCULTURA ENDURANCE", "Ruta", "rojo", "54", 3850, "meridaRuta.png")
 const bici7 = new Bici(7, "Scott", "ADDICT RC 30", "Ruta", "gris", "56", 2900, "scottRuta.png")
 const bici8 = new Bici(8, "Pinarello", "DOGMA F", "Ruta", "rojo", "54", 3900, "pinarelloRuta.png")
 
 // Crear un array de objetos 
 const catalogo = []
 catalogo.push(bici1, bici2, bici3, bici4, bici5, bici6, bici7, bici8)
 
 // DOM con array de objetos
 let productosEnCarrito = []
 
 if(localStorage.getItem("carrito")){
    // productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
    for (let bici of JSON.parse(localStorage.getItem("carrito"))){
       let biciStorage = new Bici(bici.id, bici.marca, bici.modelo, bici.tipo, bici.color, bici.talle, bici.precio, bici.imagen)
       productosEnCarrito.push(biciStorage)
    }
    console.log(productosEnCarrito)
 
 }else{
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
 }

 fetch("bici.json")
 .then((res) => res.json())
 .then((data) => {
    console.log(`La info capturada del json`)
    console.log(data)

 })