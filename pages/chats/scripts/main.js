const contenedorChats = document.getElementById("chatsJS");
const idUser = "1"
const chatsActivos = []

const obtenerMascotas = async (url) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
}

function obtenerIdsMiembros(respuesta) {
    if (respuesta && respuesta.data && respuesta.data.length > 0) {
        const primerMiembro = respuesta.data[0];
        if (primerMiembro.integrantes && primerMiembro.integrantes.miembro1_id && primerMiembro.integrantes.miembro2_id) {
            const idMiembro1 = primerMiembro.integrantes.miembro1_id;
            const idMiembro2 = primerMiembro.integrantes.miembro2_id;

            return { idMiembro1, idMiembro2 };
        } else {
            console.error('La estructura de datos no es la esperada.');
            return null;
        }
    } else {
        console.error('La respuesta no contiene datos o no hay miembros.');
        return null;
    }
}

const buscarUsuarios = async (idUser) => {
    try {
        const response = await axios.get("https://vercer-adopta.vercel.app/usuarios/" + idUser);
        const nombre = response.data.nombre;
        const urlFotoPerfil = response.data.url_foto_perfil;
        return { nombre, urlFotoPerfil };
    } catch (error) {
        console.log(error);
        return { nombre: null, urlFotoPerfil: null };
    }
};

async function obtenerYProcesarDatos() {
    try {
        const respuesta = await obtenerMascotas("https://vercer-adopta.vercel.app/chats");

        const idsMiembros = obtenerIdsMiembros(respuesta);

        if (idsMiembros) {

            respuesta.data.forEach(objeto => {
                if (
                    objeto.integrantes.miembro1_id === idUser ||
                    objeto.integrantes.miembro2_id === idUser
                ) {
                    chatsActivos.push(objeto);
                }
            });
            chatsActivos.forEach(element => {
                if (element.integrantes.miembro2_id != idUser) {
                    buscarUsuarios(element.integrantes.miembro2_id)
                        .then((usuarioInfo) => {
                            dibujarTarjetaChat(usuarioInfo,element)
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }else{
                    buscarUsuarios(element.integrantes.miembro1_id)
                    .then((usuarioInfo) => {
                        dibujarTarjetaChat(usuarioInfo,element)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                }
            });
        }
    } catch (error) {
        console.log('Error al obtener o procesar los datos:', error);
    }
}

obtenerYProcesarDatos();

function dibujarTarjetaChat(user2, dataChat) {
    const mensajesString = dataChat.mensajes;
    const mensajesIndividuales = mensajesString.split('|');
    const ultimoMensaje = mensajesIndividuales[mensajesIndividuales.length - 1];
    const [remitente, mensaje, hora] = ultimoMensaje.match(/(\d+):'([^']+)',(\d+:\d+)/).slice(1);
    // REMITENTE ES PARA SABER SI ES LLEGADO A MI O YO ENVIE A EL FALTA ESO

    contenedorChats.innerHTML += `
    <a href="#">
        <div class="contenedorChats">
            <div class="contenedorChat">
                <div class="contenedorImagenChat">
                    <img id="imgChat" src="${user2.urlFotoPerfil}">
                </div>
                <div class="containerDetalles">
                    <div class="primeraFila">
                        <h3 id="NombreChat">${user2.nombre}</h3>
                        <p id="horaUltimoMensaje">${hora}</p>
                    </div>
                    <div class="segundaFila">
                        <p id="ultimoMensaje">${mensaje}</p>
                    </div>
                </div>
                <div class="divFlechaEntrar" >
                    <img class="flechaEntrar" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702750222/reto1/icons/b8dizgwyhrlshqyhq8d3.png">
                </div>
            </div>
        </div>
    </a>
    `
}