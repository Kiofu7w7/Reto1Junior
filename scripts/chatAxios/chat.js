const url = "https://renderadopta.onrender.com/chats/";
const urlAñadir = "https://renderadopta.onrender.com/chats";
export const obtenerChat = async (idEntrada, idSalida) => {
    try {
        const response = await axios.get(url);
        let chats = response.data;

        const chatEncontrado = chats.find(chat =>
            (chat.integrantes.miembro1_id === idEntrada && chat.integrantes.miembro2_id === idSalida) ||
            (chat.integrantes.miembro1_id === idSalida && chat.integrantes.miembro2_id === idEntrada)
        );

        if (!chatEncontrado) {
            // Si no se encuentra el chat, crea uno nuevo y agrégalo a la lista de chats
            console.log("NO EXISTE EL CHAT")
            const nuevoChat = {
                id: crypto.randomUUID(), // Asigna un nuevo ID único
                integrantes: {
                    miembro1_id: idEntrada,
                    miembro2_id: idSalida
                },
                mensajes: ""
            };

            await axios.post(urlAñadir, nuevoChat);
            return nuevoChat;
        }

        return chatEncontrado;
    } catch (error) {
        console.log(error);
    }
}

export const enviarMensaje = async (idChat, idUsuario, mensaje) => {
    try {
        const response = await axios.get(url);
        const chats = response.data;
        const chatEncontrado = chats.find(chat => chat.id === idChat);

        if (chatEncontrado) {
            const horaActual = obtenerHoraActual();
            const nuevoMensaje = `${idUsuario}:'${mensaje}',${horaActual}`;
            chatEncontrado.mensajes = chatEncontrado.mensajes ? `${chatEncontrado.mensajes}|${nuevoMensaje}` : nuevoMensaje;
            console.warn("FUNCIOOON")
            await axios.put(`${url}${idChat}`, chatEncontrado);
            console.log('Mensaje enviado con éxito');
        } else {
            console.log('Chat no encontrado');
        }
    } catch (error) {
        console.log(error);
    }
}

const obtenerHoraActual = () => {
    const now = new Date();
    const hora = now.getHours().toString().padStart(2, '0');
    const minutos = now.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
}