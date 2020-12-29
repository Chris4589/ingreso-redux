

export class Usuario {

    static fromFB({ email, nombre, uid }){
        return new Usuario(uid, nombre, email);
    }
    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){}

}
