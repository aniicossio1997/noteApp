import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export const MenuAuthResponsive = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {pathname === "/auth/login" ? "login" : "register"}
        </MenuButton>
        <MenuList minWidth={"110px"} maxWidth={"110px"} >
          <MenuItem
          paddingX={"10px"}
            as={Link}
            to={"/auth/login"}
            bg={pathname === "/auth/login" ? "rgba(0,0,0,0.2)" : undefined}
          >
            Log in
          </MenuItem>
          <MenuItem
          paddingX={"10px"}
           as={Link}
           to={"/auth/register"}
            bg={pathname === "/auth/register" ? "rgba(0,0,0,0.2)" : undefined}
          >
            register
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
