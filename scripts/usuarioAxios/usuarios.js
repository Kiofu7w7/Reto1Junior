const url = "https://vercer-adopta.vercel.app/usuarios"

export const obtenerUsuarios = async (url) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const buscarUsuarios = async (id) => {
    try {
        const response = await axios.get(url+"/"+id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const editarUsuario = async (id, nombre, apellido, emailU, password, telefono, mascotas, img, favPerro, favGato) => {
    try {
        await axios.put(`${url}/${id}`, {
            id: id,
            nombre: nombre,
            apellidos: apellido,
            email: emailU,
            password: password,
            telefono: telefono,
            id_mascotas: mascotas,
            url_foto_perfil: img,
            id_mascotas_favoritas_perro: favPerro,
            id_mascotas_favoritas_gato: favGato
        });
        // Mostrar un mensaje de éxito al usuario si es necesario
        console.log("Usuario editado exitosamente");
    } catch (error) {
        // Manejar el error de una manera más específica, por ejemplo, mostrar un mensaje al usuario
        console.error("Error al editar usuario:", error);
    }
};