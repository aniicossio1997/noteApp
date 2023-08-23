import * as Yup from "yup";

import {
  Alert,
  AlertIcon,
  Center,
  Flex,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { BiSave, BiSolidXSquare } from "react-icons/bi";
import "./view.css";
import { Form, Formik, FormikProps } from "formik";
import { InputTextNote } from "../../components/forms/InputText";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAlertDialog } from "../hooks/useAlertDialog";
import React from "react";
interface IFormNote {
  title: string;
  description: string;
}
export const CreateNote = () => {
  const { t } = useTranslation("note");
  const navigate = useNavigate();
  const useModal = useAlertDialog();
  const NoteSchema = Yup.object().shape({
    title: Yup.string().required("form:validate.required"),
  });
  const confirmationButtonRef = React.useRef<HTMLButtonElement>(null);

  const resetForm = (reset: () => void) => {
    reset();
  };
  const closeForm = (props: FormikProps<IFormNote>) => {
  
    if (props.dirty) {
      useModal.openCustonModal();
    } else {
      navigate("/note/");
    }
  };

  const onModalAction = () => {
    navigate("/note/");
  };

  return (
    <>
      {useModal.render(onModalAction)}

      <Flex
        flexDirection={"column"}
        overflow={"auto"}
        height={"calc(100vh - 5px)"}
        w={"100%"}
        position={"relative"}
        pt={5}
      >
        <Center>
          <Formik
            initialValues={{ title: "", description: "" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                console.log(values);
                actions.setSubmitting(false);
              }, 1000);
            }}
            validationSchema={NoteSchema}
          >
            {(dataForm: FormikProps<IFormNote>) => (
              <Form style={{ width: "95%" }}>
                <Flex
                  width={"100%"}
                  marginLeft={2}
                  justifyContent={"space-between"}
                >
                  <Icon
                    as={BiSolidXSquare}
                    h={10}
                    w={10}
                    cursor={"pointer"}
                    bgColor={"red.400"}
                    borderRadius={5}
                    _hover={{ bgColor: "red.500" }}
                    transition={"all 3ms"}
                    aria-label="close form"
                    onClick={() => closeForm(dataForm)}
                  />

                  <VStack flexShrink={1} flexGrow={1} width={"85%"}>
                    {Boolean(
                      dataForm.errors.title && dataForm.touched.title
                    ) && (
                      <Alert status="error" variant="solid" w={"85%"}>
                        <AlertIcon />
                        There was an error processing your request
                      </Alert>
                    )}
                    <InputTextNote
                      Component={Input}
                      name={"title"}
                      placeholder={t("note:placehorder.title")}
                    >
                      <Text color={"gray.400"} fontSize={"sm"}>
                        *Title is requerid
                      </Text>
                    </InputTextNote>

                    <InputTextNote
                      Component={Textarea}
                      name={"description"}
                      placeholder={t("note:placehorder.description")}
                    />
                  </VStack>

                  <Icon
                    as={BiSave}
                    h={10}
                    w={10}
                    cursor={"pointer"}
                    padding={1}
                    borderRadius={5}
                    backgroundColor={"#63b3ed"}
                    _hover={{
                      backgroundColor: "#0097E6",
                    }}
                    transition={"all 3ms"}
                    marginLeft={1}
                    aria-label="Save"
                    justifyContent={"space-between"}
                  />
                </Flex>
              </Form>
            )}
          </Formik>
        </Center>
      </Flex>
    </>
  );
};
