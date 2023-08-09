import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useTranslate = () => {
  const { i18n } = useTranslation();

  const [translate, setTranslate] = useState<"en" | "es">(localStorage.getItem("localI18n") as "es" | "en"|| "en");
  const handleChanged = (value: "en"|"es") => {
    localStorage.getItem("localI18n");
    i18next.changeLanguage(value.toString());
    localStorage.setItem("localI18n", value.toString());
    setTranslate(value)
  };
  useEffect(() => {
    const data = localStorage.getItem("localI18n") as "es" | "en"|| "en";
    i18n.changeLanguage(data);
  }, [i18n]);
  return { handleChanged, translate };
};

export default useTranslate;