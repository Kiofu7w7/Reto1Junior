const contenedorMasc = document.getElementById("contenedorMascotas");
let dataPerrosFav = []
let dataGatosFav = []

const obtenerUser = async (id) => {
    try {
        const response = await axios.get("https://vercer-adopta.vercel.app/usuarios/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// CAMBIAR CUANDO YA SE TENGA VARIOS USARIOS CON EL LOCALHOST
const userData = await obtenerUser("1");
const favoritosPerros = userData.id_mascotas_favoritas_perro.split("|");
const favoritosGatos = userData.id_mascotas_favoritas_gato.split("|");


const buscarAnimalPerros = async (id) => {
    try {
        const response = await axios.get("https://vercer-adopta.vercel.app/caninos/" + id);
        return response.data; 
    } catch (error) {
        console.log(error);
    }
};

async function procesarFavoritosPerros() {
    for (const element of favoritosPerros) {
        const valor = await buscarAnimalPerros(element); 
        dataPerrosFav.push(valor); 
    }
}

const buscarAnimalGatos = async (id) => {
    try {
        const response = await axios.get("https://vercer-adopta.vercel.app/gatitos/" + id);
        return response.data; 
    } catch (error) {
        console.log(error);
    }
};

async function procesarFavoritosGatos() {
    for (const element of favoritosGatos) {
        const valor = await buscarAnimalGatos(element); 
        dataGatosFav.push(valor); 
    }
}

procesarFavoritosGatos();

async function dibujarMascota(arrayPerros, arrayGatos) {
    await procesarFavoritosPerros();
    const contenedorMasc = document.getElementById('contenedorMascotas');
    let perroGato = "perro";
    contenedorMasc.innerHTML = "";

    function generarEtiqueta(element) {
        const { url, Nombre, raza, id } = element;
        return `
        <div class="animalCard">
            <img class="clicImagen ${perroGato}" id="${id}" src="${url}">
            <div class="animalInfo ${perroGato}" id="${id}">
                <p class="clicImagen ${perroGato}" id="${id}" >${Nombre}</p>
                <p class="clicImagen ${perroGato}" id="${id}" >${raza}</p>
            </div>
        </div>`;
    }
    arrayPerros.forEach((perro) => {
        contenedorMasc.innerHTML += generarEtiqueta(perro);
    });

    perroGato = "gato"

    arrayGatos?.forEach((gato) => {
        contenedorMasc.innerHTML += generarEtiqueta(gato);
    });
}

dibujarMascota(dataPerrosFav,dataGatosFav)

document.addEventListener("click", ({ target }) => {
    if (target.classList.contains("clicImagen")) {
        console.log(target.classList)
        if (target.classList.contains("perro")) {
            sessionStorage.setItem("perroGato", "perro")
        }else if (target.classList.contains("gato")){
            sessionStorage.setItem("perroGato", "gato")
        }
        sessionStorage.setItem("idMascotaDetalles", target.id)
        window.location.href = 'http://127.0.0.1:5500/pages/detallesAnimal/index.html';
    }
});