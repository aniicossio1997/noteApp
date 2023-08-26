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

interface IPropsContentModal {
  title: string;
  body: string;
  btnYes: string;
  btnNo: string;
}

interface IProps {
  isOpen: boolean;

  onClose: () => void;
  confirmationRef: React.MutableRefObject<HTMLButtonElement>;
  onModalAction: () => void;
  contentModal: IPropsContentModal;
}
export const DialogModal = ({
  confirmationRef,
  isOpen,
  onClose,

  onModalAction,
  contentModal,
}: IProps) => {
  const cancelRef = React.useRef(null);
  const confirmation = () => {
    onModalAction();
    onClose();
  };
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        
      >
        <AlertDialogOverlay background={"#0d0d26c4"}/>

        <AlertDialogContent borderWidth={1} borderRadius={"3px"} borderColor={"#3b313c82"}>
          <AlertDialogHeader>{contentModal.title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{contentModal.body}</AlertDialogBody>
          <AlertDialogFooter>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Button ref={cancelRef} onClick={onClose} id="close" borderRadius={"3px"}>
                {contentModal.btnNo}
              </Button>
              <Button
                colorScheme="cyan"
               
                m={0}
                onClick={confirmation}
                ref={confirmationRef}
                id="confirm"
                borderRadius={"3px"}
         
              >
                {contentModal.btnYes}
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
  const [contentModal, setContentModal] = useState<IPropsContentModal>({
    body: "",
    btnNo: "No",
    btnYes: "yes",
    title: "",
  });
  const confirmationRef = React.useRef<HTMLButtonElement>(null);

  const openCustonModal = () => {
    setIsOpen(true);
  };
  const changeModal = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const initialContentModal = (contentModalProps: IPropsContentModal) => {
    setContentModal(contentModalProps);
  };
  return {
    openCustonModal,
    initialContentModal,
    changeModal,
    confirmationRef,
    render: (onModalAction: () => void) => (
      <DialogModal
        isOpen={isOpen}
        onClose={handleClose}
        confirmationRef={confirmationRef}
        onModalAction={onModalAction}
        contentModal={contentModal}
      />
    ),
  };
};
