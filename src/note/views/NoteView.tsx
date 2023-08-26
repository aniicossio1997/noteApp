import {
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiSolidEdit } from "react-icons/bi";
import "./view.css";
import {  useDeleteNoteMutation, useGetFullNoteByUserQuery } from "../../redux/slice/noteSlice";
import { UserAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { INoteFull } from "../../models/INote";
import { useTranslation } from "react-i18next";
import { FiTrash2 } from "react-icons/fi";
import { SkeletonComponent } from "../../components/Skeleton/SkeletonComponent";
import { useAlertDialog } from "../hooks/useAlertDialog";
import { useNoteContext } from "../../context/NoteContext";
export const NoteView = () => {
  const useModalAlert = useAlertDialog();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const { pathname } = useLocation();
  const [note, setNote] = useState<INoteFull>({} as INoteFull);
  const {  alertObject,noteSelected } = useNoteContext();
  const { isError, isFetching, isLoading, data, isSuccess } =
    useGetFullNoteByUserQuery({
      note_id: pathname.split("/note/")[1],
      user_id: user.id,
    });
  const { t } = useTranslation("note");

  const [deleteNote]=useDeleteNoteMutation()
  
  const onDelete=()=>{
    useModalAlert.openCustonModal()
  }

  const onHandleDeleteNote=async()=>{
   const{ status}= await deleteNote({note_id:note.id,user_id:user.id}).unwrap();
   if(status==204){
    navigate('/note/');
    alertObject.initializeAlertContent({body:'',status:'success',title:'Se elimino la nota con exito'});
    alertObject.showAlert();
   }
  }

  const initNota=()=>{
    if (!isFetching && !isLoading && isSuccess && data.length > 0) {
      const dataAux = data as INoteFull[];
      setNote(dataAux[0]);
    }else{
      if((!isFetching && data.length ==0 ) ){
        navigate('note/')
        alertObject.initializeAlertContent({body:'Parece que no tiene acceso para entrar a dicha seccion...',status:'error',title:'Intente más tarde'});
        alertObject.showAlert();
      }
    }
  }

  const onEdit=()=>{
    noteSelected.changeNoteIdSelected(note);
    navigate('/note/edit')
  }
  useEffect(() => {
    initNota()
  }, [isLoading, isFetching, data, isSuccess]);

  useEffect(() => {
    useModalAlert.initialContentModal({
      body:'Se eliminara de manera permanente',
      title:'¿Usted esta seguro de eliminar la nota?',
      btnNo:'cancel',
      btnYes:'Delete'
    });
  }, [])

  if (isError) return <div>ups hubo un error</div>;
  return (
    <>
    {useModalAlert.render(onHandleDeleteNote)}
      <Flex
        flexDirection={"column"}
        minWidth={{ base: undefined, lg: "max-content" }}
        gap="2"
        paddingX={"1px"}
        style={{ width: "100%" }}
        overflow={"hidden"}
      >
        {isLoading && (
          <div style={{ margin: "0 auto", width: "80%", marginTop: "20px" }}>
            <SkeletonComponent isLoading={isLoading} />
          </div>
        )}
        {!isLoading && (
          <>
            <Flex p="2" backgroundColor={"var(--color-black)"}>
              <Heading
                flexGrow={1}
                flexShrink={1}
                textAlign={"center"}
                size="md"
                textTransform={"capitalize"}
                fontSize={"1.6rem"}
              >
                {note.title}
              </Heading>
              <HStack>
                <Icon
                  as={BiSolidEdit}
                  h={10}
                  w={10}
                  cursor={"pointer"}
                  padding={1}
                  borderRadius={5}
                  _hover={{
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                  onClick={onEdit}
                />
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={
                      <Icon
                        as={BiDotsVerticalRounded}
                        h={10}
                        w={10}
                        padding={0}
                        cursor={"pointer"}
                      />
                    }
                    variant="unstyled"
                  />
                  <MenuList>
                    <MenuItem icon={<Icon as={FiTrash2} h={6} w={6} />} onClick={onDelete}  >
                      {t("note:btn.delete")}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Flex>
            <Container
              boxSizing="border-box"
              pb={5}
              overflow={"auto"}
              className="container-text scrollbar doblado "
              maxWidth={{ base: undefined, md: "630px", xl: "890px" }}
              width={"90%"}
            >
              <Text
                whiteSpace={"normal"}
                wordBreak={"break-word"}
                textAlign={"justify"}
                padding={"20px"}
                borderRadius={"5px"}
                className="lined-words"
              >
                {note.description}
              </Text>
            </Container>
          </>
        )}
      </Flex>
    </>
  );
};
