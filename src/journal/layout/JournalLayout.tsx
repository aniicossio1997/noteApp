import {
  Box, Flex, Text, useMediaQuery
} from "@chakra-ui/react";
import React from "react";
import { SidebarDesktop } from "../components/sidebar/SidebarDesktop";
import { SidebarResponsive } from "../components/sidebar/SidebarResponsive";

interface IProps {
  children: React.ReactNode;
}

export const JournalLayout = ({ children }: IProps) => {
  const [isLargerThan] = useMediaQuery("(min-width: 600px)");
  return (
    <>
      <Flex flexDirection={isLargerThan ? "row" : "column"} height={isLargerThan ? "unset" : "100%"}>
        {isLargerThan ? (
          <>
            <SidebarDesktop />
          </>
        ) : (
          <>
          <SidebarResponsive/>
          </>
        )}
        <Box minWidth="max-content" alignItems="center" flex="1" bg="tomato" flexGrow={isLargerThan ? undefined : "1"} >
          {children}
          <Text></Text>
        </Box>
      </Flex>
    </>
  );
};
