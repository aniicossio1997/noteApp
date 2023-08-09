import * as Yup from "yup";

export interface IValueForm {
  email: string;
  confirmEmail: string;
  password:string;
  confirmPassword:string
}
export const initialValueForm: IValueForm = {
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
};