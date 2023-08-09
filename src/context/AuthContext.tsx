import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Provider } from "@supabase/supabase-js";
import { IUser } from "../models/User.model";

type SignInWithGoogleResult = Promise<
  | {
      provider: Provider;
      url: string;
    }
  | {
      provider: Provider;
      url: null;
    }
>;
type SignInEmailPasswordResult =
  | {
      user: any;
      session: any;
    }
  | {
      user: null;
      session: null;
    };
interface IProps {
  children: React.ReactNode;
}

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
        setUser(undefined);
        throw new Error("A ocurrido un error durante la autenticación");
      }
      return data;
    } catch (error) {
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

  const signInEmailPassword = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setUser(undefined);
        throw new Error("A ocurrido un error durante la autenticación");
      }
      console.log(data);
      setUser({email:data.user.email,id:data.user.id});
      return data;
    } catch (error) {
      setUser(undefined);
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
        value={{ signInWithGoogle, signOut, signInEmailPassword, signInWithFacebook,user }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const UserAuth = () => useContext(AuthContext);
