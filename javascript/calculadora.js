/* //Es una calculadora para una remiseria que quiere averiguar el valor del viaje y sus impuestos en caso de requerirlos. */

//Variables
let clienteElegido
let kmDelViaje
let valorDelKm
let valorEspera
let totalViaje
let descuentoVip
let clasiFiltrado



//array
let clientesRemiseria = [
    {
        nombre: "Daiana Alderete",
        direccion: "Belgrano 1259",
        telefono: 1189105641,
        clasificacion: "VIP"
    },
    {
        nombre: "Ariel Kubar",
        direccion: "Fatima 550",
        telefono: 1152857998,
        clasificacion: "VIP"
    },
    {
        nombre: "Rufina Silvero",
        direccion: "Av. San Martin 250",
        telefono: 1156327866,
        clasificacion: "Basico"
    },
    {
        nombre: "Martin Acosta",
        direccion: "Croacia 3560",
        telefono: 1155698525,
        clasificacion: "Basico"
    }

];

// Obtener los datos del localStorage

let traerClientes = JSON.parse(localStorage.getItem("clientes"));

// Verificar si hay datos guardados en el localStorage

if (traerClientes) {
    // Unir los dos array en clientesRemiseria
    clientesRemiseria = clientesRemiseria.concat(traerClientes)
    
    console.log("Datos de clientes recuperados del localStorage:", clientesRemiseria);
} else {
    console.log("No hay datos de clientes guardados en el localStorage.");
}


//Constructor

class clientesNuevos{
    constructor (nombre,direccion,telefono,clasificacion){
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.clasificacion = clasificacion;
    }
}

//Función filtrar clientes VIP

function filtrarClientesVip(){ 
return clientesRemiseria.filter(cliente => cliente.clasificacion.toUpperCase() === "VIP");
}
clasiFiltrado = filtrarClientesVip();

//Frases para consigna usando DOM

const primerPregunta = document.getElementById("primerPregunta");
primerPregunta.innerText = "Quiere Buscar un cliente registrado?";

const agregarNuevoCliente = document.getElementById("agregarNuevoCliente");
agregarNuevoCliente.innerText = "Quiere registrar un nuevo cliente?";

const nombreClienteNuevo = document.getElementById("nombreClienteNuevo");
nombreClienteNuevo.innerText = "Agregue el nombre del cliente nuevo.";

const direccionClienteNuevo = document.getElementById("direccionClienteNuevo");
direccionClienteNuevo.innerText = "Agregue la dirección del cliente nuevo.";

const telefonoClienteNuevo = document.getElementById("telefonoClienteNuevo");
telefonoClienteNuevo.innerText = "Agregue el telefono del cliente nuevo.";

const clasificacionClienteNuevo = document.getElementById("clasificacionClienteNuevo");
clasificacionClienteNuevo.innerText = "Indique si el cliente es VIP o es un cliente Basico.";

const preguntaCuantosKm = document.getElementById("preguntaCuantosKm");
preguntaCuantosKm.innerText = "Ingresa la cantidad de km del viaje.";

const preguntaValorKm = document.getElementById("preguntaValorKm");
preguntaValorKm.innerText = "Ingresa el valor del km para este viaje.";

const solicitaEspera =document.getElementById("solicitaEspera");
solicitaEspera.innerText = "Si el cliente requiere espera, ingrese el valor de la misma aqui:";

const fraseSinFac = document.getElementById("fraseSinFac");
fraseSinFac.innerText = "Calcular total.";

const fraseConFac = document.getElementById("fraseConFac");
fraseConFac.innerText = "Calcular total con factura.";

const fraseFacConEspera = document.getElementById("fraseFacConEspera");
fraseFacConEspera.innerText = "Calcular total con factura y espera.";

const fraseSinFacConEspera = document.getElementById("fraseSinFacConEspera");
fraseSinFacConEspera.innerText = "Calcular total solo con espera.";


//Funcion para buscar clientes ya registrados

const clienteViejo = document.getElementById("clienteViejo");
clienteViejo.addEventListener("click",buscandoCliente);

function buscandoCliente(){

    let buscarCliente = document.getElementById("buscarCliente").value;
    
    //Función de busqueda de cliente
    clienteElegido = clientesRemiseria.find(cliente =>cliente.nombre.toLowerCase().includes(buscarCliente.toLowerCase()))

    if (clienteElegido){
        console.log("cliente encontrado "+clienteElegido.nombre);
    } else{
        alert("Cliente no encontrado, intente nuevamente.");
    }
}

//Funcion para registrar clientes nuevos.

const registrar = document.getElementById("registrar");
registrar.addEventListener("click",registrandoCliente);

function registrandoCliente(){

    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let clasificacion = document.getElementById("clasificacion").value.toUpperCase();

    if(clasificacion == "VIP" || clasificacion == "BASICO"){
        const nuevoCliente = new clientesNuevos(nombre,direccion,telefono,clasificacion);
    
        //Armo un array nuevo dentro de local storage para guardar solo el cliente nuevo
        let clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
        clientesGuardados.push(nuevoCliente);
        localStorage.setItem("clientes",JSON.stringify(clientesGuardados))
    
        //sigo con la secuencia para el cliente nuevo por primera vez
        clientesRemiseria.push(nuevoCliente);
        clienteElegido = nuevoCliente;
        console.log("El cliente ingresado es "+clienteElegido.nombre)
        clasiFiltrado = filtrarClientesVip();
    }else{
        alert("No ingreso un dato valido, ingrese VIP o Basico.")
    }
}

console.log(clientesRemiseria)

//Funcion pregunta de cuantos Km es el viaje.

const km = document.getElementById("km");
km.addEventListener("click",cuantosKm);

function cuantosKm(){
    const cantidadKm = document.getElementById("cantidadKm").value;
    kmDelViaje = cantidadKm
    console.log("la cantidad de km son "+kmDelViaje)
}

//Funcion pregunta del valor del km.

const cuantoValeKm = document.getElementById("cuantoValeKm");
cuantoValeKm.addEventListener("click",precioKm);

function precioKm(){
    const valorkm = document.getElementById("valorKm").value;
    valorDelKm = valorkm
    console.log("El precio del km es $"+valorDelKm)
}

//Funcion para la espera.

const espera = document.getElementById("espera");
espera.addEventListener("click",calcularEspera);

function calcularEspera(){
    const esperaEnElViaje = document.getElementById("esperaEnElViaje").value;
    valorEspera = parseInt (esperaEnElViaje)
    console.log("la espera vale "+valorEspera)
}


//Calculo del total sin factura

const calcularSinFac = document.getElementById("calcularSinFac");
calcularSinFac.addEventListener("click",calcularTotalSinFac);

function calcularTotalSinFac(){
    totalViaje = kmDelViaje * valorDelKm;
    if (clasiFiltrado.find(cliente => cliente.nombre === clienteElegido.nombre)){
        descuentoVip = totalViaje * 0.90;
        const mensaje = document.getElementById("mensaje");
        mensaje.innerText = ("🎉Felicidades🎉 "+ clienteElegido.nombre +" como cliente VIP, hemos aplicado un descuento especial a su tarifa. El precio final del viaje es aún más bajo de lo que esperaba, el total a pagar es $"+ descuentoVip);
    } else {
        const mensaje = document.getElementById("mensaje");
        mensaje.innerText = ("Gracias " + clienteElegido.nombre + " por viajar con nosotros, el total del viaje es $" + totalViaje);
    }
}

//Calculo del total con factura.

const calcularConFac = document.getElementById("calcularConFac");
calcularConFac.addEventListener("click",calcularTotalConFac);

function calcularTotalConFac(){
    totalViaje = (kmDelViaje * valorDelKm) * 1.21;

    if(clasiFiltrado.find(cliente => cliente.nombre === clienteElegido.nombre)){
        descuentoVip = totalViaje * 0.90;
        const mensaje = document.getElementById("mensaje");
        mensaje.innerText = ("🎉Felicidades🎉 "+ clienteElegido.nombre +" como cliente VIP, hemos aplicado un descuento especial a su tarifa. El precio final del viaje es aún más bajo de lo que esperaba, el total a pagar con factura es $"+ descuentoVip);
    } else {
        const mensaje = document.getElementById("mensaje");
        mensaje.innerText = ("Gracias " + clienteElegido.nombre + " por viajar con nosotros, el total del viaje con factura es $" + totalViaje);       
    }
}

//Calculo del total con factura y espera incluida.

const calcularFacConEspera = document.getElementById("calcularFacConEspera");
calcularFacConEspera.addEventListener("click",calcularTotalFacConEspera);

function calcularTotalFacConEspera(){
    totalViaje = ((kmDelViaje * valorDelKm) + valorEspera) * 1.21;
    
    if(clasiFiltrado.find(cliente => cliente.nombre === clienteElegido.nombre)){
        descuentoVip = totalViaje * 0.90;
        const mensaje = document.getElementById("mensaje");
        mensaje.innerText = ("🎉Felicidades🎉 "+ clienteElegido.nombre +" como cliente VIP, hemos aplicado un descuento especial a su tarifa. El precio final del viaje es aún más bajo de lo que esperaba, el total a pagar con factura es $"+ descuentoVip);
    } else {
        const mensaje = document.getElementById("mensaje");
        mensaje.innerText = ("Gracias " + clienteElegido.nombre + " por viajar con nosotros, el total del viaje con factura es $" + totalViaje);       
    }
}

//Calculo del total solo con espera.

const calcularSinFacConEspera = document.getElementById("calcularSinFacConEspera");
calcularSinFacConEspera.addEventListener("click",calcularTotalSinFacConEspera);

function calcularTotalSinFacConEspera(){
    totalViaje = (kmDelViaje * valorDelKm) + valorEspera;
    
    if(clasiFiltrado.find(cliente => cliente.nombre === clienteElegido.nombre)){
        descuentoVip = totalViaje * 0.90;
        const mensaje = document.getElementById("mensaje");
        mensaje.innerText = ("🎉Felicidades🎉 " + clienteElegido.nombre + " como cliente VIP, hemos aplicado un descuento especial a su tarifa. El precio final del viaje es aún más bajo de lo que esperaba, el total a pagar es $ " + descuentoVip);
    } else {
        const mensaje = document.getElementById("mensaje");
        mensaje.innerText = ("Gracias " + clienteElegido.nombre + " por viajar con nosotros, el total del viaje es $" + totalViaje)
    }
}