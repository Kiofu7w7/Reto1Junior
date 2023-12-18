import { buscarUsuarios, editarUsuario } from "../../../scripts/usuarioAxios/usuarios.js";

const nombre = document.getElementById("nombrePerfil")
const apellido = document.getElementById("apellidoPerfil")
const correo = document.getElementById("correoPerfil")
const imagen = document.getElementById("imagenPerfil")
const nombreCompleto = document.getElementById("nombreCompletoPerfil")
const botonGuardar = document.getElementById("btnGuardar")

const dataUser = await buscarUsuarios("1").then(
    value => {
        return value
    }
)

console.log(dataUser.data)

nombreCompleto.innerText = `${dataUser.data.nombre} ${dataUser.data.apellidos}`
imagen.setAttribute("src" , dataUser.data.url_foto_perfil)
nombre.value = dataUser.data.nombre
apellido.value = dataUser.data.apellidos
correo.value = dataUser.data.email

botonGuardar.addEventListener('click', function() {
    editarUsuario(dataUser.data.id, nombre.value, apellido.value, correo.value, dataUser.data.password, dataUser.data.telefono, dataUser.data.id_mascotas, dataUser.data.url_foto_perfil);
    location.reload()
});