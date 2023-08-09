import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import { TranslateProvider } from "./context/TranslateContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <I18nextProvider i18n={i18n}>
          <TranslateProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </TranslateProvider>
        </I18nextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
