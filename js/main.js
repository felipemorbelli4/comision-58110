
/*
En esta preentrega hice un eCommerce, cree un Array con productos, cada uno con su nombre y su precio.

Primero hay un mensaje de bienvenida donde se debe poner un nombre de usuario válido, si el usuario es correcto lo 
llevará a la lista de los productos, de lo contrario se corta el código. Allí el usuario deberá ir eligiendo todos los productos que desee
y además deberá elegir la cantidad que desee llevar.
Una vez que finalice con la elección de los productos y las cantidades le dará el total a pagar, y le mostrará las elecciones que hizo
en la consola.
*/




























let productos = [
    { nombre: "guante buceo", precio: 18000, },
    { nombre: "chaleco smooth", precio: 46900, },
    { nombre: "cressi pro star", precio: 52897, },
    { nombre: "cressi quantum", precio: 77266, },
    { nombre: "pino tokyo", precio: 154000, },
    { nombre: "pino raia", precio: 147285, },
    {nombre: "orca hydro", precio: 20500,},
    {nombre: "aquon casco", precio: 12500,},
]

let carrito = []

let usuario = prompt("Bienvenido, escriba su nombre de usuario por favor, No dejar en blanco. ")
while(usuario === ""){
    alert("Le recomendamos que escriba un nombre de usuario válido, gracias")
    usuario = prompt("Indique su nombre de usuario por favor: ")
}



let mensaje = alert(`Bienvenido ${usuario}`)

let seleccion = prompt(`¿Desea ver la lista de nuestros productos de buceo ${usuario}? \n Si es así escriba Si, de lo contrario, escriba No `) 

while(seleccion != "Si" && seleccion != "No"){
    alert("Por favor, escriba Si o No en el teclado, con la primera letra en mayúsculas.")
    seleccion = prompt("¿Desea ver nuestra lista de productos?")
    
}

if (seleccion === "Si"){
    alert("A continuación nuestra lista de productos de Buceo: ")
    let todoslosProductos = productos.map(
        (producto) => producto.nombre + " " + producto.precio + "$"
    )
    alert(todoslosProductos.join("\n - "))
}else if (seleccion === "No"){
    alert(`Gracias por su visita ${usuario}, hasta pronto!`)
    
} 

while(seleccion !=  "No"){
let producto = prompt ("Agregue el producto que desee al carrito, escribiendo el nombre del producto\n\nguante buceo\nchaleco smooth\ncressi pro star\ncressi quantum\npino tokyo\npino raia\norca hydro\naquon casco" )
let precio = 0

if (producto == "guante buceo" || producto == "chaleco smooth" || producto == "cressi pro star" || producto == "cressi quantum" ||
    producto == "pino tokyo" || producto == "pino raia" || producto == "orca hydro" || producto == "aquon casco" ){
    switch (producto){
        case "guante buceo":
            precio = 18000;
            break;
        case "chaleco smooth":
            precio = 46900;
            break;
        case "cressi pro star":
            precio = 52897;
            break;
        case "cressi quantum":
            precio = 77266;
            break;
        case "pino tokyo":
            precio = 154000;
            break;
        case "pino raia":
            precio = 147285;
            break;
        case "orca hydro":
            precio = 20500;
            break;
        case "aquon casco":
            precio = 12500;
            break;
        default:
            break;
    }
    let unidades = parseInt(prompt("Cuantas unidades desea llevar?"))

    carrito.push({producto, unidades, precio})
    console.log(carrito)
}else{
    alert("no tenemos ese producto, lo sentimos mucho")
}



seleccion = prompt("¿Desea seguir seleccionando productos? En caso de no querer seguir con la compra escriba: No\n En caso contrario escriba: Si")
while(seleccion === "No"){
    alert("Gracias por la compra! Hasta pronto!")
    carrito.forEach((carritoFinal)=> {
        console.log(`producto:${carritoFinal.producto}, unidades: ${carrito.unidades},
        El total a pagar es de ${carritoFinal.unidades * carritoFinal.precio}`)
    })
    break;
}
}



const total = carrito.reduce ((acc, el) => acc + el.precio * el.unidades, 0)
console.log(`El total a pagar es de: ${total}`)



