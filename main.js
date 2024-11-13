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

//funcion que llama del localStorage las veterinarias guardadas y usa la funcion de crear el div para mostrarlas en la pagina.
function mostrarVeterinarias(){
    let div_veterinarias = document.getElementById("veterinarias");
    div_veterinarias.innerHTML = "";
    let veterinarias_guardadas = JSON.parse(localStorage.getItem(guardar_veterinarias));
    if(veterinarias_guardadas){
        crearDivVeterinaria(veterinarias_guardadas, div_veterinarias);
    }
}

//input que busca veterinarias a traves de sus datos, a medida que el usuario escribe se van filtrando las veterinarias y se van mostrando automaticamente.
let buscador = document.getElementById("buscador");
buscador.addEventListener("keyup", ()=>{
    let div_veterinarias = document.getElementById("veterinarias");
    div_veterinarias.innerHTML = "";

    let veterinarias = JSON.parse(localStorage.getItem(guardar_veterinarias));

    let palabra = document.getElementById("buscador").value.toLowerCase();

    let veterinarias_buscadas = veterinarias.filter(vet => 
        vet.nombre.toLowerCase().includes(palabra) ||
        vet.direccion.toLowerCase().includes(palabra) ||
        vet.localidad.toLowerCase().includes(palabra) ||
        vet.puntuacion.toLowerCase().includes(palabra) ||
        vet.descripcion.toLowerCase().includes(palabra) ||
        vet.usuario.toLowerCase().includes(palabra));
    crearDivVeterinaria(veterinarias_buscadas, div_veterinarias);
})

//Funcion muestra las veterinarias que esten adentro del arreglo que se le pase en un div.
//Tambien se le agrega el boton de eliminar y otro de editar la veterinaria (siempre y cuando sea el usuario que la creó o un admin)
//El boton de editar veterinaria lleva los datos de esa veterinaria al formulario de cargar veterinaria,
//por otra parte crea el boton de "editar" abajo del formulario de cargar veterinaria. Este boton toma los datos que se pusieron en el formulario,
//elimina la veterinaria a editar y crea una nueva con los datos que se le estan pasando.
function crearDivVeterinaria(arreglo, div_contenedor){
    for(let i = 0; i < arreglo.length; i++){
        let div = document.createElement("div");
        div.classList.add("contenedor_veterinarias");

        let nombre = document.createElement("h3");
        let direccion = document.createElement("p");
        let localidad = document.createElement("p");
        let puntuacion = document.createElement("p");
        let descripcion = document.createElement("p");
        let cargado_por = document.createElement("p");

        nombre.innerHTML = "Nombre: " + arreglo[i].nombre;
        direccion.innerHTML = "Dirección: " + arreglo[i].direccion;
        localidad.innerHTML = "Localidad: " + arreglo[i].localidad;
        puntuacion.innerHTML = "Puntuación: " + arreglo[i].puntuacion+" Estrellas";
        descripcion.innerHTML = "Reseña: " + arreglo[i].descripcion;
        cargado_por.innerHTML = "Recomendada por: " + arreglo[i].usuario;

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
            let confirmación = confirm(`Se esta por eliminar la veterinaria ${arreglo[i].nombre}, ¿desea proseguir?`);
            if(confirmación){
                arreglo = arreglo.filter(vete => vete.nombre !== arreglo[i].nombre);
                localStorage.setItem(guardar_veterinarias, JSON.stringify(arreglo));
                mostrarVeterinarias();
            }
        })

        let boton_editar = document.createElement("button");
        boton_editar.classList.add("boton_editar");
        boton_editar.innerHTML = "Editar veterinaria";
        boton_editar.addEventListener("click", ()=>{
            let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
            formulario_agregar_veterinaria.style.height = "200px";

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
                let confirmación = confirm("¿Desea aplicar los cambios ");

                if(confirmación){
                    arreglo = arreglo.filter(vete => vete.nombre !== arreglo[i].nombre);
                    localStorage.setItem(guardar_veterinarias, JSON.stringify(arreglo));
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
        if(arreglo[i].descripcion !== ""){
            div.appendChild(descripcion);
        }
        div.appendChild(cargado_por);
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

verCerrarSesion(login, signup, cerrar_sesion, mostrar_usuario, cargar_vet, formulario_agregar_veterinaria);
mostrarVeterinarias();