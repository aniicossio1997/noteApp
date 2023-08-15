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
  FlexProps,
} from "@chakra-ui/react";
import  { useState } from "react";
import { IconType } from "react-icons";
import { FiMenu,  FiBriefcase, FiSettings } from "react-icons/fi";
import { AiOutlineFileText } from "react-icons/ai";
import { UserAuth } from "../../../context/AuthContext";
import { BsBoxArrowRight } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";


interface IPropsNavItem  extends FlexProps{
  icon: IconType;
  title: string;
  active?: boolean;
  navSize: string;
}
export const NavItem = ({
  icon,
  title,
  active = false,
  navSize,
  ...rest
}: IPropsNavItem) => (
  <Flex
    mt={30}
    flexDir="column"
    w="100%"
    alignItems={navSize == "small" ? "center" : "flex-start"}
    {...rest}
  >
    <Menu placement="right" >
      <Link
        backgroundColor={active && "rgba(255,255,255,.4)"}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: "none", backgroundColor: "rgba(255,255,255,0.4)" }}
        w={navSize == "large" && "100%"}
      >
        <MenuButton w="100%">
          <Flex>
            <Icon as={icon} fontSize="xl" />
            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
              {title}
            </Text>
          </Flex>
        </MenuButton>
      </Link>
    </Menu>
  </Flex>
);

export const SidebarDesktop = () => {
  const { signOut } = UserAuth();

  const [navSize, changeNavSize] = useState<string>("large");
  return (
    <>
      <Flex
        pos="sticky"
        left="0"
        h="99vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        boxSizing={"border-box"}
        w={navSize == "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
        transition={"all 0.1s"}
      >
        <Flex
          transition={"all 0.1s"}
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          as="nav"
        >
          <IconButton
            transition={"all 0.4ms"}
            aria-label="btn"
            background="none"
            mt={5}
            _hover={{ background: "none" }}
            icon={<FiMenu />}
            onClick={() => {
              if (navSize == "small") changeNavSize("large");
              else changeNavSize("small");
            }}
          />
          <NavItem navSize={navSize} icon={IoIosAdd} title="New Note" borderWidth={1}
    borderRadius={10} />
          <NavItem
            navSize={navSize}
            icon={AiOutlineFileText}
            title="Inicio"
            active
          />
          <NavItem navSize={navSize} icon={FiBriefcase} title="Listado" />
          <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
        </Flex>

        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          mb={4}
          transition={"all 0.1s"}
        >
          <Divider display={navSize == "small" ? "none" : "flex"} />
          <Flex mt={4} flexDirection={"column"}>
            <Flex
              transition={"all 0.1s"}
              flexDir="column"
              ml={4}
              display={navSize == "small" ? "none" : "flex"}
              cursor={"pointer"}
            >
              <Avatar bg="teal.500" />
              <Heading as="h3" size="sm">
                Sylwia Weller
              </Heading>
            </Flex>
            {navSize == "small" ? (
              <IconButton
           
                aria-label="exit"
                size="lg"
                backgroundColor="red.400"
                onClick={signOut}
                icon={<Icon as={BsBoxArrowRight} />}
              />
            ) : (
              <Button
                size="md"
                width={"80px"}
                paddingX={"0"}
                mt={"10px"}
                backgroundColor="red.400"
                onClick={signOut}
                leftIcon={<Icon as={BsBoxArrowRight} />}
              >Salir</Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
