import { Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { BiSolidEdit } from "react-icons/bi";
import "./view.css";
export const NoteView = () => {
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
        <Flex p="2" backgroundColor={"#161b25"}>
          <Heading
            flexGrow={1}
            flexShrink={1}
            textAlign={"center"}
            size="md"
            textTransform={"capitalize"}
            fontSize={"1.6rem"}
          >
            title hola
          </Heading>
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
        </Flex>
        <Container
          boxSizing="border-box"
          pb={5}
          overflow={"auto"}
          maxWidth={{ base: undefined, md: "630px", xl: "890px" }}
          className="container-text scrollbar doblado "
        >
          <Text
            whiteSpace={"normal"}
            wordBreak={"break-word"}
            textAlign={"justify"}
            padding={"20px"}
            borderRadius={"5px"}
            
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            consectetur eius aut veniam deleniti blanditiis eligendi, porro ex
            reprehenderit laudantium sunt consequuntur voluptate. At vero
            eligendi nemo, odit blanditiis delectus. Mollitia cupiditate ab nemo
            nisi quaerat veniam ratione maxime voluptates molestias ex incidunt
            nesciunt quos dolore itaque nostrum sunt enim esse commodi, illum ut
            consectetur dicta tenetur nihil! Eligendi, provident! Tenetur
            voluptate dolorem eius cum dolores obcaecati corporis velit nulla
            amet officiis, maxime cupiditate iusto sed pariatur molestiae
            quisquam doloribus aut porro quam quod voluptatem! Labore sint autem
            quia officiis! Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ullam non illum commodi alias, magni soluta recusandae. Illum
            ducimus sed dolorum laboriosam, quas, obcaecati molestiae velit nam
            ipsum voluptate nemo eaque. Magnam accusantium similique delectus,
            labore expedita culpa neque praesentium aliquam unde hic impedit a
            repudiandae. Natus libero earum nulla similique fugit velit
            adipisci, fugiat commodi quas rerum expedita! Nostrum, laborum.
            voluptate dolorem eius cum dolores obcaecati corporis velit nulla
            amet officiis, maxime cupiditate iusto sed pariatur molestiae
     
             FIN
          </Text>
        </Container>
      </Flex>
    </>
  );
};
