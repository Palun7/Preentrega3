const guardarSesion = "sesion";

let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
mostrar_errores_registro.innerHTML = "";

let login = document.getElementById("login");

let signup = document.getElementById("signup");

let mostrar_usuario = document.querySelector("#mostrar_usuario");

let mostrar_inicio = document.getElementById("mostrar_inicio");
mostrar_inicio.style.height = "0px";
mostrar_inicio.style.transitionDuration = ".6s";


let mostrar_registro = document.getElementById("mostrar_registro");
mostrar_registro.style.height = "0px";
mostrar_registro.style.transitionDuration = ".8s";

let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
formulario_agregar_veterinaria.style.height = "0px";


//este boton despliega el formulario para iniciar sesion y repliega el formulario de registro en el caso que este desplegado.
login.addEventListener("click", ()=>{
    let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
    mostrar_errores_registro.innerHTML = "";

    let mostrar_errores_inicio = document.getElementById("mostrar_errores_inicio");
    mostrar_errores_inicio.innerHTML = "";

    let mostrar_inicio = document.getElementById("mostrar_inicio");
    desplegar(mostrar_inicio, "100px");

    let mostrar_registro = document.getElementById("mostrar_registro");
    desplegar(mostrar_registro, "0px");
})

//este boton despliega el formulario para registrar un usuario y repliega el formulario de inicio de sesion en el caso que este desplegado.
signup.addEventListener("click", ()=>{
    let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
    mostrar_errores_registro.innerHTML = "";

    let mostrar_errores_inicio = document.getElementById("mostrar_errores_inicio");
    mostrar_errores_inicio.innerHTML = "";

    let mostrar_registro = document.getElementById("mostrar_registro");
    desplegar(mostrar_registro, "245px");

    let mostrar_inicio = document.getElementById("mostrar_inicio");
    desplegar(mostrar_inicio, "0px");
})

//funcion que le da el alto a los formularios tanto de iniciar sesion como el de registrar usuario.
function desplegar(elemento, parametro){
    if(elemento.style.height == "0px"){
        elemento.style.height = parametro;
    }else{
        elemento.style.height = "0px";
    }
}

let iniciar_sesion = document.getElementById("iniciar_sesion");

//boton que realiza el inicio de sesion guardando el usuario en un arreglo y este es el que llamamos para saber si hay un usuario logueado.
iniciar_sesion.addEventListener("click", ()=> {
    const sesion = new Array();

    let usuarios = JSON.parse(localStorage.getItem(guardarDatos));

    let username = document.getElementById("usuario").value;

    let pass = document.getElementById("pass").value;

    for(let i = 0; i < usuarios.length; i++){
    let usuario = Usuario.usuario(usuarios[i])
        if(usuario.username == username && usuario.pass == pass){
            sesion.push(usuario);
            localStorage.setItem(guardarSesion, JSON.stringify(sesion));
            document.getElementById("usuario").value = "";
            document.getElementById("pass").value = "";
            cambioVisualLogin(usuario);

            let mostrar_usuario = document.querySelector("#mostrar_usuario");
            mostrar_usuario.style.display = "block";

            let div = document.getElementById("perfil_usuario");
            div.style.display = "block";

            let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");
            contenedor_mostrar_usuario.style.display = "flex";

            let cargar_vet = document.getElementById("cargar_vet");
            cargar_vet.style.display = "block";

            let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
            formulario_agregar_veterinaria.style.display = "flex";

            let buscador = document.getElementById("buscador");
            buscador.classList.remove("buscador_sin_sesion");

            mostrarVeterinarias();
        }
    }
    if(sesion.length == 0){
        let error = document.getElementById("mostrar_errores_inicio");
        error.innerHTML = "Usuario o contraseña incorrectos";
    }
})

let cerrar_sesion = document.getElementById("boton_cerrar_sesion");

//boton que cierra la sesion y deja el arreglo de la sesion vacio.
cerrar_sesion.addEventListener("click", ()=>{
    let sesion = JSON.parse(localStorage.getItem("sesion"));
    sesion = [];
    localStorage.setItem("sesion", JSON.stringify(sesion));
    cambioVisualLogout(sesion);

    let mostrar_usuario = document.querySelector("#mostrar_usuario");
    mostrar_usuario.style.display = "none";

    let div = document.getElementById("perfil_usuario");
    div.style.display = "none";

    let cargar_vet = document.getElementById("cargar_vet");
    cargar_vet.style.display = "none";

    let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");
    contenedor_mostrar_usuario.style.top = "-5em";

    let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
    formulario_agregar_veterinaria.style.display = "none";

    let buscador = document.getElementById("buscador");
    buscador.classList.add("buscador_sin_sesion");

    mostrarVeterinarias();
})

//funcion que se llama al iniciar sesion que esconde los botones de login y registro. Por otro lado muestra el boton de cerrar sesion y el boton de mostrar los datos.
function cambioVisualLogin(usuario){
    let cerrar_sesion = document.getElementById("boton_cerrar_sesion");
    cerrar_sesion.style.display = "block";

    let mostrar_inicio = document.getElementById("mostrar_inicio");
    mostrar_inicio.style.height = "0px";
    mostrar_inicio.style.transitionDuration = ".4s";

    let error = document.getElementById("mostrar_errores_inicio");
    error.innerHTML = "";

    let login = document.getElementById("login");
    login.style.display = "none";

    let signup = document.getElementById("signup");
    signup.style.display = "none";

    let nombre_usuario = document.getElementById("nombre_del_usuario");
    nombre_usuario.innerHTML = usuario.username;

    let zona_usuario = document.getElementById("zona_usuario");
    zona_usuario.innerHTML = "Hola";

    let div_usuario_logueado = document.querySelector(".usuario-iniciado");
    div_usuario_logueado.style.display = "flex";
}

//funcion que se llama al cerrar sesion que esconde el boton de cerrar sesion y muestra los botones de login y registro.
function cambioVisualLogout(sesion){
    let cerrar_sesion = document.getElementById("boton_cerrar_sesion");
    cerrar_sesion.style.display = "none";
    localStorage.setItem("sesion", sesion);

    let login = document.getElementById("login");
    login.style.display = "block";

    let signup = document.getElementById("signup");
    signup.style.display = "block";

    let nombre_usuario = document.getElementById("nombre_del_usuario");
    nombre_usuario.innerHTML = "";

    let zona_usuario = document.getElementById("zona_usuario");
    zona_usuario.innerHTML = "";

    let div_usuario_logueado = document.querySelector(".usuario-iniciado");
    div_usuario_logueado.style.display = "none";

    let div = document.getElementById("perfil_usuario");
    div.style.height = "0px";
}

let registrar_usuario = document.getElementById("registrar_usuario");

//boton que realiza el registro de un usuario nuevo, guardandolo en el localstorage para poder llamarlo al loguearse.
registrar_usuario.addEventListener("click", ()=>{
    let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
    mostrar_errores_registro.innerHTML = "";

    let mensajes = new Array();

    let username = document.getElementById("usuario_registro").value;

    let pass1 = document.getElementById("pass_registro").value;

    let pass2 = document.getElementById("pass_registro2").value;

    let nombre = document.getElementById("nombre").value;

    let apellido = document.getElementById("apellido").value;

    let edad = document.getElementById("edad").value;

    let datos = JSON.parse(localStorage.getItem(guardarDatos));

    let repetido = false;

    for(let i = 0; i < datos.length; i++){
        if(datos[i].username === username){
            repetido = true;
            break;
        }
    }

    if(repetido){
        mensajes.push("- Ese nombre de usuario ya existe");
    }
    if(!username){
        mensajes.push("- Debes colocar un username");
    }
    if(!pass1 || pass1 < 6){
        mensajes.push("- La contraseña debe contener al menos 6 dígitos");
    }
    if(pass2 !== pass1){
        mensajes.push("- Las contraseñas deben coincidir.");
    }
    if(!nombre){
        mensajes.push("- Debes colocar un nombre");
    }
    if(!apellido){
        mensajes.push("- Debes colocar tu apellido");
    }
    if(edad < 0 || edad > 110 || !edad){
        mensajes.push("- Debes colocar una edad valida");
    }

    if(mensajes.length !== 0){
        let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
        for(let i = 0; i < mensajes.length; i++){
            let li = document.createElement("li");
            li.innerHTML = mensajes[i];
            mostrar_errores_registro.appendChild(li);
        }
    }else {
        let usuario = new Usuario(username, pass1, nombre, apellido, edad);

        document.getElementById("usuario_registro").value = "";
        document.getElementById("pass_registro").value = "";
        document.getElementById("pass_registro2").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("edad").value = "";

        const usuarios = new Array();

        for(let i = 0; i < datos.length; i++){
            let usuario_guardado = Usuario.usuario(datos[i]);
            usuarios.push(usuario_guardado);
        }
        usuarios.push(usuario);
        localStorage.setItem(guardarDatos, JSON.stringify(usuarios));

        let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");

        let h3 = document.createElement("h3");
        h3.innerHTML = "Usuario registrado con éxito.";

        mostrar_errores_registro.appendChild(h3);

        let mostrar_registro = document.getElementById("mostrar_registro");
        desplegar(mostrar_registro, "0px");
    }
})

//boton que muestra los datos del usuario logueado y tambien le permite borrar su usuario de la localstorage.
mostrar_usuario.addEventListener("click", ()=>{
    let div = document.getElementById("perfil_usuario");
    div.classList.add("perfil-usuario");
    div.style.display = "flex";
    let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");

    if(div.style.height === "0px"){
        contenedor_mostrar_usuario.style.top = "0";
        div.style.height = "250px";
        div.style.top = "0";
        div.innerHTML = "";

        let dato = JSON.parse(localStorage.getItem("sesion"));
        let usuario = dato[0];

        let username = document.createElement("h3");
        username.innerHTML = "Nombre de usuario: " + usuario.username;

        let nombre = document.createElement("h4");
        nombre.innerHTML = "Nombre: " + usuario.nombre;

        let apellido = document.createElement("h4");
        apellido.innerHTML = "Apellido: " + usuario.apellido;

        let edad = document.createElement("h4");
        edad.innerHTML = "Edad: " + usuario.edad;

        let boton_borrar_usuario = document.createElement("button");
        boton_borrar_usuario.innerHTML = "Borrar mi usuario";
        boton_borrar_usuario.classList.add("boton-borrar");
        boton_borrar_usuario.addEventListener("click", ()=>{
            let confirmación = confirm("Si borra su usuario no se podrá recuperar, ¿desea proseguir?");
            if(confirmación){
                let usuarios_guardados = JSON.parse(localStorage.getItem(guardarDatos));
                let usuario_iniciado = JSON.parse(localStorage.getItem("sesion"));
                for(let i = 0; i < usuarios_guardados.length; i++){
                    if(usuarios_guardados[i].username === usuario_iniciado[0].username){
                        usuarios_guardados = usuarios_guardados.filter(a=> a.username !== usuario_iniciado[0].username);
                        alert("Usuario eliminado, al cerrar sesion ya no podrá volver a iniciar");
                        break;
                    }
                }
                localStorage.setItem(guardarDatos, JSON.stringify(usuarios_guardados));
            }
        });

        div.appendChild(username);
        div.appendChild(nombre);
        div.appendChild(apellido);
        div.appendChild(edad);
        if(usuario.admin){
            let admin = document.createElement("h4");
            admin.innerHTML = "Es admin: Si";
            div.appendChild(admin);
        }
        div.appendChild(boton_borrar_usuario);
    }else {
        div.style.height = "0px";
        div.style.top = "-5em";
        contenedor_mostrar_usuario.style.top = "-5em";
    }
})

//boton que muestra el formulario para cargar una veterinaria una vez logueado y tambien crea el boton de guardar veterinaria.
let cargar_vet = document.getElementById("cargar_vet");
cargar_vet.addEventListener("click", ()=>{
    let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
    desplegar(formulario_agregar_veterinaria, "200px");

    let errores_veterinaria = document.getElementById("mostrar_errores_veterinaria");
    errores_veterinaria.innerHTML = "";

    let boton_cargar_veterinaria = document.createElement("button");
    boton_cargar_veterinaria.classList.add("boton_editar");
    boton_cargar_veterinaria.innerHTML = "Guardar";
    boton_cargar_veterinaria.addEventListener("click", ()=>{
        cargarVeterinaria(guardar_veterinarias, "sesion");
    });

    let div_cargar_veterinaria = document.getElementById("guardar_vet");
    div_cargar_veterinaria.innerHTML = "";
    div_cargar_veterinaria.appendChild(boton_cargar_veterinaria);

    document.getElementById("nombre_vet").value = "";
    document.getElementById("direccion_vet").value = "";
    document.getElementById("localidad_vet").value = "";
    document.getElementById("puntuacion_vet").value = "";
    document.getElementById("descripcion_vet").value = "";
})

//funcion que se inicia con la carga de la pagina y detecta si hay un usuario logueado o no y dependiendo de ello son los botones que muestra.
function verCerrarSesion(login, signup, cerrar_sesion, mostrar_usuario, bot_cargar_vet, formulario){
    let sesion;
    try{
        sesion = JSON.parse(localStorage.getItem("sesion"));

    }catch(error){
        sesion = new Array();
    }

    if(sesion && sesion.length !== 0){
        cerrar_sesion.style.display = "block";
        login.style.display = "none";
        signup.style.display = "none";

        let zona_usuario = document.getElementById("zona_usuario");
        zona_usuario.innerHTML = "Hola ";

        let nombre_usuario = document.getElementById("nombre_del_usuario");
        nombre_usuario.innerHTML = sesion[0].username;
        mostrar_usuario.style.display = "block";

        let div = document.getElementById("perfil_usuario");
        div.style.height = "0px";
        div.style.display = "none";


        bot_cargar_vet.style.display = "block";
        formulario.style.display = "flex"

        let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");
        contenedor_mostrar_usuario.style.display = "flex";

        let div_usuario_logueado = document.querySelector(".usuario-iniciado");
        div_usuario_logueado.style.display = "flex";

        let buscador = document.getElementById("buscador");
        buscador.classList.remove("buscador_sin_sesion");
    }else{
        cerrar_sesion.style.display = "none";
        login.style.display = "block";
        signup.style.display = "block";
        mostrar_usuario.style.display = "none";
        bot_cargar_vet.style.display = "none";
        formulario.style.display = "none";

        let div = document.getElementById("perfil_usuario");
        div.style.display = "block";
        div.style.height = "0px";

        let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");
        contenedor_mostrar_usuario.style.display = "none";

        let div_usuario_logueado = document.querySelector(".usuario-iniciado");
        div_usuario_logueado.style.display = "none";

        let buscador = document.getElementById("buscador");
        buscador.classList.add("buscador_sin_sesion");
    }
}
