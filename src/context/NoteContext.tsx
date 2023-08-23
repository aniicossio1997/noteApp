import { createContext, useContext, useState } from "react";
import { typeNavSize } from "../models/Types";


interface IEstadoNote {
  navSize: typeNavSize;
  changeNavSize: () => void;
  
}
const initialState: IEstadoNote = {
  changeNavSize: () => {},
  navSize: "large",

};
const NoteContext = createContext(initialState);



export const NoteProvider = ({ children }) => {
  const [navSize, setNavSize] = useState<typeNavSize>("large");
  const changeNavSize = () => {
   
    if (navSize == "small") setNavSize("large");
    else setNavSize("small");
  };

  return (
    <NoteContext.Provider value={{ navSize, changeNavSize,  }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);