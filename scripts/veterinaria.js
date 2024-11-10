class Veterinaria {
    constructor(nombre, direccion, localidad, puntuacion, descripcion, usuario){
        this.nombre = nombre;
        this.direccion = direccion;
        this.localidad = localidad;
        this.puntuacion = puntuacion;
        this.descripcion = descripcion;
        this.usuario = usuario;
    }

    static veterinaria(objeto){
        return new Veterinaria(objeto.nombre, objeto.direccion, objeto.localidad, objeto.puntuacion, objeto.descripcion, objeto.usuario);
    }
}

const guardar_veterinarias = "veterinarias";
let verificar = JSON.parse(localStorage.getItem(guardar_veterinarias));

if(!verificar){
    const veterinarias = new Array();
    localStorage.setItem(guardar_veterinarias, JSON.stringify(veterinarias));
}
