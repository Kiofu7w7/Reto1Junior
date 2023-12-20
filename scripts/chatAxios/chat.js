const url = "https://renderadopta.onrender.com/chats/";

export const obtenerChat = async (idEntrada, idSalida) => {
    try {
        const response = await axios.get(url);
        const chats = response.data;

        const chatEncontrado = chats.find(chat =>
            (chat.integrantes.miembro1_id === idEntrada && chat.integrantes.miembro2_id === idSalida) ||
            (chat.integrantes.miembro1_id === idSalida && chat.integrantes.miembro2_id === idEntrada)
        );

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
            await axios.patch(`${url}${idChat}`, chatEncontrado);
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