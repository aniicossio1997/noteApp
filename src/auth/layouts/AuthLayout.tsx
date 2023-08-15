import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,

  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { TranslatorMenuDesktop } from "../../components/translatorMenu/TranslatorMenuDesktop";
import './authLayout.css'
import { MenuAuthResponsive } from "../components/MenuAuthResponsive";
import { useTranslation } from "react-i18next";
interface IProps {
  title: string;
  children: React.ReactNode;
}
export const AuthLayout = ({ title = "", children }: IProps) => {
  const { pathname } = useLocation();
  const [isLargerThan] = useMediaQuery('(min-width: 570px)')
  const { t } = useTranslation("form");

  return (
    <>
      <Flex 
      boxSizing="border-box"
      alignItems="center" gap="2" p={"5px"}>
        <Box p="2">
          <Heading size="md">NoteApp</Heading>
        </Box>
        <Spacer />
        <TranslatorMenuDesktop/>
        {
          isLargerThan ? 
          <ButtonGroup gap="2">
          <Button
            as={Link}
            to={"/auth/login"}
            colorScheme={pathname === "/auth/login" ? "pink" : "gray"}
          >
            {t("form:login")}
          </Button>
          <Button
            as={Link}
            to={"/auth/register"}
            colorScheme={pathname === "/auth/register" ? "pink" : "gray"}
          >
             {t("form:register")}
          </Button>
        </ButtonGroup>
        : <MenuAuthResponsive/>
        }



      </Flex>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignContent={"center"}
        justifyItems={"center"}
        alignItems={"center"}
        h={"80%"}
        
      >
        <Box borderWidth={1} p={4} borderRadius={5} className="form"
        bg={"rgba(0,0,0,0.1)"}
        >
          <Heading as="h4" size="md" marginBottom={4} textAlign={"center"}>
            {title}
          </Heading>
          {children}
        </Box>
      </Flex>
    </>
  );
};
