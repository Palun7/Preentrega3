let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
mostrar_errores_registro.innerHTML = "";

let login = document.getElementById("login");

let signup = document.getElementById("signup");

let mostrar_usuario = document.querySelector("#mostrar_usuario");

let mostrar_inicio = document.getElementById("mostrar_inicio");


let mostrar_registro = document.getElementById("mostrar_registro");
mostrar_registro.classList.add("altura-cero-ocho")

let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");


//este boton despliega el formulario para iniciar sesion y repliega el formulario de registro en el caso que este desplegado.
login.addEventListener("click", ()=>{
    let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
    mostrar_errores_registro.innerHTML = "";

    let mostrar_errores_inicio = document.getElementById("mostrar_errores_inicio");
    mostrar_errores_inicio.innerHTML = "";

    let mostrar_inicio = document.getElementById("mostrar_inicio");
    desplegar(mostrar_inicio,"altura-cientoveinte");

    let mostrar_registro = document.getElementById("mostrar_registro");
    mostrar_registro.classList.remove("altura-dos-setenta");

    document.getElementById("usuario").value = "";
    document.getElementById("pass").value = "";
})

//este boton despliega el formulario para registrar un usuario y repliega el formulario de inicio de sesion en el caso que este desplegado.
signup.addEventListener("click", ()=>{
    let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
    mostrar_errores_registro.innerHTML = "";

    let mostrar_errores_inicio = document.getElementById("mostrar_errores_inicio");
    mostrar_errores_inicio.innerHTML = "";

    let mostrar_registro = document.getElementById("mostrar_registro");
    desplegar(mostrar_registro, "altura-dos-setenta");

    let mostrar_inicio = document.getElementById("mostrar_inicio");
    mostrar_inicio.classList.remove("altura-cientoveinte");

    document.getElementById("usuario_registro").value = "";
    document.getElementById("pass_registro").value = "";
    document.getElementById("pass_registro2").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
})

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
            mostrar_usuario.classList.remove("no-mostrar");

            let div = document.getElementById("perfil_usuario");
            div.classList.remove("no-mostrar");

            let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");
            contenedor_mostrar_usuario.classList.remove("no-mostrar");

            let mostrar_inicio = document.getElementById("mostrar_inicio");
            desplegar(mostrar_inicio, "altura-cien");

            let cargar_vet = document.getElementById("cargar_vet");
            cargar_vet.classList.remove("no-mostrar");

            let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
            formulario_agregar_veterinaria.classList.remove("no-mostrar");
            formulario_agregar_veterinaria.classList.remove("altura-doscientos");

            let buscador = document.getElementById("buscador");
            buscador.classList.remove("buscador_sin_sesion");

            Toastify({
                text: `Bienvenido ${usuario.username}`,
                duration: 2000,
                gravity: 'top',
                position: 'center',
            }).showToast();

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
    cerrarSesion();
})

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

        // let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");

        // let h3 = document.createElement("h3");
        // h3.innerHTML = `Usuario ${username} registrado con éxito.`;

        // mostrar_errores_registro.appendChild(h3);

        Toastify({
            text: `${username} registrado con éxito`,
            duration: 2000,
            gravity: 'top',
            position: 'right',
        }).showToast();

        let mostrar_registro = document.getElementById("mostrar_registro");
        mostrar_registro.classList.remove("altura-dos");
    }
})

//boton que muestra los datos del usuario logueado y tambien le permite borrar su usuario de la localstorage.
mostrar_usuario.addEventListener("click", ()=>{
    let div = document.getElementById("perfil_usuario");
    div.classList.add("perfil-usuario");
    div.classList.remove("no-mostrar");

    let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");

    if(!div.classList.contains("altura-trescientos")){
        contenedor_mostrar_usuario.classList.add("top-cero");
        contenedor_mostrar_usuario.classList.remove("top-menos-cinco");

        div.classList.add("altura-trescientos");
        div.classList.add("top-cero");
        div.classList.remove("top-menos-cinco");
        div.innerHTML = "";

        mostrar_usuario.innerHTML = "Ocultar mis datos";

        let dato = JSON.parse(localStorage.getItem(guardarSesion));
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
            // let confirmación = confirm("Si borra su usuario no se podrá recuperar, ¿desea proseguir?");
            // if(confirmación){
            //     let usuarios_guardados = JSON.parse(localStorage.getItem(guardarDatos));
            //     let usuario_iniciado = JSON.parse(localStorage.getItem(guardarSesion));
            //     for(let i = 0; i < usuarios_guardados.length; i++){
            //         if(usuarios_guardados[i].username === usuario_iniciado[0].username){
            //             usuarios_guardados = usuarios_guardados.filter(a=> a.username !== usuario_iniciado[0].username);
            //             cerrarSesion();
            //             // let mostrar_errores_registro = document.getElementById("mostrar_errores_registro");
            //             // let h3 = document.createElement("h3");
            //             // h3.innerHTML = `Usuario ${usuario.username} eliminado con éxito.`;
            //             // mostrar_errores_registro.appendChild(h3);
            //             Toastify({
            //                 text: `Usuario ${usuario.username} eliminado con éxito`,
            //                 duration: 3000,
            //                 gravity: 'top',
            //                 position: 'center',
            //             }).showToast();
            //             break;
            //         }
            //     }
            //     localStorage.setItem(guardarDatos, JSON.stringify(usuarios_guardados));
            // }
            Swal.fire({
                title: "Si borra su usuario no se podrá recuperar, ¿desea proseguir?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar"
            }).then((result) => {
                if (result.isConfirmed) {
                    let usuarios_guardados = JSON.parse(localStorage.getItem(guardarDatos));
                    let usuario_iniciado = JSON.parse(localStorage.getItem(guardarSesion));
                    for(let i = 0; i < usuarios_guardados.length; i++){
                        if(usuarios_guardados[i].username === usuario_iniciado[0].username){
                            usuarios_guardados = usuarios_guardados.filter(a=> a.username !== usuario_iniciado[0].username);
                            cerrarSesion();
                            break;
                        }
                    }
                    localStorage.setItem(guardarDatos, JSON.stringify(usuarios_guardados));
                    Swal.fire({
                    title: "¡Borrado!",
                    text: "Tu usario ya no existe.",
                    icon: "success"
                    });
                }
            });
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
        div.classList.remove("altura-trescientos");
        div.classList.remove("top-cero");
        div.classList.add("top-menos-cinco");

        mostrar_usuario.innerHTML = "Mostrar mis datos";

        contenedor_mostrar_usuario.classList.remove("top-cero");
        contenedor_mostrar_usuario.classList.add("top-menos-cinco");
    }
})