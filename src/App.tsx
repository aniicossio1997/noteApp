import { AppRouter } from "./router/AppRouter";

export const App = () => {
  {localStorage.setItem('chakra-ui-color-mode', 'dark')}

  return (
    <>
      <AppRouter />
    </>
  );
};
