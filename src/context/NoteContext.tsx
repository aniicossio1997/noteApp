import { createContext, useContext, useState } from "react";
import { typeNavSize } from "../models/Types";
import { INoteFull } from "../models/INote";


export type TypeStatus="success" | "info" | "warning" | "error" | "loading";
interface IAlertContent{
  title:string,
  body:string,
  status:TypeStatus
}
const defaultAlertContent:IAlertContent={
  title:'titulo default',
  body:'',
  status:'success'
}
interface INotedIdSelected{
  note:INoteFull,
  changeNoteIdSelected:(note:INoteFull)=>void
}
interface IEstadoNote {
  navSize: typeNavSize;
  changeNavSize: () => void;
  isDirtyForm:boolean;
  resetIsDirtyForm:()=>void;
  setIsDirtyForm:(value:boolean)=>void,
  changeToTrueDirtyForm:()=>void,
  alertObject:{
    isOpenAlert:boolean,
    showAlert:()=>void,
    hideAlert:()=> void,
    alertContent:IAlertContent,
    initializeAlertContent:(data:IAlertContent)=>void,
  },
  noteSelected:INotedIdSelected
  
}
const initialState: IEstadoNote = {
  changeNavSize: () => {},
  navSize: "large",
  isDirtyForm:false,
  resetIsDirtyForm:()=>{},
  setIsDirtyForm:()=>{},
  changeToTrueDirtyForm:()=>{},
  alertObject:{
    isOpenAlert:false,
    showAlert:()=>{},
    hideAlert:()=>{},
    alertContent:defaultAlertContent,
    initializeAlertContent:(defaultAlertContent:IAlertContent)=>{defaultAlertContent},
  },
  noteSelected:{
    changeNoteIdSelected:(note:INoteFull)=>{note},
    note:undefined
  }
 
};
const NoteContext = createContext(initialState);



export const NoteProvider = ({ children }) => {
  const [navSize, setNavSize] = useState<typeNavSize>("large");
  const [isDirtyForm, setIsDirtyForm] = useState(false); // Estado para rastrear si el formulario está dirty
  const [isOpenAlert, setOpenAlert] = useState(false);
  const [alertContent,setAlertContent]=useState<IAlertContent>(defaultAlertContent)
  const [note,setNote]=useState<INoteFull>(undefined)

  const changeNavSize = () => {
    if (navSize == "small") setNavSize("large");
    else setNavSize("small");
  };
  const resetIsDirtyForm=()=> setIsDirtyForm(false);
  const changeToTrueDirtyForm=()=> setIsDirtyForm(true)

  const showAlert=()=> setOpenAlert(true);
  const hideAlert=()=> setOpenAlert(false);
  const initializeAlertContent = (propsAlert: IAlertContent) => setAlertContent(propsAlert);

  const changeNoteIdSelected=(note:INoteFull)=>setNote(note)


  return (
    <NoteContext.Provider value={{ navSize, changeNavSize, isDirtyForm,resetIsDirtyForm ,setIsDirtyForm,changeToTrueDirtyForm,
    alertObject:{isOpenAlert,showAlert,hideAlert,alertContent,initializeAlertContent},
    noteSelected:{changeNoteIdSelected,note}

    }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);