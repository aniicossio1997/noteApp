import { createContext, useContext } from "react";
import useTranslate from "../hook/useTranslate";

const TranslateContext = createContext(undefined);

export const useTranslateContext = () => useContext(TranslateContext);

export const TranslateProvider = ({ children }) => {
  const {handleChanged,translate}=useTranslate()

  const contextValue = {
    handleChanged,
    translate,
  };

  return (
    <TranslateContext.Provider value={contextValue}>
      {children}
    </TranslateContext.Provider>
  );
};
