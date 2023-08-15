export interface ISessionData {
    accessToken: string;
    user: ModelUser;
  }
interface IUser{
  id:string,
  full_name:string,
  email:string,
  picture:string
}
export class ModelUser implements IUser{
  id: string;
  full_name: string;
  email: string;
  picture: string;
  constructor(id:string,full_name:string,email:string,picture:string){
    this.id=id;
    this.full_name=full_name;
    this.email=email;
    this.picture= picture ? picture : ''
  }


}
