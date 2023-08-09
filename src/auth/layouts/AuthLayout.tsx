import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,

  Spacer,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { TranslatorMenuDesktop } from "../../components/translatorMenu/TranslatorMenuDesktop";

interface IProps {
  title: string;
  children: React.ReactNode;
}
export const AuthLayout = ({ title = "", children }: IProps) => {
  const { pathname } = useLocation();
  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2" p={"5px"}>
        <Box p="2">
          <Heading size="md">Chakra App</Heading>
        </Box>
        <Spacer />
        <TranslatorMenuDesktop/>
        <ButtonGroup gap="2">
          <Button
            as={Link}
            to={"/auth/login"}
            colorScheme={pathname === "/auth/login" ? "pink" : "gray"}
          >
            Log in
          </Button>
          <Button
            as={Link}
            to={"/auth/register"}
            colorScheme={pathname === "/auth/register" ? "pink" : "gray"}
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignContent={"center"}
        justifyItems={"center"}
        alignItems={"center"}
        h={"80%"}
      >
        <Box borderWidth={1} p={4} borderRadius={5}>
          <Heading as="h4" size="md" marginBottom={4} textAlign={"center"}>
            {title}
          </Heading>{" "}
          {children}
        </Box>
      </Flex>
    </>
  );
};
