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

export const editarUsuario = async (id, nombre, apellido, emailU, password, telefono, mascotas, img) => {
    try {
        await axios.put(url+"/"+id,{
            id:id,
            nombre: nombre,
            apellidos: apellido,
            email: emailU,
            password: password,
            telefono: telefono,
            id_mascotas: mascotas,
            url_foto_perfil: img
        })
    } catch (error) {
        console.log(error)
    }
}