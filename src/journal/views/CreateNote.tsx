import {
  Center, Flex, Icon,
  Input,
  Textarea
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiSave } from "react-icons/bi";
import "./view.css";
export const CreateNote = () => {
  return (
    <>
      <Flex

      flexDirection={"column"}
        overflow={"auto"}
        height={"calc(100vh - 5px)"}
        w={"100%"}
        position={"relative"}
      >
        <Center p="2" backgroundColor={"#612a5233"}>
          <Flex width={"100%"} marginLeft={2} justifyContent={"flex-end"}>
            <Input
            flexShrink={1}
             marginLeft={5}
             width={"80%"}
              borderColor={"gray.300"}
              placeholder="Ingrese un titulo..."
            />

            <Flex>
              <Icon
                as={BiSave}
                h={10}
                w={10}
                cursor={"pointer"}
                padding={1}
                borderRadius={5}
                backgroundColor={"#63b3ed"}
                _hover={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
                marginLeft={1}
                justifyContent={"space-between"}
              />
              <Icon
                as={BiDotsVerticalRounded}
                h={10}
                w={10}
                padding={0}
                cursor={"pointer"}
              />
            </Flex>
          </Flex>
        </Center>
        <Center mt={"20px"} flexDirection={"column"} marginLeft={7}>
          <Textarea
            borderColor={"gray.300"}
            width={"85%"}
            placeholder="ingrese una descripcion ..."
            height={"40vh"}
          ></Textarea>
        </Center>

        {/* <Flex
          direction={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          justifyItems={"center"}
          alignItems={"center"}
          mb={10}
          pb={19}
        >
          <Box
            borderWidth={1}
            p={4}
            borderRadius={5}
            className="form"
            bg={"rgba(0,0,0,0.1)"}
          >
            <Heading as="h4" size="md" marginBottom={4} textAlign={"center"}>
              Crear Nota
            </Heading>
            <Input mb={10} placeholder="Ingrese un titulo..." />
            <Textarea></Textarea>
            <Button>Gurdar</Button>
          </Box>
        </Flex> */}
      </Flex>
    </>
  );
};
