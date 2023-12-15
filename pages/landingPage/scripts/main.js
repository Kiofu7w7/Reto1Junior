const botonHome = document.getElementById("homeButton");
const botonChat = document.getElementById("chatButton");
const botonFavoritos = document.getElementById("favoritosButton");
const botonUsuario = document.getElementById("userButton");
const imagenHome = document.getElementById("homeImg")
const parrafoHome = document.getElementById("homeP")
const imgChat = document.querySelector(".chatBtnImg")
const parrafoChat = document.querySelector(".chatBtnP")


document.addEventListener("click", ({target}) => {

    if(!target.classList.contains("buttonClicked") && target.classList.contains("botonFooter")){
        if(target.classList.contains("buttonClicked")){
            console.warn("tiene la clase buttonClik")
        }

        if(target.classList.contains("botonFooter")){
            console.warn("tiene la clase botonFooter")
        }

        borrarClasesBoton()
        agregarClaseBoton(target.id)
    }

});

function borrarClasesBoton(){
    botonHome.classList.remove("buttonClicked")
    botonChat.classList.remove("buttonClicked")
    botonFavoritos.classList.remove("buttonClicked")
    botonUsuario.classList.remove("buttonClicked")
    imagenHome.classList.remove("buttonClicked")
    parrafoHome.classList.remove("buttonClicked")
    parrafoHome.style.display = "none"
    parrafoChat.style.display = "none"
    imgChat.setAttribute('src',"https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613336/reto1/icons/d8ox1ghc66blpfcybwyw.png")
    imagenHome.setAttribute('src',"https://res.cloudinary.com/dlwr6vxib/image/upload/v1702674499/reto1/icons/en21y23yvx6u2fzqcoat.png")
}

function agregarClaseBoton(boton) {
    console.log(boton)
    if (boton == "homeImg") {
        botonHome.classList.add("buttonClicked")
        parrafoHome.style.display = "block"
        imagenHome.setAttribute('src',"https://res.cloudinary.com/dlwr6vxib/image/upload/v1702613338/reto1/icons/fvgiiawms7tsil7uxell.png")
    }
    else if (boton == "btnChat") {
        botonChat.classList.add("buttonClicked")
        parrafoChat.style.display = "block"
        imgChat.setAttribute('src',"https://res.cloudinary.com/dlwr6vxib/image/upload/v1702616180/reto1/icons/bejm8wfrt8i8ve20wrgu.png")
    }
}