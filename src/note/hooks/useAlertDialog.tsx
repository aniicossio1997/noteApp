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
} from "@chakra-ui/react";
import React, { useState } from "react";


interface IProps{
isOpen:boolean,
onConfirm:()=>void,
onClose:()=>void,
confirmationRef: React.MutableRefObject<HTMLButtonElement>
onModalAction:()=>void
}
export const DialogModal = ({confirmationRef,isOpen,onClose,onConfirm,onModalAction}:IProps) => {
  const cancelRef = React.useRef(null);
  const confirmation=()=>{
    
    onModalAction()
    onClose()
  }
  return (
    <>
  
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard all of your note
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Button ref={cancelRef} onClick={onClose} id="close">
                No
              </Button>
              <Button colorScheme="cyan" ml={3} onClick={confirmation} ref={confirmationRef} id="confirm">
                Yes
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const useAlertDialog = () => {
  
  const [isOpen, setIsOpen] = useState(false);

  
  const confirmationRef = React.useRef<HTMLButtonElement>(null);
  
  const openCustonModal = () => {
    
    setIsOpen(true)
   
    
  };
  const changeModal=()=> setIsOpen(!isOpen)
  const handleClose=()=> setIsOpen(false)
  const handleConfirm=()=>{
    setIsOpen(false)
  }
  return {
    openCustonModal,
   
    
    isOpen,
    changeModal,
   confirmationRef,
   render: (onModalAction: () => void) => (
      <DialogModal isOpen={isOpen} onConfirm={handleConfirm} onClose={handleClose} confirmationRef={confirmationRef} onModalAction={onModalAction} />
    ),
  };
};
