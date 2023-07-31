
/*
En el código trealicé un login, donde la contraseña debe ser igual a la que se tiene registrada, el usuario tiene un total de 5 intentos, sino la cuenta se bloquea.

Una vez que el usuario hace el login correctamente va a la sección de compras, simulada por un switch-case.

En la sección el usuario debe elegir el juego que quiera, una vez seleccionado se le sumará el precio correspondiente + impuestos.

Si en la sección el usuario no selecciona una opción correcta tirará "error, seleccione una opción correcta."







*/
















let passUsuario = "Berazategui123"
let nombreUsuario = "feli"


const login = () => {
    let ingresar = false

    for(let i = 5; i > 0 ; i--){
        let passIngresada = prompt(`Ingrese su contraseña. Tiene ${i} intentos.`)

        if(passIngresada === passUsuario){
            prompt(`Bienvenido ${nombreUsuario}`)

            ingresar = true
            break
        }
        else{
            prompt(`Contraseña Incorrecta, solo tiene 5 intentos, una vez usado los 5 intentos se le bloqueará la cuenta.`)
        }
    }
    return ingresar
}


if(login()){
    let gtav = 5000 * 1.21
    let battlefield = 7000 * 1.21
    let raft = 3000 * 1.21
    let minecraft = 6000 * 1.21

    let opcion = prompt(`Elegi un producto escribiendo el numero correspondiente:\n 1- gtav \n 2- battlefield \n 3- raft \n 4- minecraft \n 5- Salir`).toUpperCase()
    



    while(opcion !="Cancelar"){
        switch(opcion){
            case"1":
                alert (`El precio del gtav + impuestos es de $${gtav}`)
                break
            case"2": 
                alert(`El precio del battlefield + impuestos es de $${battlefield} `)
                break
            case"3": 
                alert(`El precio del raft + impuestos es de $${raft} `)
                break
            case"4": 
                alert(`El precio del minecraft + impuestos es de $${minecraft} `)
                break
            case"5":
                alert(`Gracias por visitarnos ${nombreUsuario} que tenga un buen dia.`)
                break
            default:
                alert("INGRESE UNA OPCION CORRECTA")
                break
        }

        

        
    }




} else{
    prompt(`Hemos bloqueado su cuenta por seguridad`)
}
    
