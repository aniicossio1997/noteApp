import { createContext, useContext, useState } from "react";
import { typeNavSize } from "../models/Types";
import { IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

interface IEstadoNote {
  navSize: typeNavSize;
  changeNavSize: () => void;
  btnMenuSidebar: () => JSX.Element;
}
const initialState: IEstadoNote = {
  changeNavSize: () => {},
  navSize: "large",
  btnMenuSidebar: () => <button>Mi botón JSX</button>,
};
const NoteContext = createContext(initialState);

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [navSize, setNavSize] = useState<typeNavSize>("large");
  const changeNavSize = () => {
    if (navSize == "large") {
      setNavSize("small");
    } else {
      setNavSize("large");
    }
  };
  const btnMenuSidebar = () => {
    return (
      <IconButton
        zIndex={10}
        cursor={"pointer"}
        transition={"all 0.4ms"}
        aria-label="btn"
        _hover={{ background: "rgb(255 255 255 / 70%)" }}
        icon={<FiMenu />}
        height={"40px"}
        position={"absolute"}
        left={"10px"}
        top={"8px"}
        color="white"
        backgroundColor={"whiteAlpha.300"}
        variant={"outline"}
        onClick={changeNavSize}
      />
    );
  };
  return (
    <NoteContext.Provider value={{ navSize, changeNavSize, btnMenuSidebar }}>
      {children}
    </NoteContext.Provider>
  );
};
