class Usuario {
    constructor(username, pass, nombre, apellido, edad){
        this.username = username;
        this.pass = pass;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.foto = null;
    }

    static usuario(objeto){
        return new Usuario(objeto.username, objeto.pass, objeto.nombre, objeto.apellido, objeto.edad, objeto.foto);
    }

    getDatos(){
        return `Nombre: ${this.nombre}, ${this.apellido}. Edad: ${this.edad}.`;
    }

    generarFoto(foto){
        if(foto){
            this.foto = foto;
        }else{
            return "No se pudo cargar la foto";
        }
    }

    getFoto(){
        if(this.foto){
            return this.foto;
        }else{
            return false;
        }
    }
}

const guardarDatos = "usuarios";
let datos_en_local = JSON.parse(localStorage.getItem(guardarDatos));

if(datos_en_local === null){
    const usuarios = new Array();
    let palun = new Usuario("Palun", "123456", "Pablo", "Martinez", "34");
    let anita = new Usuario("Anita", "123456", "Ana", "Murua", "32");
    usuarios.push(palun, anita);
    localStorage.setItem(guardarDatos, JSON.stringify(usuarios));
}