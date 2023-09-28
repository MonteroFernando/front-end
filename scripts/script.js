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



//Fetching
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
            //Limpiar los datos del login y ocultar
            document.querySelector(".window").style.display="none";
            document.querySelector("#loginForm input[type='text']").value="";
            document.querySelector("#loginForm input[type='password']").value="";
            document.getElementById("label_not_login").style.display="none"    
            //ingreso de datos al container info
            document.querySelector(".userId").textContent=user.id;
            document.querySelector(".userName").textContent=user.username;
            var pictureElement=document.querySelector(".user img");
            
            if (user && user.img===null){
                var rutePicture="../assets/user/user.png";
            }else{
                var rutePicture="../assets/user/"+user.img;
            }
            pictureElement.src=rutePicture
            //ingreso de datos al container profile
            document.querySelector(".container.profile .userName").textContent="Usuario: "+user.username;
            document.querySelector(".container.profile .email").textContent="email: "+user.email;
            document.querySelector(".container.profile .firstname").textContent="Nombre: "+user.firstname;
            document.querySelector(".container.profile .lastname").textContent="Apellido: "+user.lastname;
            document.querySelector(".container.profile .password").textContent="Contraseña: "+user.password;
            
            pictureElement=document.querySelector(".container.profile .data img");
            pictureElement.src=rutePicture;


        }else{
            document.getElementById("label_not_login").style.display="flex"
            document.getElementById("label_not_login").textContent="Cotraseña Incorrecta"
            
        }

    })

}

function register(){
    const data = {
        username:document.querySelector("#registForm input[type='text'][placeholder='Username']").value,
        email:document.querySelector("#registForm input[type='email']").value,
        password:document.querySelector("#registForm input[type='password']").value,
        firstname:document.querySelector("#registForm input[type='text'][placeholder='Nombre']").value,
        lastname:document.querySelector("#registForm input[type='text'][placeholder='Apellido']").value,
    };
    const jsonData=JSON.stringify(data);

    fetch(`http://127.0.0.1:5001/users/create`,{
        method:'POST',
        body:jsonData,
        headers:{
            'Content-Type':'application/json'
        },
        
    })
    .then(response=>{
        if (response.ok){
            alert("Usuario creado con éxito.");
            location.reload();
        }
    })
    .catch(error=>{
        console.error(error)
    });

}