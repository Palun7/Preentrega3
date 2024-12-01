const DateTime = luxon.DateTime;
const now = DateTime.now();


class Veterinaria {
    constructor(nombre, direccion, localidad, puntuacion, descripcion, usuario){
        this.nombre = nombre;
        this.direccion = direccion;
        this.localidad = localidad;
        this.puntuacion = puntuacion;
        this.descripcion = descripcion;
        this.usuario = usuario;
        this.fecha = null;
        this.actualizacion = null;
    }

    static veterinaria(objeto){
        return new Veterinaria(objeto.nombre, objeto.direccion, objeto.localidad, objeto.puntuacion, objeto.descripcion, objeto.usuario);
    }

    cargarFecha(){
        return this.fecha = now.toLocaleString(DateTime.FULL_DATE);
    }

    editarVet(){
        return this.actualizacion = now.toLocaleString(DateTime.FULL_DATE);
    }
}

const guardar_veterinarias = "veterinarias";
let verificar = JSON.parse(localStorage.getItem(guardar_veterinarias)) || [];

if(verificar.lenght === 0){
    localStorage.setItem(guardar_veterinarias, JSON.stringify(verificar));
}
