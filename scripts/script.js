 // Al cargar la página, muestra la ventana de inicio de sesión por defecto.
 document.addEventListener("DOMContentLoaded", function () {
    showFloat("login");
});
//muestra los containers
const showContainer=(id)=>{
    var containers=["search","chat","profile"]; //a;adir los containers creados
    for(i of containers){
        if(i!=id){
            var toHide=document.getElementById(i);
            toHide.style.display="none";
        }
    }
    var toShow=document.getElementById(id);
    toShow.style.display="block";
}
//muestra las ventanas flotantes
const showFloat=(id)=>{
    var wind=document.querySelector(".window");
    wind.style.display="flex";
    var windows=["login","regin","joinServer","createServer"]; //a;adir las nuevas ventanas creadas
    for(i of windows){
        if(i!=id){
            var toHide=document.getElementById(i);
            toHide.style.display="none";
        }
    }
    var toShow=document.getElementById(id);
    toShow.style.display="flex";
}

//toggle chanels
const showChanels=()=>{
    var chan=document.getElementById("chanels");
    if(chan.style.display=="block"){
        chan.style.display="none";
    }else{
        chan.style.display="block";
    }
}

//Eventos en formularios

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

document.getElementById("registForm").addEventListener("submit", function (event) {
    event.preventDefault();
    register();
});



//funciones
function login(){
    const username=document.querySelector("#loginForm input[type='text']").value;
    const password=document.querySelector("#loginForm input[type='password']").value;

    fetch(`http://127.0.0.1:5001/users/get?username=${username}`,{
        method:'GET',
        /*credentials:'include'*/
    })
    .then (response => response.json()) 
    .then(data =>{
        const user=data[0];
        if (user && user.password===password){
            
        }else{
            var label=document.getElementById("label_not_login")
            label.style.display="block"
            label.textContent="Contraseña Incorrecta"
        }

    })

}

function register(){
    const data = {
        username:document.querySelector("#registForm input[type='text']").value,
        email:document.querySelector("#registForm input[type='email]").value,
        password:document.querySelector("#registForm input[type='password]").value,
        firstname:document.querySelector("#registForm input[type='text]").value,
        lastname:document.querySelector("#registForm input[type='text]").value,

    }

    const fer=1234;

}