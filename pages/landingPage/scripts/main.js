const urlPerros = 'https://vercer-adopta.vercel.app/caninos'
const urlGatos = 'https://vercer-adopta.vercel.app/gatitos'
const contenedorMasc = document.getElementById("contenedorMascotas")
const botonPerros = document.getElementById("btnPerros")
const botonGatos = document.getElementById("btnGatos")

const obtenerMascotas = async (url) => {
    try {
        const response = await axios.get(url)
        return response
    } catch (error) {
        console.log(error)
    }
}

async function mostrasMascotas(url){
    let mascotas = await obtenerMascotas(url);
    return mascotas.data;
}

function dibujarMascota(informacion) {
    contenedorMasc.innerHTML = "";
    informacion?.forEach((element) => {
        const {url, Nombre, raza, id} = element;
        contenedorMasc.innerHTML += `
        <div class="animalCard">
            <img class="clicImagen" id="${id}" src="${url}">
            <div class="animalInfo clicImagen" id="${id}">
                <p class="clicImagen" id="${id}" >${Nombre}</p>
                <p class="clicImagen" id="${id}" >${raza}</p>
            </div>
        </div>`;
    });
};

async function cargarMascotas() {
    if (sessionStorage.getItem("perroGato") === "perro") {
        let mascotas = await mostrasMascotas(urlPerros);
        dibujarMascota(mascotas);
        botonGatos.classList.add("NoClickedBtn");
        botonPerros.classList.remove("NoClickedBtn");
    } else if (sessionStorage.getItem("perroGato") === "gato"){
        let mascotas = await mostrasMascotas(urlGatos);
        dibujarMascota(mascotas);
        botonPerros.classList.add("NoClickedBtn");
        botonGatos.classList.remove("NoClickedBtn");
    }
}

cargarMascotas();

botonPerros.addEventListener("click", async() => {
    let mascotas = await mostrasMascotas(urlPerros);
    dibujarMascota(mascotas);
    botonGatos.classList.add("NoClickedBtn")
    botonPerros.classList.remove("NoClickedBtn")
    sessionStorage.setItem("perroGato", "perro")
})

botonGatos.addEventListener("click", async() => {
    let mascotas = await mostrasMascotas(urlGatos);
    dibujarMascota(mascotas);
    botonPerros.classList.add("NoClickedBtn")
    botonGatos.classList.remove("NoClickedBtn")
    sessionStorage.setItem("perroGato", "gato")
})

document.addEventListener("click", ({ target }) => {
    if (target.classList.contains("clicImagen")) {
        sessionStorage.setItem("idMascotaDetalles", target.id)
        window.location.href = 'http://127.0.0.1:5500/pages/detallesAnimal/index.html';
    }
});