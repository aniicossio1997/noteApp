import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { IUser } from "../models/User.model";
import { FormikState } from "formik";
import { ILogin } from "../models/ILogin";


interface IProps {
  children: React.ReactNode;
}
type STATUS_SEND = "pedding" | "success" | "failed" | "none";
// export const AuthContext=createContext<ISessionContext>({
//   session: null,
//   isLoggedIn: false,
//   initialize: () => {},
//   destroy: () => {},
//   signInWithGoogle: async () => {
//     return { provider: null, url: null};
//   },
//   signout:() =>{}
// });
export const AuthContext = createContext(undefined);
export const AuthContextProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser>(undefined);
  const [isLoading, setIsLoading] = useState<STATUS_SEND>("none");

  const navigate = useNavigate();
  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) {
        setIsLoading('failed')
        throw new Error("A ocurrido un error durante la autenticación");
      }
      return data;
    } catch (error) {
      setIsLoading('failed')
      setUser(undefined);
    }
  }
 const signOut=async()=> {
    const { error } = await supabase.auth.signOut();
    console.log("here, signout")
    if (error){
      throw new Error("A ocurrido un error durante el cierre de sesión");
    }else{
      setUser(undefined)
      navigate('/auth/login')
    }
      
  }

  const signInEmailPassword = async (valueForm:ILogin, resetForm: (nextState?: Partial<FormikState<ILogin>> | undefined) => void) => {
    const {email,password}=valueForm;
    try {
      console.log(valueForm)
      const { data, error } = await  supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setUser(undefined);
        setIsLoading('failed');
        throw new Error("A ocurrido un error durante la autenticación");
      }
      
      setUser({email:data.user.email,id:data.user.id});
      resetForm()
      navigate('/auth')
      return data;
    } catch (error) {
      setUser(undefined);
      setIsLoading('failed')
      console.log(error);
    }
  };
  async function signInWithFacebook() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
      })
      if (error) {
        setUser(undefined);
        throw new Error("A ocurrido un error durante la autenticación");
      }
      return data;
    } catch (error) {
      setUser(undefined);
    }
  }
  
  const register=async(email:string,password:string)=>{
    try {
      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
        
        options: {
          data: {
            full_name: 'new user',
            confirmation_sent_at: Date.now(),
          },
   
        }
      })
      if(error){
        setIsLoading("failed")
      }
      return user;
    } catch (error) {
      setIsLoading("failed")
    }
  }
  

   useEffect(() => {
     const {data:authListener} =supabase.auth.onAuthStateChange(async(event,sesion)=>{
       //console.log("supabase event", event)
       console.log("supabase session: ",sesion)
       if(sesion!=null){
         
         setUser({email:sesion.user.email,id:sesion.user.id})
       }
       if(sesion===null){
        setUser(undefined)
       }
     })
     console.log(authListener)
   }, [])

  return (
    <>
      <AuthContext.Provider
        value={{ signInWithGoogle, signOut, signInEmailPassword, signInWithFacebook,user ,isLoading,register}}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const UserAuth = () => useContext(AuthContext);
