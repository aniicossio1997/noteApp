import { AppRouter } from "./router/AppRouter";
import img from './assets/f1.avif'
export const App = () => {
  {localStorage.setItem('chakra-ui-color-mode', 'dark')}

  return (
    <>
<div className="bg-image"></div>
    <div className="content" >
       <AppRouter />
    </div>
     
    </>
  );
};
