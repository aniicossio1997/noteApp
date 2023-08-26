import { Alert, AlertIcon, Center, Flex, Icon, IconButton, IconButtonProps, Input, Text, Textarea, TextareaProps, VStack } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { BiSave, BiSolidXSquare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { InputTextNote } from "../../../components/forms/InputText";
import { useNoteContext } from "../../../context/NoteContext";
import { useAlertDialog } from "../../hooks/useAlertDialog";
import { useEffect } from "react";
import { IFormNote } from "../../../models/INote";



interface IPropsIcon extends IconButtonProps { }
const TextareaCustom = (props: TextareaProps) => {
  return (
    <Textarea
      height={"180px"}
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
const NoteSchema = Yup.object().shape({
  title: Yup.string().required("form:validate.required"),
});
interface IPropsForm {
  initialValuesForm: IFormNote,

  onHandleSubmit: (values: IFormNote, actions: FormikHelpers<IFormNote>) => void
}


export const FormNoteComponent = ({ initialValuesForm,  onHandleSubmit }: IPropsForm) => {
  const useModal = useAlertDialog();
  const { t } = useTranslation("note");
  const { setIsDirtyForm ,resetIsDirtyForm} = useNoteContext();
  const navigate = useNavigate();
  const handleFormChange = (dataForm: FormikProps<IFormNote>) => {
    const isFormChange =dataForm.dirty;
    setIsDirtyForm(isFormChange);
  };
  const confirmationCloseFormWithModal = (props: FormikProps<IFormNote>) => {
    const isDirty=props.dirty
    if (isDirty) {
      useModal.openCustonModal();
      setIsDirtyForm(false);
    } else {
      resetIsDirtyForm();
      navigate("/note/");
    }
  };
  const onModalAction = () => {
    resetIsDirtyForm();
    navigate("/note/");
  };
  useEffect(() => {
    useModal.initialContentModal({body:'Los cambios no se guardaran',btnNo:'cancel',btnYes:'Accept',title:'¿Esta seguro de descartar los Cambios?'})
  }, [])
  return (
    <>
    <div className="bar-nav"></div>
      <Flex
        flexDirection={"column"}
        overflow={"auto"}
        height={"calc(100vh - 5px)"}
        w={"95%"}
        position={"relative"}
        mt={5}
      >
        {useModal.render(onModalAction)}
        <Center>
          <Formik
            initialValues={initialValuesForm}
            onSubmit={(values, actions: FormikHelpers<IFormNote>) =>
              onHandleSubmit(values, actions)
            }
            validationSchema={NoteSchema}
          >
            {(dataForm: FormikProps<IFormNote>) => (
              <Form
                style={{ width: "90%" }}
                onBlur={() => handleFormChange(dataForm)} // Use onBlur to detect changes
              >
                <Flex justifyContent={"space-between"}>
                  <IconCustom
                    icon={<Icon as={BiSolidXSquare} h={10} w={10} />}
                    bgColor={"red.400"}
                    _hover={{ bgColor: "red.500" }}
                    aria-label="close form"
                    onClick={() => confirmationCloseFormWithModal(dataForm)}
                  />

                  <VStack
                    flexShrink={1}
                    flexGrow={1}
                    width={"100%"}
                    height={"100%"}
                  >
                    {Boolean(
                      dataForm.errors.title && dataForm.submitCount > 0
                    ) && (
                        <Alert
                          status="error"
                          variant="solid"
                          w={"85%"}
                          p={{ base: 1, ms: 2, md: 4 }}
                          borderRadius={"3px"}
                          fontSize={"0.9rem"}
                        >
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
  )
}
