//Funcion para cargar una veterinaria a traves del formulario del html
function cargarVeterinaria(){
    let mensaje = new Array();
    let mostrar_errores = document.getElementById("mostrar_errores_veterinaria");
    mostrar_errores.innerHTML = "";

    let nombre = document.getElementById("nombre_vet").value;
    let direccion = document.getElementById("direccion_vet").value;
    let localidad = document.getElementById("localidad_vet").value;
    let puntuacion = document.getElementById("puntuacion_vet").value;
    let descripcion = document.getElementById("descripcion_vet").value;

    let usuario_logueado = JSON.parse(localStorage.getItem("sesion"));
    usuario_logueado = usuario_logueado[0].username;

    let veterinarias_guardadas = JSON.parse(localStorage.getItem(guardar_veterinarias));
    for(let i = 0; i < veterinarias_guardadas.length; i++){
        if(veterinarias_guardadas[i].nombre === nombre && veterinarias_guardadas[i].direccion === direccion){
            mensaje.push("La veterinaria ya esta cargada");
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
        let veterinarias_guardadas = JSON.parse(localStorage.getItem(guardar_veterinarias));

        if(veterinarias_guardadas){
            veterinarias_guardadas.push(vete_nueva);
            localStorage.setItem(guardar_veterinarias, JSON.stringify(veterinarias_guardadas));
        }else {
            veterinarias_guardadas = new Array();
            veterinarias_guardadas.push(vete_nueva);
            localStorage.setItem(guardar_veterinarias, JSON.stringify(veterinarias_guardadas));
        }
        document.getElementById("nombre_vet").value = "";
        document.getElementById("direccion_vet").value = "";
        document.getElementById("localidad_vet").value = "";
        document.getElementById("puntuacion_vet").value = "";
        document.getElementById("descripcion_vet").value = "";

        let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
        formulario_agregar_veterinaria.style.height = "0px";
        mostrarVeterinarias();
    }else {
        for(let i = 0; i<mensaje.length; i++){
            let li = document.createElement("li");
            li.innerHTML = mensaje[i];
            mostrar_errores.appendChild(li);
        }
    }
}

//Funcion que llama del localstorage a las veterinarias y las muestra en un div, tambien se le agrega el boton de eliminar a la veterinaria (siempre y cuando sea el usuario que la creó)
function mostrarVeterinarias(){
    let div_veterinarias = document.getElementById("veterinarias");
    div_veterinarias.innerHTML = "";
    let veterinarias_guardadas = JSON.parse(localStorage.getItem(guardar_veterinarias));
    if(veterinarias_guardadas){
        for(let i = 0; i < veterinarias_guardadas.length; i++){
            let div = document.createElement("div");
            div.classList.add("contenedor_veterinarias");

            let nombre = document.createElement("h3");
            let direccion = document.createElement("p");
            let localidad = document.createElement("p");
            let puntuacion = document.createElement("p");
            let descripcion = document.createElement("p");
            let cargado_por = document.createElement("p");

            nombre.innerHTML = "Nombre: " + veterinarias_guardadas[i].nombre;
            direccion.innerHTML = "Dirección: " + veterinarias_guardadas[i].direccion;
            localidad.innerHTML = "Localidad: " + veterinarias_guardadas[i].localidad;
            puntuacion.innerHTML = "Puntuación: " + veterinarias_guardadas[i].puntuacion+" Estrellas";
            descripcion.innerHTML = "Reseña: " + veterinarias_guardadas[i].descripcion;
            cargado_por.innerHTML = "Recomendada por: " + veterinarias_guardadas[i].usuario;

            let usuario_logueado;
            try{
                usuario_logueado = JSON.parse(localStorage.getItem("sesion"));
            }catch(error){
                usuario_logueado = [];
            }
            let boton_borrar = document.createElement("button");
            boton_borrar.classList.add("boton-borrar");
            boton_borrar.innerHTML = "Eliminar Veterinaria";
            boton_borrar.addEventListener("click", ()=>{
                let confirmación = confirm(`Se esta por eliminar la veterinaria ${veterinarias_guardadas[i].nombre}, ¿desea proseguir?`);
                if(confirmación){
                    veterinarias_guardadas = veterinarias_guardadas.filter(vete => vete.nombre !== veterinarias_guardadas[i].nombre);
                    localStorage.setItem(guardar_veterinarias, JSON.stringify(veterinarias_guardadas));
                    mostrarVeterinarias();
                }
            })

            let boton_editar = document.createElement("button");
            boton_editar.classList.add("boton_editar");
            boton_editar.innerHTML = "Editar veterinaria";
            boton_editar.addEventListener("click", ()=>{
                let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
                formulario_agregar_veterinaria.style.height = "200px";

                document.getElementById("nombre_vet").value = veterinarias_guardadas[i].nombre;
                document.getElementById("direccion_vet").value = veterinarias_guardadas[i].direccion;
                document.getElementById("localidad_vet").value = veterinarias_guardadas[i].localidad;
                document.getElementById("puntuacion_vet").value = veterinarias_guardadas[i].puntuacion;
                document.getElementById("descripcion_vet").value = veterinarias_guardadas[i].descripcion;

                let div_editar_veterinaria = document.getElementById("guardar_vet");
                div_editar_veterinaria.innerHTML = "";
                let boton_editar_veterinaria = document.createElement("button");
                boton_editar_veterinaria.innerHTML = "Editar";
                boton_editar_veterinaria.classList.add("boton_editar");
                boton_editar_veterinaria.addEventListener("click", ()=>{
                    let confirmación = confirm("¿Desea aplicar los cambios ");

                    if(confirmación){
                        veterinarias_guardadas = veterinarias_guardadas.filter(vete => vete.nombre !== veterinarias_guardadas[i].nombre);
                        localStorage.setItem(guardar_veterinarias, JSON.stringify(veterinarias_guardadas));
                        cargarVeterinaria();
                    }else{
                        formulario_agregar_veterinaria.style.height = "0px";

                        document.getElementById("nombre_vet").value = "";
                        document.getElementById("direccion_vet").value = "";
                        document.getElementById("localidad_vet").value = "";
                        document.getElementById("puntuacion_vet").value = "";
                        document.getElementById("descripcion_vet").value = "";
                    }
                });
                div_editar_veterinaria.appendChild(boton_editar_veterinaria);
            })

            div.appendChild(nombre);
            div.appendChild(direccion);
            div.appendChild(localidad);
            div.appendChild(puntuacion);
            if(veterinarias_guardadas[i].descripcion !== ""){
                div.appendChild(descripcion);
            }
            div.appendChild(cargado_por);
            try{
                if(veterinarias_guardadas[i].usuario === usuario_logueado[0].username || usuario_logueado[0].admin === true){
                    div.appendChild(boton_borrar);
                    div.appendChild(boton_editar);
                }
            }catch(error){
            }
            div_veterinarias.appendChild(div);
        }
    }
}

verCerrarSesion(login, signup, cerrar_sesion, mostrar_usuario, cargar_vet, formulario_agregar_veterinaria);
mostrarVeterinarias();