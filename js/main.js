let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos)
    })



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

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #000, #000)",
            borderRadius: "1rem"
        },
        offset: {
            x: "8rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 20 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

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
