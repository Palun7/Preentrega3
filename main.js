//boton que muestra el formulario para cargar una veterinaria una vez logueado y tambien crea el boton de guardar veterinaria.
let cargar_vet = document.getElementById("cargar_vet");
cargar_vet.addEventListener("click", ()=>{
    let formulario_agregar_veterinaria = document.getElementById("formulario_agregar_veterinaria");
    if(formulario_agregar_veterinaria.classList.contains("altura-dos")){
        formulario_agregar_veterinaria.classList.remove("altura-dos");
    }else {
        formulario_agregar_veterinaria.classList.add("altura-dos");
    }

    let errores_veterinaria = document.getElementById("mostrar_errores_veterinaria");
    errores_veterinaria.innerHTML = "";

    let boton_cargar_veterinaria = document.createElement("button");
    boton_cargar_veterinaria.classList.add("boton_editar");
    boton_cargar_veterinaria.innerHTML = "Guardar";
    boton_cargar_veterinaria.addEventListener("click", ()=>{
        cargarVeterinaria(guardar_veterinarias, guardarSesion);
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

//input que busca veterinarias a traves de sus datos, a medida que el usuario escribe se van filtrando las veterinarias y se van mostrando automaticamente.
let buscador = document.getElementById("buscador");
buscador.addEventListener("keyup", ()=>{
    let div_veterinarias = document.getElementById("veterinarias");
    div_veterinarias.innerHTML = "";

    let veterinarias = JSON.parse(localStorage.getItem(guardar_veterinarias));

    let busqueda_exacta = document.getElementById("busqueda_exacta").checked;

    let veterinarias_buscadas;

    let palabra = document.getElementById("buscador").value;

    if(busqueda_exacta){

        veterinarias_buscadas = veterinarias.filter(vet => 
            vet.nombre.includes(palabra) ||
            vet.direccion.includes(palabra) ||
            vet.localidad.includes(palabra) ||
            vet.puntuacion.includes(palabra) ||
            vet.descripcion.includes(palabra) ||
            vet.usuario.includes(palabra));
    }else {
        palabra = palabra.toLowerCase();

        veterinarias_buscadas = veterinarias.filter(vet => 
            vet.nombre.toLowerCase().includes(palabra) ||
            vet.direccion.toLowerCase().includes(palabra) ||
            vet.localidad.toLowerCase().includes(palabra) ||
            vet.puntuacion.toLowerCase().includes(palabra) ||
            vet.descripcion.toLowerCase().includes(palabra) ||
            vet.usuario.toLowerCase().includes(palabra));
    }
    crearDivVeterinaria(veterinarias_buscadas, div_veterinarias);
})



setearPagina(login, signup, cerrar_sesion, mostrar_usuario, cargar_vet, formulario_agregar_veterinaria);
mostrarVeterinarias();