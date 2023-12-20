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
        console.log("Usuario editado exitosamente");
    } catch (error) {
        console.error("Error al editar usuario:", error);
    }
};