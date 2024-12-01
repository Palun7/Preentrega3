const guardarSesion = "sesion";

//funcion que le da el alto a los formularios tanto de iniciar sesion como el de registrar usuario.
function desplegar(elemento, clase){
    if(elemento.classList.contains(clase)){
        elemento.classList.remove(clase);
    }else{
        elemento.classList.add(clase);
    }
}

//funcion que se llama al iniciar sesion que esconde los botones de login y registro. Por otro lado muestra el boton de cerrar sesion y el boton de mostrar los datos.
function cambioVisualLogin(){
    let cerrar_sesion = document.getElementById("boton_cerrar_sesion");
    cerrar_sesion.classList.remove("no-mostrar");

    let mostrar_inicio = document.getElementById("mostrar_inicio");
    desplegar(mostrar_inicio,"altura-cientoveinte");
    mostrar_inicio.classList.add("no-mostrar");

    let error = document.getElementById("mostrar_errores_inicio");
    error.innerHTML = "";

    let login = document.getElementById("login");
    login.classList.add("no-mostrar");

    let signup = document.getElementById("signup");
    signup.classList.add("no-mostrar");
}

//funcion que se llama al cerrar sesion que esconde el boton de cerrar sesion y muestra los botones de login y registro.
function cambioVisualLogout(sesion, usuario){
    let cerrar_sesion = document.getElementById("boton_cerrar_sesion");
    cerrar_sesion.classList.add("no-mostrar");
    localStorage.setItem(guardarSesion, sesion);

    let login = document.getElementById("login");
    login.classList.remove("no-mostrar");

    let signup = document.getElementById("signup");
    signup.classList.remove("no-mostrar");

    let mostrar_inicio = document.getElementById("mostrar_inicio");
    mostrar_inicio.classList.remove("no-mostrar");

    Toastify({
        text: `${usuario.username} cerró sesión`,
        duration: 2000,
        gravity: 'top',
        position: 'center',
    }).showToast();
}

//funcion que se inicia con la carga de la pagina y detecta si hay un usuario logueado o no y dependiendo de ello son los botones que muestra.
function setearPagina(login, signup, cerrar_sesion, mostrar_usuario, bot_cargar_vet, formulario){
    veterinariasBase();
    let div = document.getElementById("perfil_usuario");
    let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");
    let buscador = document.getElementById("buscador");

    let sesion;
    try{
        sesion = JSON.parse(localStorage.getItem(guardarSesion));

    }catch(error){
        sesion = new Array();
    }

    if(sesion && sesion.length !== 0){
        div.classList.add("no-mostrar");

        login.classList.add("no-mostrar");

        signup.classList.add("no-mostrar");

        mostrar_usuario.classList.remove("no-mostrar");

        cerrar_sesion.classList.remove("no-mostrar");

        bot_cargar_vet.classList.remove("no-mostrar");

        formulario.classList.remove("no-mostrar");

        contenedor_mostrar_usuario.classList.remove("no-mostrar");

        buscador.classList.remove("buscador_sin_sesion");
    }else{
        div.classList.remove("no-mostrar");

        login.classList.remove("no-mostrar");

        signup.classList.remove("no-mostrar");

        mostrar_usuario.classList.add("no-mostrar");

        bot_cargar_vet.classList.add("no-mostrar");

        formulario.classList.add("no-mostrar");

        cerrar_sesion.classList.add("no-mostrar");

        contenedor_mostrar_usuario.classList.add("no-mostrar");

        buscador.classList.add("buscador_sin_sesion");
    }
}

//Funcion para cargar una veterinaria a traves del formulario del html
function cargarVeterinaria(clave_vet, clave_sesion){
    let mensaje = new Array();
    let mostrar_errores = document.getElementById("mostrar_errores_veterinaria");
    mostrar_errores.innerHTML = "";

    let nombre = document.getElementById("nombre_vet").value;
    let direccion = document.getElementById("direccion_vet").value;
    let localidad = document.getElementById("localidad_vet").value;
    let puntuacion = document.getElementById("puntuacion_vet").value;
    let descripcion = document.getElementById("descripcion_vet").value;

    let usuario_logueado = JSON.parse(localStorage.getItem(clave_sesion));
    usuario_logueado = usuario_logueado[0].username;

    let veterinarias_guardadas = JSON.parse(localStorage.getItem(clave_vet));
    for(let i = 0; i < veterinarias_guardadas.length; i++){
        if(veterinarias_guardadas[i].nombre.toLowerCase() === nombre.toLowerCase() && veterinarias_guardadas[i].direccion.toLowerCase() === direccion.toLowerCase()){
            mensaje.push("La veterinaria ya esta cargada");
        }
        else if(veterinarias_guardadas[i].nombre.toLowerCase() === nombre.toLowerCase()){
            mensaje.push('Ya existe una veterinaria con ese nombre, agregarle un distintivo, ej:"veterinaria calle"');
        }
    }

    if(nombre === ""){
        mensaje.push("Debes colocar un nombre");
    }
    if(direccion === ""){
        mensaje.push("Debes colocar la dirección");
    }
    if(localidad === ""){
        mensaje.push("Debes colocar la localidad");
    }
    if(puntuacion < 1 || puntuacion > 5){
        mensaje.push("La puntuación debe ser del 1 al 5");
    }

    if(mensaje.length === 0){
        let vete_nueva = new Veterinaria(nombre, direccion, localidad, puntuacion, descripcion, usuario_logueado);
        vete_nueva.cargarFecha();
        let veterinarias_guardadas = JSON.parse(localStorage.getItem(clave_vet));

        if(veterinarias_guardadas){
            veterinarias_guardadas.push(vete_nueva);
            localStorage.setItem(clave_vet, JSON.stringify(veterinarias_guardadas));
        }else {
            veterinarias_guardadas = new Array();
            veterinarias_guardadas.push(vete_nueva);
            localStorage.setItem(clave_vet, JSON.stringify(veterinarias_guardadas));
        }
        document.getElementById("nombre_vet").value = "";
        document.getElementById("direccion_vet").value = "";
        document.getElementById("localidad_vet").value = "";
        document.getElementById("puntuacion_vet").value = "";
        document.getElementById("descripcion_vet").value = "";

        let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
        formulario_agregar_veterinaria.classList.remove("altura-dos");

        Toastify({
            text: 'Veterinaria agregada con éxito',
            duration: 3000,
            gravity: 'top',
            position: 'center',
        }).showToast();

        mostrarVeterinarias();
    }else {
        for(let i = 0; i<mensaje.length; i++){
            let li = document.createElement("li");
            li.innerHTML = mensaje[i];
            mostrar_errores.appendChild(li);
        }
    }
}

//Funcion para editar una veterinaria a traves del formulario del html
function editarVeterinaria(clave_vet, clave_sesion, fecha){
    let mensaje = new Array();
    let mostrar_errores = document.getElementById("mostrar_errores_veterinaria");
    mostrar_errores.innerHTML = "";

    let nombre = document.getElementById("nombre_vet").value;
    let direccion = document.getElementById("direccion_vet").value;
    let localidad = document.getElementById("localidad_vet").value;
    let puntuacion = document.getElementById("puntuacion_vet").value;
    let descripcion = document.getElementById("descripcion_vet").value;

    let usuario_logueado = JSON.parse(localStorage.getItem(clave_sesion));
    usuario_logueado = usuario_logueado[0].username;

    let veterinarias_guardadas = JSON.parse(localStorage.getItem(clave_vet));
    for(let i = 0; i < veterinarias_guardadas.length; i++){
        if(veterinarias_guardadas[i].nombre.toLowerCase() === nombre.toLowerCase() && veterinarias_guardadas[i].direccion.toLowerCase() === direccion.toLowerCase()){
            mensaje.push("La veterinaria ya esta cargada");
        }
        else if(veterinarias_guardadas[i].nombre.toLowerCase() === nombre.toLowerCase()){
            mensaje.push('Ya existe una veterinaria con ese nombre, agregarle un distintivo, ej:"veterinaria calle"');
        }
    }

    if(nombre === ""){
        mensaje.push("Debes colocar un nombre");
    }
    if(direccion === ""){
        mensaje.push("Debes colocar la dirección");
    }
    if(localidad === ""){
        mensaje.push("Debes colocar la localidad");
    }
    if(puntuacion < 1 || puntuacion > 5){
        mensaje.push("La puntuación debe ser del 1 al 5");
    }

    if(mensaje.length === 0){
        let vete_nueva = new Veterinaria(nombre, direccion, localidad, puntuacion, descripcion, usuario_logueado);
        vete_nueva.fecha = fecha;
        vete_nueva.editarVet();

        if(veterinarias_guardadas){
            veterinarias_guardadas.push(vete_nueva);
            localStorage.setItem(clave_vet, JSON.stringify(veterinarias_guardadas));
        }else {
            veterinarias_guardadas = new Array();
            veterinarias_guardadas.push(vete_nueva);
            localStorage.setItem(clave_vet, JSON.stringify(veterinarias_guardadas));
        }
        document.getElementById("nombre_vet").value = "";
        document.getElementById("direccion_vet").value = "";
        document.getElementById("localidad_vet").value = "";
        document.getElementById("puntuacion_vet").value = "";
        document.getElementById("descripcion_vet").value = "";

        let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
        formulario_agregar_veterinaria.classList.remove("altura-dos");

        mostrarVeterinarias();
    }else {
        for(let i = 0; i<mensaje.length; i++){
            let li = document.createElement("li");
            li.innerHTML = mensaje[i];
            mostrar_errores.appendChild(li);
        }
    }
}

//funcion que llama del localStorage las veterinarias guardadas y usa la funcion de crear el div para mostrarlas en la pagina.
function mostrarVeterinarias(){
    let div_veterinarias = document.getElementById("veterinarias");
    div_veterinarias.innerHTML = "";
    let veterinarias_guardadas = JSON.parse(localStorage.getItem(guardar_veterinarias));
    if(veterinarias_guardadas){
        crearDivVeterinaria(veterinarias_guardadas, div_veterinarias, guardar_veterinarias, guardarSesion);
    }
}

//Funcion muestra las veterinarias que esten adentro del arreglo que se le pase en un div.
//Tambien se le agrega el boton de eliminar y otro de editar la veterinaria (siempre y cuando sea el usuario que la creó o un admin)
//El boton de editar veterinaria lleva los datos de esa veterinaria al formulario de cargar veterinaria,
//por otra parte crea el boton de "editar" abajo del formulario de cargar veterinaria. Este boton toma los datos que se pusieron en el formulario,
//elimina la veterinaria a editar y crea una nueva con los datos que se le estan pasando.
function crearDivVeterinaria(arreglo, div_contenedor, clave_vet, clave_sesion){
    for(let i = 0; i < arreglo.length; i++){
        let div = document.createElement("div");
        div.classList.add("contenedor_veterinarias");

        let nombre = document.createElement("h3");
        let direccion = document.createElement("p");
        let localidad = document.createElement("p");
        let puntuacion = document.createElement("p");
        let descripcion = document.createElement("p");
        let cargado_por = document.createElement("p");
        let fecha = document.createElement("p");
        let actualizacion = document.createElement("p");

        nombre.innerHTML = "Nombre: " + arreglo[i].nombre;
        direccion.innerHTML = "Dirección: " + arreglo[i].direccion;
        localidad.innerHTML = "Localidad: " + arreglo[i].localidad;
        puntuacion.innerHTML = "Puntuación: " + arreglo[i].puntuacion +" Estrellas";
        descripcion.innerHTML = "Reseña: " + arreglo[i].descripcion;
        cargado_por.innerHTML = "Recomendada por: " + arreglo[i].usuario;

        if(arreglo[i].fecha){
            fecha.innerHTML = "Cargada el " + arreglo[i].fecha;
        }
        if(arreglo[i].actualizacion){
            actualizacion.innerHTML = "Actualizada el " + arreglo[i].actualizacion;
        }

        let usuario_logueado;
        try{
            usuario_logueado = JSON.parse(localStorage.getItem(guardarSesion));
        }catch(error){
            usuario_logueado = [];
        }
        let boton_borrar = document.createElement("button");
        boton_borrar.classList.add("boton-borrar");
        boton_borrar.innerHTML = "Eliminar Veterinaria";
        boton_borrar.addEventListener("click", ()=>{
            // let confirmación = confirm(`Se esta por eliminar la veterinaria ${arreglo[i].nombre}, ¿desea proseguir?`);
            // if(confirmación){
            //     arreglo = arreglo.filter(vete => vete.nombre !== arreglo[i].nombre);
            //     localStorage.setItem(guardar_veterinarias, JSON.stringify(arreglo));
            //     mostrarVeterinarias();
            // }
            Swal.fire({
                title: `¿Borrar veterinaria ${arreglo[i].nombre}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "¡Borrada!",
                        text: `${arreglo[i].nombre} ya no existe.`,
                        icon: "success"
                    });
                    arreglo = arreglo.filter(vete => vete.nombre !== arreglo[i].nombre);
                    localStorage.setItem(guardar_veterinarias, JSON.stringify(arreglo));
                    mostrarVeterinarias();
                }
            });
        })

        let boton_editar = document.createElement("button");
        boton_editar.classList.add("boton_editar");
        boton_editar.innerHTML = "Editar veterinaria";
        boton_editar.addEventListener("click", ()=>{
            let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
            formulario_agregar_veterinaria.classList.add("altura-dos");

            document.getElementById("nombre_vet").value = arreglo[i].nombre;
            document.getElementById("direccion_vet").value = arreglo[i].direccion;
            document.getElementById("localidad_vet").value = arreglo[i].localidad;
            document.getElementById("puntuacion_vet").value = arreglo[i].puntuacion;
            document.getElementById("descripcion_vet").value = arreglo[i].descripcion;

            let div_editar_veterinaria = document.getElementById("guardar_vet");
            div_editar_veterinaria.innerHTML = "";
            let boton_editar_veterinaria = document.createElement("button");
            boton_editar_veterinaria.innerHTML = "Editar";
            boton_editar_veterinaria.classList.add("boton_editar");
            boton_editar_veterinaria.addEventListener("click", ()=>{
                // let confirmación = confirm("¿Desea aplicar los cambios ");

                // if(confirmación){
                //     arreglo = arreglo.filter((vete ,index) => index !== i);
                //     localStorage.setItem(clave_vet, JSON.stringify(arreglo));
                //     cargarVeterinaria(clave_vet, clave_sesion);
                // }else{
                //     formulario_agregar_veterinaria.classList.remove("altura-doscientos");

                //     document.getElementById("nombre_vet").value = "";
                //     document.getElementById("direccion_vet").value = "";
                //     document.getElementById("localidad_vet").value = "";
                //     document.getElementById("puntuacion_vet").value = "";
                //     document.getElementById("descripcion_vet").value = "";
                // }
                Swal.fire({
                    title: `¿Aplicar cambios a ${arreglo[i].nombre}?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, editar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Editada :)",
                            text: `${arreglo[i].nombre} se actualizó.`,
                            icon: "success"
                        });
                        let fecha = arreglo[i].fecha;
                        arreglo = arreglo.filter((vete ,index) => index !== i);
                        localStorage.setItem(clave_vet, JSON.stringify(arreglo));
                        editarVeterinaria(clave_vet, clave_sesion, fecha);
                    }else{
                        formulario_agregar_veterinaria.classList.remove("altura-dos");

                        document.getElementById("nombre_vet").value = "";
                        document.getElementById("direccion_vet").value = "";
                        document.getElementById("localidad_vet").value = "";
                        document.getElementById("puntuacion_vet").value = "";
                        document.getElementById("descripcion_vet").value = "";
                    }
                });
            });
            div_editar_veterinaria.appendChild(boton_editar_veterinaria);
        })

        div.appendChild(nombre);
        div.appendChild(direccion);
        div.appendChild(localidad);
        div.appendChild(puntuacion);
        if(arreglo[i].descripcion !== ""){
            div.appendChild(descripcion);
        }
        div.appendChild(cargado_por);
        div.appendChild(fecha);
        div.appendChild(actualizacion);
        try{
            if(arreglo[i].usuario === usuario_logueado[0].username || usuario_logueado[0].admin === true){
                div.appendChild(boton_borrar);
                div.appendChild(boton_editar);
            }
        }catch(error){
        }
        div_contenedor.appendChild(div);
    }
}

// Funcion que cierra la sesion y deja el arreglo de la sesion vacio.
function cerrarSesion(){
    let sesion = JSON.parse(localStorage.getItem(guardarSesion));
    let usuario = sesion[0];
    sesion = [];
    localStorage.setItem(guardarSesion, JSON.stringify(sesion));
    cambioVisualLogout(sesion, usuario);

    let mostrar_usuario = document.querySelector("#mostrar_usuario");
    mostrar_usuario.classList.add("no-mostrar");

    let div = document.getElementById("perfil_usuario");
    div.classList.add("no-mostrar");
    div.classList.remove("altura-dos-cincuenta");
    div.classList.remove("top-cero");
    div.classList.add("top-menos-cinco");

    let cargar_vet = document.getElementById("cargar_vet");
    cargar_vet.classList.add("no-mostrar");

    let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
    formulario_agregar_veterinaria.classList.add("no-mostrar");

    let buscador = document.getElementById("buscador");
    buscador.classList.add("buscador_sin_sesion");

    let contenedor_mostrar_usuario = document.getElementById("contenedor_mostrar_usuario");
    contenedor_mostrar_usuario.classList.remove("top-cero");
    contenedor_mostrar_usuario.classList.add("top-menos-cinco");

    mostrarVeterinarias();
}

const veterinariasBase = async()=> {
    let veterinarias_contenedor = document.getElementById("veterinarias");
    veterinarias_contenedor.innerHTML = "";

    const vete_json = await fetch("./veterinarias_base.json");
    const vetes_base = await vete_json.json();

    vetes_base.veterinarias.forEach(veterinaria => {
        let veterinarias_guardadas = JSON.parse(localStorage.getItem(guardar_veterinarias)) || [];

        let vete_nueva = new Veterinaria(veterinaria.nombre, veterinaria.direccion, veterinaria.localidad, veterinaria.puntuacion, veterinaria.descripcion, veterinaria.usuario);

        let num = 0;

        for(let i = 0; i < veterinarias_guardadas.length; i++){
            if(vete_nueva.nombre === veterinarias_guardadas[i].nombre){
                num++
            }
        }

        if(num === 0){
            veterinarias_guardadas.push(vete_nueva);
            localStorage.setItem(guardar_veterinarias, JSON.stringify(veterinarias_guardadas));
        }
    })
}
