import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  onAccept: () => void;
  cancelRef: React.MutableRefObject<HTMLButtonElement>
  openRef: React.MutableRefObject<HTMLButtonElement>
}

export const ModalComponent: React.FC<IProps> = ({onAccept,cancelRef,openRef}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();





  return (
    <>
      <Button onClick={onOpen} ref={openRef} visibility={"hidden"}>Open Modal</Button>
      <AlertDialog
        id="modal"
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={true}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard all of your note?
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                colorScheme="cyan"
                ml={3}
                onClick={onAccept}
               
              >
                Yes
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
