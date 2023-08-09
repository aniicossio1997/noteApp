import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTranslation } from "react-i18next";


export const RegisterPage = () => {
  const [input, setInput] = useState("");
  const { t } = useTranslation("form");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);
  const [show, setShow] = React.useState(false);
  const [showv2, setShowv2] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClickv2 = () => setShowv2(!showv2);
  const isError = input === "";
  function validateName(value:string) {
    let error;
    if (!value) {
      error = "User name is required";
    } 
    return error;
  }
  return (
    <>
      <AuthLayout title={t("form:register")}>
        <Formik
          initialValues={{ name: "",  }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert("Form enviado");
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(
            props: FormikProps<{
              name: string;
            }>
          ) => (
            <Form>
              <Field name="name" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel>{t("form:first_name")}</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <FormControl>
                <FormLabel>{t("form:email")}</FormLabel>
                <Input
                  type="email"
                  value={input}
                  onChange={handleInputChange}
                />
                {!isError ? (
                  <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>{t("form:password")}</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder={show ? t("form:placeholder.password") : '******'}
                  />
                  <InputRightAddon
                    cursor={"pointer"}
                    children={
                      show ? (
                        <Icon
                          as={AiFillEye}
                          boxSize={5}
                          transition={"all 1s"}
                        />
                      ) : (
                        <Icon
                          as={AiFillEyeInvisible}
                          boxSize={5}
                          transition={"all 1s"}
                        />
                      )
                    }
                    transition={"all 1s"}
                    onClick={handleClick}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>{t("form:repeat_password")}</FormLabel>
                <InputGroup>
                  <Input
                    type={showv2 ? "text" : "password"}
                    placeholder={showv2 ? t("form:placeholder.password") : '******'}
                  />
                  <InputRightAddon
                    cursor={"pointer"}
                    children={
                      showv2 ? (
                        <Icon
                          as={AiFillEye}
                          boxSize={5}
                          transition={"all 1s"}
                        />
                      ) : (
                        <Icon
                          as={AiFillEyeInvisible}
                          boxSize={5}
                          transition={"all 1s"}
                        />
                      )
                    }
                    transition={"all 1s"}
                    onClick={handleClickv2}
                  />
                </InputGroup>
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                {t("form:btn.create_account ")}
              </Button>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
};
