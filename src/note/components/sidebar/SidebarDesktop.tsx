import {
  Flex,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  Icon,
  Link,
  Text,
  Button,
  LinkProps,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineFileText } from "react-icons/ai";
import { UserAuth } from "../../../context/AuthContext";
import { BsBoxArrowRight } from "react-icons/bs";
import { Link as LinkRouter, useLocation, useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

import "./sidebar.css";
import { useGetNotesByUserQuery } from "../../../redux/slice/noteSlice";
import { INote } from "../../../models/INote";
import { SkeletonComponent } from "../../../components/Skeleton/SkeletonComponent";
import { useAlertDialog } from "../../hooks/useAlertDialog";
import { useNoteContext } from "../../../context/NoteContext";

interface IPropsNavItem extends LinkProps {
  icon: IconType;
  title: string;
  active?: boolean;
  navSize: string;
}
export const NavItem = ({
  icon,
  title,
  active = false,
  navSize,
  ...rest
}: IPropsNavItem) => (
  <Flex
    mt={"5px"}
    flexDir="column"
    w="100%"
    alignItems={navSize == "small" ? "center" : "flex-start"}
  >
    <Menu placement="right">
      <Link
        backgroundColor={active && "rgb(135 131 131 / 40%)"}
        p={3}
        borderRadius={"3px"}
        _hover={{
          textDecor: "none",
          backgroundColor: "rgb(135 131 131 / 40%)",
        }}
        w={navSize == "large" && "100%"}
        {...rest}
      >
        <MenuButton w="100%">
          <Flex>
            <Icon as={icon} fontSize="xl" />
            <Text
              ml={4}
              display={navSize == "small" ? "none" : "flex"}
              textTransform={"capitalize"}
            >
              {title}
            </Text>
          </Flex>
        </MenuButton>
      </Link>
    </Menu>
  </Flex>
);

interface IPropsSidebar {
  navSize: string;
}

export const SidebarDesktop = ({ navSize }: IPropsSidebar) => {
  const { signOut, user } = UserAuth();
  const { pathname } = useLocation();
  const [idNote, setIdNote] = useState<string>("");
  const { isLoading, data, isFetching, isError } = useGetNotesByUserQuery(
    user.id
  );
  const [noteNextId, setNoteNextId] = useState("");
  const [notes, setNotes] = useState<INote[]>([]);
  const useModal = useAlertDialog();
  const { isDirtyForm, setIsDirtyForm } = useNoteContext();
  const navigate = useNavigate();

  const checkNoNote = (noteId: string) => {
    setNoteNextId(`/note/${noteId}`);
    if (isDirtyForm) {
      useModal.openCustonModal();
    } else {
      navigate(`/note/${noteId}`);
    }
  };

  const changeRouter = () => {
    setIsDirtyForm(false);
    navigate(noteNextId);
  };
  useEffect(() => {
    const extractIdURL = (): string => {
      const parts = pathname.split("/note/");
      if (parts.length === 2) {
        return parts[1];
      }
      return null;
    };
    setIdNote(extractIdURL());
  }, [pathname]);
  useEffect(() => {
    if (!isFetching && !isLoading) {
      setNotes(data);
    }
  }, [isLoading, isFetching, data]);

  useEffect(() => {
    useModal.initialContentModal({
      body: "Los cambios no se guardaran",
      btnNo: "cancel",
      btnYes: "Accept",
      title: "¿Esta seguro de descartar los Cambios?",
    });
  }, []);

  if (isError) return <div>ups hubo un error</div>;
  return (
    <>
      {useModal.render(changeRouter)}
      <Flex
        pos="sticky"
        left="0"
        h="100%"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.4)"
        boxSizing={"border-box"}
        w={navSize == "small" ? "75px" : "260px"}
        flexDir="column"
        justifyContent="space-between"
        transition={"all 0.1s"}
        backgroundColor={"#161b25"}
        className="flex-1"
      >
        <Flex
          transition={"all 0.1s"}
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          as="nav"
        >
          <Flex
            width={"100%"}
            flexDirection={"row"}
            gap={"0.5rem"}
            my={"10px"}
            mb={"15px"}
          >
            <Button
              colorScheme="gray"
              variant="outline"
              leftIcon={<AddIcon boxSize={3} />}
              width={"100%"}
              justifyContent={"left"}
              as={LinkRouter}
              to={"/note/create"}
            >
              New note
            </Button>
          </Flex>

          <Flex
            overflowY={"auto"}
            flexDir="column"
            width={"100%"}
            height={"calc(100vh - 244px)"}
            paddingRight={"8px"}
            className="scrollbar"
          >
            <SkeletonComponent isLoading={isLoading} />
            {!isLoading &&
              notes.map((note) => (
                <div key={note.id} onClick={() => checkNoNote(note.id)}>
                  <NavItem
                    navSize={navSize}
                    icon={AiOutlineFileText}
                    title={note.title}
                    active={note.id.toString() == idNote}
                  />
                </div>
              ))}
          </Flex>
        </Flex>

        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={"flex-start"}
          mb={4}
          transition={"all 0.1s"}
          marginBottom={"calc(100vh - 244px)"}
        >
          <Divider display={"flex"} />
          <Flex mt={4} flexDirection={"column"} p={3}>
            <Flex
              transition={"all 0.1s"}
              flexDir="revert"
              justifyContent={"flex-end"}
              alignItems={"center"}
              gap={"10px"}
              ml={4}
              display={"flex"}
              marginLeft={"-1px"}
            >
              <Avatar
                aria-hidden
                size="sm"
                name={`${user.full_name}`}
                fontWeight={"extrabold"}
                bg={"facebook.900"}
              />
              <VStack
                gap={0}
                alignContent={"start"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
              >
                <Heading as="h3" size="sm" className="text-break" p={0}>
                  {user.email}
                </Heading>
                <span
                  style={{
                    color: "rgb(174, 172, 172)",
                    fontWeight: "700",
                    fontSize: "0.7rem",
                    textTransform: "capitalize",
                  }}
                >
                  {user.full_name}{" "}
                </span>
              </VStack>
            </Flex>
            {navSize == "small" ? (
              <IconButton
                aria-label="exit"
                size="lg"
                colorScheme="red"
                onClick={signOut}
                icon={<Icon as={BsBoxArrowRight} />}
              />
            ) : (
              <Button
                size="md"
                width={"80px"}
                h={"30px"}
                paddingX={"0"}
                mt={"10px"}
                bg={"#8b246f"}
                onClick={signOut}
                leftIcon={<Icon as={BsBoxArrowRight} />}
                borderRadius={"3px"}
              >
                Salir
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
