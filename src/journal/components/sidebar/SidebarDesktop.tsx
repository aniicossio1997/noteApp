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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import {
  FiMenu,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { UserAuth } from "../../../context/AuthContext";

interface IPropsNavItem {
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
}: IPropsNavItem) => (
  <Flex
    mt={30}
    flexDir="column"
    w="100%"
    alignItems={navSize == "small" ? "center" : "flex-start"}
  >
    <Menu placement="right">
      <Link
        backgroundColor={active && "#AEC8CA"}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
        w={navSize == "large" && "100%"}
      >
        <MenuButton w="100%">
          <Flex>
            <Icon
              as={icon}
              fontSize="xl"
              color={active ? "#82AAAD" : "gray.500"}
            />
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
          <NavItem navSize={navSize} icon={FiCalendar} title="Inicio" active />
          <NavItem navSize={navSize} icon={FiUser} title="+add" />
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
          <Flex mt={4} align="center">
            <Avatar size="sm" src="avatar-1.jpg" />
            <Flex
              transition={"all 0.1s"}
              flexDir="column"
              ml={4}
              display={navSize == "small" ? "none" : "flex"}
              cursor={"pointer"}
              
            >
              <Heading as="h3" size="sm">
                Sylwia Weller
              </Heading>
              <Button color="gray" onClick={signOut}>Salir</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
