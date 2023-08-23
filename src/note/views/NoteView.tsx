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
import { useGetFullNoteByUserQuery } from "../../redux/slice/noteSlice";
import { UserAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { INoteFull } from "../../models/INote";
import { useTranslation } from "react-i18next";
import { FiTrash2 } from "react-icons/fi";
export const NoteView = () => {
  const { user } = UserAuth();
  const { pathname } = useLocation();
  const [note, setNote] = useState<INoteFull>({} as INoteFull);
  const { isError, isFetching, isLoading, data, isSuccess } =
    useGetFullNoteByUserQuery({
      note_id: pathname.split("/note/")[1],
      user_id: user.id,
    });
  const { t } = useTranslation("note");

  useEffect(() => {
    if (!isFetching && !isLoading && isSuccess && data.length > 0) {
      const dataAux = data as INoteFull[];
      setNote(dataAux[0]);
    }
  }, [isLoading, isFetching, data, isSuccess]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>ups hubo un error</div>;
  return (
    <>
      <Flex
        flexDirection={"column"}
        minWidth={{ base: undefined, lg: "max-content" }}
        gap="2"
        paddingX={"1px"}
        style={{ width: "100%" }}
        overflow={"hidden"}
      >
        <Flex p="2" backgroundColor={"#612a5233"}>
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
                <MenuItem icon={<Icon as={FiTrash2} h={6} w={6} />}>
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
      </Flex>
    </>
  );
};
