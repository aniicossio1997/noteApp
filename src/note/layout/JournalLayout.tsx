import {
  Alert,
  AlertDescription, AlertTitle,
  Box, CloseButton,
  Flex, VStack, useMediaQuery
} from "@chakra-ui/react";
import React from "react";
import { SidebarDesktop } from "../components/sidebar/SidebarDesktop";
import { SidebarResponsive } from "../components/sidebar/SidebarResponsive";
import { useNoteContext } from "../../context/NoteContext";

interface IProps {
  children: React.ReactNode;
}

export const JournalLayout = ({ children }: IProps) => {
  const [isLargerThan] = useMediaQuery("(min-width: 640px)");
  const { navSize, alertObject } = useNoteContext();

  return (
    <>
      <Flex flexDirection={isLargerThan ? "row" : "column"}>
        <Box>
          {isLargerThan ? (
            <>{navSize == "large" && <SidebarDesktop navSize={navSize} />}</>
          ) : (
            <>
              <SidebarResponsive />
            </>
          )}
        </Box>
        <VStack width={"100%"}>
          
          <Alert
            status={alertObject.alertContent.status}
            width={"100%"}
            display={alertObject.isOpenAlert ? "flex" : "none"}
            zIndex={10}
            variant="top-accent"
          >
            <Box width={"100%"}>
              <AlertTitle
                textAlign={"center"}
                borderBottom={"1px"}
                mb={1}
                pb={1}
              >
                {alertObject.alertContent.title}
              </AlertTitle>
              <AlertDescription fontSize={"0.9rem"} width={"100%"}>
                {alertObject.alertContent.body}
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={() => alertObject.hideAlert()}
            />
          </Alert>
          {children}
        </VStack>
      </Flex>
    </>
  );
};
