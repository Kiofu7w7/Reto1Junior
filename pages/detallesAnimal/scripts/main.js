import { buscarUsuarios, editarUsuario } from "../../../scripts/usuarioAxios/usuarios.js";
const urlPerros = 'https://renderadopta.onrender.com/caninos/'
const urlGatos = 'https://renderadopta.onrender.com/gatitos/'
const idRecuperado = sessionStorage.getItem("idMascotaDetalles")
const tipoRecuperado = sessionStorage.getItem("perroGato")
let informacion;
const imagenUrl = document.getElementById("imagenHTML")
const nombre = document.getElementById("nombreHTML")
const sexo = document.getElementById("sexoHTML")
const raza = document.getElementById("razaHTML")
const edad = document.getElementById("edadHTML")
const direccion = document.getElementById("direccionHTML")
const historiaTitulo = document.getElementById("tituloHistoriaHTML")
const historia = document.getElementById("historiaHtml")
const contenedorPerso = document.getElementById("contenedorPersonalidades")
const favorito = document.getElementById("butonFavorito")
const imgFavorito = document.getElementById("favorito")

const obtenerMascota = async (url, id) => {
    try {
        const response = await axios.get(url + id)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function mostrasMascotas(url, id) {
    let mascotas = await obtenerMascota(url, id);
    return mascotas;
}

function crearPersonalidad(personalidad) {
    if (personalidad == "cariñoso") {
        contenedorPerso.innerHTML += `
        <div class="divPerosonalidad">
            <img class="imagenPersonalidad" id="persoImgHTML" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613339/reto1/icons/ldsyknj4wcgg5vrtyhy6.png">
            <p id="persoPHTML">Cariñoso</p>
        </div>
        `;
    }else if(personalidad == "inquieto"){
        contenedorPerso.innerHTML += `
        <div class="divPerosonalidad">
            <img class="imagenPersonalidad" id="persoImgHTML" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613339/reto1/icons/nmkhlzpgkk9f6njvuy4d.png">
            <p id="persoPHTML">Inquieto</p>
        </div>
        `;
    }else if(personalidad == "jugueton"){
        contenedorPerso.innerHTML += `
        <div class="divPerosonalidad">
            <img class="imagenPersonalidad" id="persoImgHTML" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613339/reto1/icons/wxdkaqxkonf7ho4raxrt.png">
            <p id="persoPHTML">Jugueton</p>
        </div>
        `;
    }
}


// FALTA COLOCAR EL DE LOS GATOS ..................................................... IMPORTANTE
if (tipoRecuperado == "perro") {
    (async () => {
        const data = await mostrasMascotas(urlPerros, idRecuperado);
        informacion = data.data
        imagenUrl.setAttribute("src", informacion.url)
        nombre.innerHTML = informacion.Nombre
        if (informacion.sexo == "macho") {
            sexo.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/ctqwlhlhnopqmpeqyehb.png")
        } else {
            sexo.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613337/reto1/icons/kkjjhsprraelueayhsen.png")
        }
        raza.innerText = informacion.raza
        edad.innerText = informacion.edad
        direccion.innerText = informacion.direccion
        
        for (let propiedad in informacion.personalidades) {
            let valor = informacion.personalidades[propiedad];
            if(valor){
                crearPersonalidad(propiedad)
            }
        }
        historiaTitulo.innerText = informacion.extra.titulo
        historia.innerText = informacion.extra.descripcion

    })();
}else{
    (async () => {
        const data = await mostrasMascotas(urlGatos, idRecuperado);
        informacion = data.data
        console.log(informacion)
        imagenUrl.setAttribute("src", informacion.url)
        nombre.innerHTML = informacion.Nombre
        if (informacion.sexo == "macho") {
            sexo.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/ctqwlhlhnopqmpeqyehb.png")
        } else {
            sexo.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613337/reto1/icons/kkjjhsprraelueayhsen.png")
        }
        raza.innerText = informacion.raza
        edad.innerText = informacion.edad
        direccion.innerText = informacion.direccion
        
        for (let propiedad in informacion.personalidades) {
            let valor = informacion.personalidades[propiedad];
            if(valor){
                crearPersonalidad(propiedad)
            }
        }
        historiaTitulo.innerText = informacion.extra.titulo
        historia.innerText = informacion.extra.descripcion

    })();
}

// FAVORITO BOTON

const dataUser = await buscarUsuarios("1").then(
    value => {
        let numeros = value.data.id_mascotas_favoritas_perro.split("|")
        numeros.forEach(element => {
            if (element == idRecuperado) {
                imgFavorito.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613336/reto1/icons/jcmaxesvrzzuzudgksfe.png")
                // se coloca imagen de que esta en favorito
            }
        });
        return value
    }
)

favorito.addEventListener('click', async function () {
    try {
        let favori = dataUser.data.id_mascotas_favoritas_perro
        const numeros2 = favori.split("|");
        const index = numeros2.indexOf(idRecuperado);

        if (index !== -1) {
            // Si ya está en favoritos, quitarlo
            numeros2.splice(index, 1);
            imgFavorito.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/wutq9ccbbbbb5mgd3de8.png");
        } else {
            // Si no está en favoritos, agregarlo
            numeros2.push(idRecuperado);
            imgFavorito.setAttribute("src", "https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613336/reto1/icons/jcmaxesvrzzuzudgksfe.png");
        }

        favori = numeros2.join("|");
        await editarUsuario(dataUser.data.id, dataUser.data.nombre, dataUser.data.apellidos, dataUser.data.email, dataUser.data.password, dataUser.data.telefono, dataUser.data.id_mascotas, dataUser.data.url_foto_perfil, favori, dataUser.data.id_mascotas_favoritas_gato);
    } catch (error) {
        console.error("Error al editar usuario:", error);
    }
});

