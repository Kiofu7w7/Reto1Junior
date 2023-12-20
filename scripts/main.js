const imagen = document.querySelector("#imagenInicio")
const bodyPag = document.querySelector("#bodyPagina")
const container2 = document.getElementById("container-pagina2")
const container3 = document.getElementById("container-pagina3")
const boton1 = document.getElementById("btn-siguente")
const boton2 = document.getElementById("btn-siguente3")
let contador = 0

bodyPag.addEventListener('click', function agrandar() {
    if(contador == 0){      
        imagen.classList.add("zoom");  
        contador++;
    }else if (contador == 1){
        bodyPag.style.cursor = "auto"
        imagen.style.opacity = "0";
        setTimeout(function() {
            imagen.style.display = "none";
            container2.style.display = "block";
            setTimeout(function() {
                container2.style.opacity = "1";
            }, 50);
        }, 50);
    }
})

boton1.addEventListener('click',function(){
    container2.style.opacity = "0";
    setTimeout(function() {
        container2.style.display = "none";
        container3.style.display = "block";
        setTimeout(function() {
            container3.style.opacity = "1";
        }, 50);
    }, 50);
    contador++;
})

boton2.addEventListener('click',function(){

})

