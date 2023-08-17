import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { FormikState } from "formik";
import { ILogin } from "../models/ILogin";
import { ModelUser } from "../models/ISessionData";

const checkUserAuth = () => {
  const isAuth = JSON.parse(
    localStorage.getItem("sb-gwcjqlluqipifluoetxx-auth-token")
  );
  let userAux = new ModelUser("", "", "", "");
  if (isAuth) {
    supabase.auth.onAuthStateChange(async (event, sesion) => {
      userAux = new ModelUser(
        sesion.user.id,
        sesion.user.user_metadata.full_name,
        sesion.user.email,
        sesion.user.user_metadata.picture
      );
    });
  } else {
    userAux = undefined;
  }

  return userAux;
};

interface IProps {
  children: React.ReactNode;
}
type STATUS_SEND = "pedding" | "success" | "failed" | "none";

interface IAuthContext {
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInEmailPassword: (
    valueForm: ILogin,
    resetForm: (nextState?: Partial<FormikState<ILogin>> | undefined) => void
  ) => Promise<void>;
  user: ModelUser | undefined;
  isLoading: STATUS_SEND;
  register: (email: string, password: string) => Promise<void>;
  resetIsLoading: () => void;
}
const initAuthContext: IAuthContext = {
  signInWithGoogle: async () => {},
  signOut: async () => {},
  signInEmailPassword: async (valueForm, resetForm) => {},
  user: undefined,
  isLoading: "none",
  register: async (email:string, password:string) => {},
  resetIsLoading: () => {},
};
export const AuthContext = createContext(initAuthContext);

export const AuthContextProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<ModelUser>(checkUserAuth);
  const [isLoading, setIsLoading] = useState<STATUS_SEND>("none");

  const navigate = useNavigate();

  const resetIsLoading = () => {
    setIsLoading("none");
  };
  async function signInWithGoogle() {
    try {
      const {data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) {
        setIsLoading("failed");
        throw new Error("A ocurrido un error durante la autenticación");
      }
      return data;
    } catch (error) {
      setIsLoading("failed");
      setUser(undefined);
    }
  }
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("here, signout");
    if (error) {
      throw new Error("A ocurrido un error durante el cierre de sesión");
    } else {
      setUser(undefined);
      navigate("/auth/login");
    }
  };

  const signInEmailPassword = async (
    valueForm: ILogin,
    resetForm: (nextState?: Partial<FormikState<ILogin>> | undefined) => void
  ) => {
    const { email, password } = valueForm;
    try {
      console.log(valueForm);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setUser(undefined);
        setIsLoading("failed");
        throw new Error("A ocurrido un error durante la autenticación");
      }

      //setUser({email:data.user.email,id:data.user.id});
      resetForm();
      navigate("/note");
      //return data;
    } catch (error) {
      setUser(undefined);
      setIsLoading("failed");
      console.log(error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,

        options: {
          data: {
            full_name: "new user",
            confirmation_sent_at: Date.now(),
          },
        },
      });
      if (error) {
        setIsLoading("failed");
        throw new Error("A ocurrido un error durante la autenticación");
      }
      // return user;
    } catch (error) {
      setIsLoading("failed");
    }
  };

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userLogin = new ModelUser(
            session.user.id,
            session.user.user_metadata.full_name,
            session.user.email,
            session.user.user_metadata.picture
          );
          setUser(userLogin);
        } else {
          setUser(undefined);
        }
      }
    );
    return () => {
      authListener.data.subscription;
    };
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{
          signInWithGoogle,
          signOut,
          signInEmailPassword,

          user,
          isLoading,
          register,
          resetIsLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const UserAuth = () => useContext(AuthContext);
