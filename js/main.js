let productos = [
    {
        id: "1",
        nombre: "Guante Buceo 3 mm",
        precio: 18000,
        categoria: {
            nombre:"Buceo Deportivo",
            id:"buceo-deportivo"
        },
        imagen: "./assets/images/guante-buceo-1x1-21-60edd2ee70780856bf16209307655468-480-0.jpg"
    },
    {
        id: "2",
        nombre: "Chaleco Smooth 3mm",
        precio: 46900,
        categoria: {
            nombre:"Buceo Deportivo",
            id:"buceo-deportivo"
        },
        imagen: "./assets/images/chaleco-con-capucha-frente1-5192d2a5e4c5873f8416382790043113-640-0.jpg"
    },
    {
        id: "3",
        nombre: "Cressi Pro Star",
        precio: 52897,
        categoria: {
            nombre:"Snorkeling",
            id:"snorkeling"
        },
        imagen: "./assets/images/pro-star-2-1x11-0c60bc623fb59ef4c016209241224715-640-0.jpg"
    },
    {
        id: "4",
        nombre: "Cressi Quantum",
        precio: 77266,
        categoria: {
            nombre:"Snorkeling",
            id:"snorkeling"
        },
        imagen: "./assets/images/211-85f7df42276d0bdf4b16876149168569-640-0.webp"
    },
    {
        id: "5",
        nombre: "Pino Tokyo 4/3 mm",
        precio: 154000,
        categoria: {
            nombre: "Surf",
            id:"surf"
        },
        imagen: "./assets/images/pino-tokyo-4-3-bs-021-2f36e825f2f20ccde716548610964340-640-0.jpg"
    },
    {
        id: "6",
        nombre: "Pino Raia 3mm",
        precio: 147285,
        categoria:{
            nombre: "Surf",
            id:"surf"
        },
        imagen: "./assets/images/raia-masculino-azul-3mm-061-b3c177f97f10cb8bd816373429271341-640-0.jpg"
    },
    {
        id: "7",
        nombre: "Orca Hydro",
        precio: 20500,
        categoria: {
            nombre:"Natación",
            id:"natacion"
        },
        imagen: "./assets/images/111-b63f01ce99bc33ceb916495157367410-640-0.png"
    },
    {
        id: "8",
        nombre: "Aquon Casco Natacion 3mm",
        precio: 12500,
        categoria: {
            nombre:"Natación",
            id:"natacion"
        },
        imagen: "./assets/images/aquon-capuz-natacao-011-513ac703826965596016382791094925-640-0.jpg"
    },
]



const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelectorAll("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");






function cargarProductos (productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo"> ${producto.nombre} </h3>
                <p class="producto-precio"> ${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}



cargarProductos(productos);




botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active") );
        e.currentTarget.classList.add("active");

        
        if (e.currentTarget.id !="todos"){
            const productoCategoria = productos.find (producto => producto.categoria.id === e.currentTarget.id);
            
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos nuestros productos";
            cargarProductos(productos);
        }
        
        
    })
});





function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}



let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
    if(productosEnCarritoLS){
        productosEnCarrito = productosEnCarritoLS
        actualizarNumerito();
    }else{
        productosEnCarrito = []
    }




function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}



function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}




/*<div class="producto">
<img class="producto-imagen" src="./assets/images/guante-buceo-1x1-21-60edd2ee70780856bf16209307655468-480-0.jpg" alt="">
<div class="producto-detalles">
    <h3 class="producto-titulo"> Guante Buceo 3 mm </h3>
    <p class="producto-precio"> $18000</p>
    <button class="producto-agregar">Agregar al carrito</button>
</div>
</div>
*/
