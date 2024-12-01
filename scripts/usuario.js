class Usuario {
    constructor(username, pass, nombre, apellido, edad, admin){
        this.username = username;
        this.pass = pass;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        if(admin){
            this.admin = admin;
        }else{
            this.admin = false;
        }
    }

    static usuario(objeto){
        return new Usuario(objeto.username, objeto.pass, objeto.nombre, objeto.apellido, objeto.edad, objeto.admin);
    }

    getDatos(){
        return `Nombre: ${this.nombre}, ${this.apellido}. Edad: ${this.edad}.`;
    }

    setAdmin(){
        if(this.admin){
            return this.admin = false;
        }else{
            return this.admin = true;
        }
    }
}

const guardarDatos = "usuarios";
let datos_en_local = JSON.parse(localStorage.getItem(guardarDatos)) || [];

if(datos_en_local.length == 0){
    let palun = new Usuario("Palun", "123456", "Pablo", "Martinez", "34", true);
    let anita = new Usuario("Anita", "123456", "Ana", "Murua", "32");
    datos_en_local.push(palun, anita);
    localStorage.setItem(guardarDatos, JSON.stringify(datos_en_local));
}