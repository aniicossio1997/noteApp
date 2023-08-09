export class User{
    constructor(public email:string,public id:string){
        this.email=email && '',
        this.id=id
    }
}
export interface IUser{
    email:string,
    id:string
}