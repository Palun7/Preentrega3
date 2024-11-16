

//input que busca veterinarias a traves de sus datos, a medida que el usuario escribe se van filtrando las veterinarias y se van mostrando automaticamente.
let buscador = document.getElementById("buscador");
buscador.addEventListener("keyup", ()=>{
    let div_veterinarias = document.getElementById("veterinarias");
    div_veterinarias.innerHTML = "";

    let veterinarias = JSON.parse(localStorage.getItem(guardar_veterinarias));

    let busqueda_exacta = document.getElementById("busqueda_exacta").checked;

    let veterinarias_buscadas
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



verCerrarSesion(login, signup, cerrar_sesion, mostrar_usuario, cargar_vet, formulario_agregar_veterinaria);
mostrarVeterinarias();