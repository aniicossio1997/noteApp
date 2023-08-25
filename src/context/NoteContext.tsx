import { createContext, useContext, useState } from "react";
import { typeNavSize } from "../models/Types";


interface IEstadoNote {
  navSize: typeNavSize;
  changeNavSize: () => void;
  isDirtyForm:boolean;
  resetIsDirtyForm:()=>void;
  setIsDirtyForm:(value:boolean)=>void,
  changeToTrueDirtyForm:()=>void
}
const initialState: IEstadoNote = {
  changeNavSize: () => {},
  navSize: "large",
  isDirtyForm:false,
  resetIsDirtyForm:()=>{},
  setIsDirtyForm:()=>{},
  changeToTrueDirtyForm:()=>{}
};
const NoteContext = createContext(initialState);



export const NoteProvider = ({ children }) => {
  const [navSize, setNavSize] = useState<typeNavSize>("large");
  const [isDirtyForm, setIsDirtyForm] = useState(false); // Estado para rastrear si el formulario está dirty
  const changeNavSize = () => {
   
    if (navSize == "small") setNavSize("large");
    else setNavSize("small");
  };
  const resetIsDirtyForm=()=> setIsDirtyForm(false);
  const changeToTrueDirtyForm=()=> setIsDirtyForm(true)
  return (
    <NoteContext.Provider value={{ navSize, changeNavSize, isDirtyForm,resetIsDirtyForm ,setIsDirtyForm,changeToTrueDirtyForm}}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);