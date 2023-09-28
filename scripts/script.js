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
const showChanels=(id)=>{
    var chan=document.getElementById("chanels");
    if(chan.style.display=="block"){
        chan.style.display="none";
        document.querySelector(".listChanels").innerHTML = ''
    }else{
        chan.style.display="block";
        var m=document.createElement("span");
        m.textContent=id;
        var listChanels = document.querySelector(".listChanels");
        listChanels.appendChild(m);

        
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
            //Limpiar los datos del login anterior y ocultar
            document.querySelector(".window").style.display="none";
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

            //ingreso de servidores

            var servers=user.servers

            if (servers.length>1){

                for (var i=0;i<servers.length;i++){
                    var newDiv = document.createElement("div");
                    (function(id){
                        newDiv.onclick=function(){
                            showChanels(id);
                        };
                    })(servers[i].id);
                    var span_server=document.createElement("span");
                    span_server.textContent=servers[i].name;
                    span_server.className="serverName";
                    
                    var span_join=document.createElement("span");
                    span_join.textContent=" __ id#";
                    
                    var img_server=document.createElement("img");
                    img_server.alt="picServer";
                    if (servers[i].img ===null){
                        var picture="../assets/server/server.jpg"
                    }else{
                        var picture="../assets/server/"+servers[i].img;
                    };
                    img_server.src=picture;
                    
                    var span_server_id=document.createElement("span");
                    span_server_id.textContent=servers[i].id;
                    span_server_id.id=servers[i].id;
                    
                    newDiv.appendChild(img_server);
                    newDiv.appendChild(span_server);
                    newDiv.appendChild(span_join);
                    newDiv.appendChild(span_server_id);

                    document.querySelector(".container.info .servers").appendChild(newDiv)

                }
            }else{
                var newDiv=document.createElement("div");
                var newSpan=document.createElement("span");
                newSpan.textContent="SIN SERVIDORES SELECCIONADOS"
                newDiv.appendChild(newSpan)
                document.querySelector(".container.info .servers").appendChild(newDiv)
            }
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