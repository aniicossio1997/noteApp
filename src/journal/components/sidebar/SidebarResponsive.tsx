import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Spacer,
  
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { NavItem } from "./SidebarDesktop";
import {
    
    FiCalendar,
    FiUser,
    FiBriefcase,
    FiSettings,
    FiMenu,
  } from "react-icons/fi";
import {BsBoxArrowInRight} from "react-icons/bs"
export const SidebarResponsive = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2" paddingX={"5px"}>
        <Box p="2">
          <Heading size="md">Chakra App</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <IconButton aria-label="menu"  icon={<FiMenu />} ref={btnRef} variant={"ghost"} onClick={onOpen} />
        </ButtonGroup>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Account</DrawerHeader>
          <DrawerBody>
          <NavItem navSize={"large"} icon={FiCalendar} title="Inicio" active />
          <NavItem navSize={"large"} icon={FiUser} title="+add" />
          <NavItem navSize={"large"} icon={FiBriefcase} title="Listado" />
          <NavItem navSize={"large"} icon={FiSettings} title="Settings" />
          </DrawerBody>
          <DrawerFooter borderTopWidth='1px' justifyContent={"left"}>
          <Button leftIcon={<BsBoxArrowInRight />} colorScheme='telegram' variant='solid'>
    Salir
  </Button>
          </DrawerFooter>
        </DrawerContent>

      </Drawer>
    </>
  );
};
