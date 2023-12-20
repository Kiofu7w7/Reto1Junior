import { obtenerChat, enviarMensaje } from "../../../scripts/chatAxios/chat.js";
import { buscarUsuarios } from "../../../scripts/usuarioAxios/usuarios.js";

const idUsuario1 = "1" //CONSEGUIRLA CON LOCALSTORAGE DE INICIO DE SESION
const idUsuario2 = localStorage.getItem("idChatDetalles")
console.log(localStorage.getItem("idChatDetalles"))
let idChat;
const nombreChatHTML = document.getElementById("nombreChat")
const imagenChatHTML = document.getElementById("imagenChat")
const contenedor = document.getElementById("mensajes")
const botonRegresar = document.getElementById("atrasButton")

botonRegresar.addEventListener('click', function () {
    history.back()
})

const data = async () =>{
    try {
        const response = await buscarUsuarios(idUsuario2)
        return response   
    } catch (error) {
        console.warn(error)
        throw error
    }
}

const chat = async () =>{
    try {
        const response = await obtenerChat(idUsuario1, idUsuario2)
        return response   
    } catch (error) {
        console.warn(error)
        throw error
    }
}

//obtener info usuario 2

data().then((info) => {
    nombreChatHTML.innerText = info.data.nombre + " " + info.data.apellidos
    imagenChatHTML.setAttribute("src", info.data.url_foto_perfil)
}).catch((error) => {
    console.warn(error)
})

//obtener chat

function procesarMensajes(infoChat) {
    contenedor.innerText = ""
    const mensajes = infoChat.mensajes.split('|');
    mensajes.forEach((mensaje) => {
        const [remitente, texto, hora] = mensaje.match(/(\d+):'([^']+)',(\d+:\d+)/).slice(1);
        if (remitente == idUsuario1) {
            contenedor.innerHTML += `        
            <div class="mensaje mensajeSalidaContenedor">
                <p>${hora}</p>
                <div class="contenedorTexto mensajeSalida">
                    <div class="texto">
                        <p>${texto}</p>
                    </div>
                </div>
            </div>`
        }else{
            contenedor.innerHTML += `
            <div class="mensaje mensajeEntradaContenedor">
                <p>${hora}</p>
                <div class="contenedorTexto mensajeEntrada">
                    <div class="texto">
                        <p>${texto}</p>
                    </div>
                </div>
            </div>`
        }
    });
}


chat().then((infoChat) => {
    procesarMensajes(infoChat);
    idChat = infoChat.id
});

document.getElementById('mensajeInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        enviarMensajeTexto()
    }
});

function enviarMensajeTexto() {
    const inputMensaje = document.getElementById('mensajeInput').value;
    enviarMensaje(idChat, idUsuario1, inputMensaje).then(value => {
        location.reload();
    })
    document.getElementById('mensajeInput').value = '';
}