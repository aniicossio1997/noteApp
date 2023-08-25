import * as Yup from "yup";

import {
  Alert,
  AlertIcon,
  Center,
  Flex,
  Icon,
  IconButton,
  IconButtonProps,
  IconProps,
  Input,
  Text,
  Textarea,
  TextareaProps,
  VStack,
} from "@chakra-ui/react";
import { BiSave, BiSolidXSquare } from "react-icons/bi";

import { Form, Formik, FormikProps } from "formik";
import { InputTextNote } from "../../components/forms/InputText";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./view.css";
import { useAlertDialog } from "../hooks/useAlertDialog";
import { IconType } from "react-icons";
import { useNoteContext } from "../../context/NoteContext";
import {useState} from "react";

interface IFormNote {
  title: string;
  description: string;
}
interface IPropsIcon extends IconButtonProps {
 
}
const TextareaCustom = (props: TextareaProps) => {
  return (
    <Textarea
      height={"150px"}
      minH={"100px"}
      maxH={"350px"}
      {...props}
    ></Textarea>
  );
};
const IconCustom = ({ ...rest }: IPropsIcon) => {
  return (
    <IconButton
     

      transition={"all 3ms"}
      cursor={"pointer"}
      padding={1}
      borderRadius={5}
      {...rest}
    />
  );
};
export const CreateNote = () => {
  const { t } = useTranslation("note");
  const navigate = useNavigate();
  const useModal = useAlertDialog();
  const { setIsDirtyForm,changeToTrueDirtyForm } = useNoteContext();
  const [formChange,setFormChange]=useState(false)
  const NoteSchema = Yup.object().shape({
    title: Yup.string().required("form:validate.required"),
  });

  const resetForm = (reset: () => void) => {
    reset();
  };

  const confirmationCloseFormWithModal = (props: FormikProps<IFormNote>) => {
    console.log("confirmation close")
    
    if (!(props.values.description =='') || !(props.values.title=='')) {
      useModal.openCustonModal();
      setIsDirtyForm(false);
    } else {
      setIsDirtyForm(false);
      navigate("/note/");
    }
  };

  const onModalAction = () => {
    navigate("/note/");
  };
  const handleFormChange = (dataForm: FormikProps<IFormNote>) => {
    const isFormChange = 
      !(dataForm.values.description === '') || !(dataForm.values.title === '');
    setIsDirtyForm(isFormChange);
  };

  return (
    <>
      <div className="bar-nav"></div>

      <Flex
        flexDirection={"column"}
        overflow={"scroll"}
        height={"calc(100vh - 5px)"}
        w={"95%"}
        position={"relative"}
        mt={5}
      >
        {useModal.render(onModalAction)}
        <Center>
          <Formik
            initialValues={{ title: "", description: "" }}
            onSubmit={(values, actions) => {
              console.log("hello")
            }}
            validationSchema={NoteSchema}

          >
            {(dataForm: FormikProps<IFormNote>) => (
              <Form
                style={{ width: "90%" }}
                onBlur={() => handleFormChange(dataForm)} // Use onBlur to detect changes

                
              >

                <Flex width={"80%"} justifyContent={"space-between"} >

                  <IconCustom
                    icon={<Icon as={BiSolidXSquare} h={10} w={10} />}
                    bgColor={"red.400"}
                    _hover={{ bgColor: "red.500" }}
                    aria-label="close form"
                    onClick={() => confirmationCloseFormWithModal(dataForm)}
                  />

                  <VStack flexShrink={1} flexGrow={1} width={"100%"}  height={"100%"}>
                    {Boolean(dataForm.errors.title && dataForm.submitCount >0) && (
                      <Alert status="error" variant="solid" w={"85%"} p={{base:1, ms:2, md:4}} borderRadius={"3px"} fontSize={"0.9rem"}>
                        <AlertIcon />
                        There was an error processing your request
                      </Alert>
                    )}
                    <InputTextNote
                      Component={Input}
                      name={"title"}
                      placeholder={t("note:placehorder.title")}
                      isDirty={dataForm.dirty}
                      
                    >
                      <Text color={"gray.400"} fontSize={"sm"}>
                        *Title is requerid
                      </Text>
                      
                    </InputTextNote>

                    <InputTextNote
                      Component={TextareaCustom}
                      name={"description"}
                      placeholder={t("note:placehorder.description")}
                      isDirty={dataForm.dirty}
                    />
                    <Text width={"60%"}>
                    {
                      JSON.stringify(dataForm)
                    }
                    </Text>
                  </VStack>
                 
                  <IconCustom
                    icon={<Icon as={BiSave} h={10} w={10} />}
                    backgroundColor={"#63b3ed"}
                    _hover={{
                      backgroundColor: "#0097E6",
                    }}
                    aria-label="form Save"
                    type="submit"
                    zIndex={10}
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
