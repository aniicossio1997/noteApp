import { Routes, Route, Navigate } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import { ReactElement, Suspense } from "react";
import { UserAuth } from "../context/AuthContext";
import routes, { BRoutes } from "./routes";


export const AppRouter = () => {
  return (
    <Routes>

      {routes.map((route) => {
            const key = `${route.type}-${route.path}`;
            return (
              <Route
                path={`${route.path}${route.hasSubroutes ? '/*' : ''}`}
                key={key}
                element={
                  <RouteProtection type={route.type}  element={<Suspense fallback={<Fallback />}>{<route.element/>}</Suspense>} />
                }
              />
            );
          })}
      
    </Routes>
  );
};

const Fallback = () => (
  <Flex grow={1} align='center' justify={'center'} alignSelf='stretch'>
    <Spinner mt={5} size='xl' color='primary.400' boxSize={['50px', 100]} />
  </Flex>
);
function RouteProtection({ type, element }: { type: string; element: ReactElement; }) {
  const { user } = UserAuth();
  console.log("user sesion?",user)
  if (type == 'private' && !user) return <Navigate to={BRoutes.LOGIN} replace />;
  if (type == 'guest' && user) return <Navigate to={BRoutes.HOME_NOTE} replace />;

  return <>{element}</>;
}