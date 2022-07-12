//Constructor de Provincias INICIO 
class Provincia{
    constructor(nombre, distancia, valorHotel, datoProvincia) {
    this.nombre= nombre;
    this.distancia=distancia;
    this.valorHotel= valorHotel;
    this.datoProvincia= datoProvincia;
    }
}
//Variables

let botonCalculadora = document.getElementById("btnCalculadora");
const provincias= [
    { nombre: "cordoba", distancia: 800 , valorHotel: 1500 , datoProvincia: "En Cordoba podes visitar Tras La Sierra, zona de montes y rios ideal para disfrutar en verano." },
    { nombre: "santa fe", distancia: 500 , valorHotel: 1000 , datoProvincia: "En Santa Fe capital, se encuentra el rio Parana. Tomate un Amargo Obrero en la ribera." },
    { nombre: "chubut", distancia: 900 , valorHotel: 2500 , datoProvincia: "Si visitas la provincia de Chubut entre los meses de septiembre a diciembre, podras ver ballenas francas australes nadando por las costas de Puerto Madryn."  },
    { nombre: "rio negro", distancia: 1000 , valorHotel:3000 , datoProvincia: "Rio Negro, una de las provincias con mas atractivos turisticos de la Patagonica. Algunos destinos imperdibles son: Bariloche, San Martin de los Andes, Villa La Angostura y muchos mas. " },
]
let formulario = document.getElementById("formulario");
let nombreIngresado = document.getElementById("nombre");
let distanciaIngresada = document.getElementById("distancia");
let valorHotelIngresado = document.getElementById("valorhotel");
let datoProvinciaIngresado = document.getElementById("datocurioso");
let provinciaAgregada = document.getElementById("provinciaAgregada");

//Defino los Eventos de botones
botonCalculadora.addEventListener("click", calculadora);
formulario.onsubmit = (event) => validarFormulario(event);

//Funciones necesarias para la calculadora

function traslado (kilometros, valor) {
    let valorKilometro = kilometros * valor;
    return valorKilometro;
}

function hospedaje (dias, valor) {
    let valorHospedaje = dias * valor;
    return valorHospedaje;
}

function costoViaje (valorHospedaje, valorKilometro) {
    costo = valorHospedaje + valorKilometro;
    alert ("El costo de tu viaje es de: $"+ costo);
    return costo
}

function destinoPosible (presupuesto, costoTotal) {
    if (parseFloat(presupuesto)>parseFloat(costoTotal)) {
        alert("Tu viaje ha sido reservado");
    }
    else {
        alert("Dado tu presupuesto, quizas podes elegir otro destino o viajar menos dias.");
    }
}

function verDato (provincia){
    verDato = prompt("Te gustaria conocer mas sobre esta provincia? Pone OK para verlo.");
    if(verDato === "ok") {
        alert(provincia['datoProvincia']);
    }
    else {
        alert("Que tengas buen viaje!");
    }
}

function buscadorDestino() {
    let nombre = prompt("Bienvenide a Punto de Observacion, tu calculadora de viajes. Cual es tu nombre?");
    const destino = prompt("Un gusto saludarte, "+ nombre +". Por favor, ingresa a que provincia te gustaria ir. Si queres salir, ingresa ESC(Opciones disponibles: Cordoba, Rio Negro, Chubut, Santa Fe");
    const  provinciaEncontrada = provincias.find( provincia => provincia.nombre === destino.toLowerCase() );
    console.log(provinciaEncontrada)
    return provinciaEncontrada;
}

function calculadora() {
    let destinoSeleccionado=buscadorDestino();
    console.log(destinoSeleccionado['valorHotel']);
    console.log(destinoSeleccionado['distancia']);
    while (destinoSeleccionado !== "ESC") {
        if (destinoSeleccionado !=="") {
            let presupuesto = parseFloat(prompt("Hermoso destino. Para continuar, contanos tu presupuesto estimado."));
            let dias= parseFloat(prompt("Por ultimo: Cuantos dias te gustaria hospedarte?")); 
            const valorKilometro = 50;
            let costoHotel= destinoSeleccionado['valorHotel'];
            let costoTraslado = traslado (destinoSeleccionado['distancia'],valorKilometro);
            let costoHospedaje = hospedaje (dias, costoHotel);
            costoViaje = costoViaje(costoTraslado, costoHospedaje);
            destinoPosible(presupuesto, costoViaje);
            verDato(destinoSeleccionado); 
            break;
        } else {
            alert("Elige un destino por favor");
        }
        destinoSeleccionado = buscadorDestino(opcionesDestino());
    }
}

//Funciones para agregar Provincias a arreglo Provincias

function validarFormulario (event) {
    event.preventDefault();
    let nombre = nombreIngresado.value;
    let distancia = parseFloat(distanciaIngresada.value);
    let valorHotel = parseFloat(valorHotelIngresado.value);
    let datoProvincia = datoProvinciaIngresado.value;

    let provincia = new Provincia (
        nombre, 
        distancia, 
        valorHotel, 
        datoProvincia

    );
    provincias.push(provincia)



    formulario.reset();
    provinciaAgregada.innerHTML ='';
    console.log(provincias);
    mostrarEnDom(nombre, distancia, valorHotel, datoProvincia);
}

// Funcion para agregar al DOM la ultima provincia agregada

function mostrarEnDom(nombre, distancia, valorHotel, datoProvincia) {
    provinciaAgregada.innerHTML = `<h2>Tu destino ha sido agregado!</h2>
    <p><strong>Nombre: </strong> ${nombre}</p>
    <p><strong>Distancia: </strong> ${distancia}</p>
    <p><strong>Valor del Hotel: </strong> ${valorHotel}</p>
    <p><strong>Dato curioso: </strong> ${datoProvincia}</p>
    <h3>Muchas gracias por tu colaboracion :)</h3>`
}