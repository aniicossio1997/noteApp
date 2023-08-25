import { Box, Flex,  useMediaQuery, } from "@chakra-ui/react";
import React from "react";
import { SidebarDesktop } from "../components/sidebar/SidebarDesktop";
import { SidebarResponsive } from "../components/sidebar/SidebarResponsive";
import { useNoteContext } from "../../context/NoteContext";

interface IProps {
  children: React.ReactNode;
}

export const JournalLayout = ({ children }: IProps) => {
  const [isLargerThan] = useMediaQuery("(min-width: 640px)");
  const {navSize}= useNoteContext()

  
  return (
    <>
    
      <Flex
        flexDirection={isLargerThan ? "row" : "column"}
       
      >
        <Box>
          {isLargerThan ? (
            <>
              {navSize == "large" &&(
                <SidebarDesktop
                  navSize={navSize}
                  
                />
              )}
            </>
          ) : (
            <>
              <SidebarResponsive />
            </>
          )}
        </Box>
        {children}

      </Flex>
    </>
  );
};
