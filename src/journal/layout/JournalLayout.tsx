import {
  Box, Flex,  IconButton,  useMediaQuery
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SidebarDesktop } from "../components/sidebar/SidebarDesktop";
import { SidebarResponsive } from "../components/sidebar/SidebarResponsive";
import { FiMenu } from "react-icons/fi";

interface IProps {
  children: React.ReactNode;
}

export const JournalLayout = ({ children }: IProps) => {
  const [isLargerThan] = useMediaQuery("(min-width: 600px)");
  const [navSize, setNavSize] = useState<string>("large");
  const changeNavSize =(size:string)=>{
setNavSize(size)
  }
  return (
    <>
      <Flex flexDirection={isLargerThan ? "row" : "column"} position={"relative"} >
        <Box>
        {isLargerThan ? (
          <>
          {
            navSize=='large' ? <SidebarDesktop navSize={navSize} changeNavSize={changeNavSize} /> : 
            <IconButton
            transition={"all 0.4ms"}
            aria-label="btn"
            _hover={{ background: "rgb(255 255 255 / 70%)" }}
            icon={<FiMenu />}
            height={"40px"}
            position={"absolute"}
            left={"10px"}
            top={"8px"}
            color="white"
            backgroundColor={"whiteAlpha.300"}
            variant={"outline"}
            onClick={() => {
                if (navSize == "small") changeNavSize("large");
                else changeNavSize("small");
              }}
          />
          }
            

          </>
        ) : (
          <>
          <SidebarResponsive/>
          </>
        )}
        </Box>
        {children}
        {/* <Container  flex="1" borderWidth={1} 
        flexGrow={isLargerThan ? undefined : "1"} 
        minW={{base:'90%',"md":'2xl',"xl":'container.sm'}}
        maxW={{base:'90%',"md":'2xl',"xl":'container.sm'}}
        >
          
          
        </Container> */}
      </Flex>
    </>
  );
};
