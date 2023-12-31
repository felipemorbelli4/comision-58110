const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar");










function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-producto-titulo">
                    <small>Producto</small>
                    <h3> ${producto.nombre} </h3>
                </div>
    
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
    
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
    
                <div class="carrito-producto-subtotal">
                    <small>SubTotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash-can"></i></button>
            `;
            contenedorCarritoProductos.append(div);
            
        })
    
    
        
    
    
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();







function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}





function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}



botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito () {
    Swal.fire({
        
        color:`black`,
        title: `Atención: <br>${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos serán eliminados </br>`,
        icon: 'warning',
        html:
            ' <b>¿Desea continuar y eliminar todos los productos?</b> ', 
            
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Eliminar todos los productos',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Seguir con los mismos productos',
        cancelButtonAriaLabel: 'Thumbs down'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })



}


function actualizarTotal(){
    const totalCalculado =  productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad) , 0); 
    total.innerText = `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
}