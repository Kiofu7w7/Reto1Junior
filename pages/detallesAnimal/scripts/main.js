const urlPerros = 'https://vercer-adopta.vercel.app/caninos/'
const urlGatos = 'https://vercer-adopta.vercel.app/gatitos/'
const idRecuperado = localStorage.getItem("idMascotaDetalles")
const tipoRecuperado = localStorage.getItem("perroGato")
let informacion;
const imagenUrl = document.getElementById("imagenHTML")
const nombre = document.getElementById("nombreHTML")
const sexo = document.getElementById("sexoHTML")
const raza = document.getElementById("razaHTML")
const edad = document.getElementById("edadHTML")
const direccion = document.getElementById("direccionHTML")
// si se puede colocar en caso de que hallan mas personalidades
const personalidad1Img = document.getElementById("perso1ImgHTML")
const personalidad2Img = document.getElementById("perso2ImgHTML")
const personalidad3Img = document.getElementById("perso3ImgHTML")
const personalidad1P = document.getElementById("perso1PHTML")
const personalidad2P = document.getElementById("perso2PHTML")
const personalidad3P = document.getElementById("perso3PHTML")
const historiaTitulo = document.getElementById("tituloHistoriaHTML")
const historia = document.getElementById("historiaHtml")

const obtenerMascota = async (url, id) => {
    try {
        const response = await axios.get(url+id)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function mostrasMascotas(url, id){
    let mascotas = await obtenerMascota(url, id); // changed from obtenerMascotas to obtenerMascota
    return mascotas;
}

if (tipoRecuperado == "perro") {
    (async () => {
        const data = await mostrasMascotas(urlPerros, idRecuperado);
        informacion = data.data
        console.log(informacion)
        imagenUrl.setAttribute("src",informacion.url)
        nombre.innerHTML= informacion.Nombre
        if (informacion.sexo = "macho") {
            sexo.setAttribute("src","https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/ctqwlhlhnopqmpeqyehb.png")
        }else{
            sexo.setAttribute("src","https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613337/reto1/icons/kkjjhsprraelueayhsen.png")
        }
        raza.innerText = informacion.raza
        edad.innerText = informacion.edad
        direccion.innerText = informacion.direccion
        // ACA COLOCAR LAS PERSONALIDADES --------------------------------------------------------------------------------- ACA VOY
        if()
    })();
}


