import {
  Flex,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  Icon,
  Link,
  Text,
  Button,
  LinkProps,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FiMenu } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import { UserAuth } from "../../../context/AuthContext";
import { BsBoxArrowRight } from "react-icons/bs";
import {Link as LinkRouter, useLocation} from "react-router-dom"
import { AddIcon } from "@chakra-ui/icons";

import "./sidebar.css";
interface IPropsNavItem extends LinkProps {
  icon: IconType;
  title: string;
  active?: boolean;
  navSize: string;
  to:string
}
export const NavItem = ({
  icon,
  title,
  active = false,
  navSize,
  to,
  ...rest
}: IPropsNavItem) => (
  <Flex
    mt={"5px"}
    flexDir="column"
    w="100%"
    alignItems={navSize == "small" ? "center" : "flex-start"}
  >
    <Menu placement="right">
      <Link
        backgroundColor={active && "rgb(135 131 131 / 40%)"}
        p={3}
        borderRadius={8}
        _hover={{
          textDecor: "none",
          backgroundColor: "rgb(135 131 131 / 40%)",
        }}
        w={navSize == "large" && "100%"}
        {...rest}
        as={LinkRouter}
        to={to}
      >
        <MenuButton w="100%">
          <Flex>
            <Icon as={icon} fontSize="xl" />
            <Text ml={4} display={navSize == "small" ? "none" : "flex"} textTransform={"capitalize"}>
              {title}
            </Text>
          </Flex>
        </MenuButton>
      </Link>
    </Menu>
  </Flex>
);

interface IPropsSidebar{
  navSize:string,
  changeNavSize:(x:string)=>void
}

export const SidebarDesktop = ({navSize,changeNavSize}:IPropsSidebar) => {
  const { signOut, user } = UserAuth();
  const { pathname } = useLocation();
  const [idNote, setIdNote] = useState<string>('')
  

  
  useEffect(() => {
    const  extractIdURL=(): string =>  {
      const parts = pathname.split('/note/');      
      if (parts.length === 2) {
        return parts[1];
      }
      return null;
    }
    setIdNote(extractIdURL())

  }, [pathname])
  return (
    <>

      <Flex
        pos="sticky"
        left="0"
        h="100%"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.4)"
        boxSizing={"border-box"}
        w={navSize == "small" ? "75px" : "260px"}
        flexDir="column"
        justifyContent="space-between"
        transition={"all 0.1s"}
        backgroundColor={"#161b25"}
        className="flex-1"
      >
        <Flex
          transition={"all 0.1s"}
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          as="nav"
        >
          <Flex
            width={"100%"}
            flexDirection={"row"}
            gap={"0.5rem"}
            my={"10px"}
            mb={"15px"}
          >
            <Button
              colorScheme="gray"
              variant="outline"
              leftIcon={<AddIcon boxSize={3} />}
              width={"100%"}
              justifyContent={"left"}
            >
              New note
            </Button>

            <IconButton
              transition={"all 0.4ms"}
              aria-label="btn"
              _hover={{ background: "rgb(135 131 131 / 40%)" }}
              icon={<FiMenu />}
              onClick={() => {
                if (navSize == "small") changeNavSize("large");
                else changeNavSize("small");
              }}
              height={"40px"}
            />
          </Flex>

          <Flex
            overflowY={"auto"}
            flexDir="column"
            width={"100%"}
            height={"calc(100vh - 244px)"}
            paddingRight={"8px"}
className="scrollbar"
          >

            {Array.from({ length: 3 }).map((_, index) => (
              <NavItem
                to={`/note/${index+1}`}
                key={index}
                navSize={navSize}
                icon={AiOutlineFileText}
                title={`note ${index +1}`}
                active={(index +1).toString()==idNote}
              />
            ))}
          </Flex>
        </Flex>

        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          mb={4}
          transition={"all 0.1s"}
          marginBottom={"calc(100vh - 244px)"}
        >
          <Divider display={navSize == "small" ? "none" : "flex"} />
          <Flex mt={4} flexDirection={"column"}>
            <Flex
              transition={"all 0.1s"}
              flexDir="revert"
              justifyContent={"flex-end"}
              alignItems={"center"}
              gap={"10px"}
              ml={4}
              display={navSize == "small" ? "none" : "flex"}
              marginLeft={"-1px"}
            >
              <Avatar bg="teal.500" />
              <Heading as="h3" size="sm" className="text-break">
                {user.email}
              </Heading>
            </Flex>
            {navSize == "small" ? (
              <IconButton
                aria-label="exit"
                size="lg"
                colorScheme="red"
                onClick={signOut}
                icon={<Icon as={BsBoxArrowRight} />}
              />
            ) : (
              <Button
                size="md"
                width={"80px"}
                paddingX={"0"}
                mt={"10px"}
                colorScheme="red"
                onClick={signOut}
                leftIcon={<Icon as={BsBoxArrowRight} />}
              >
                Salir
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
