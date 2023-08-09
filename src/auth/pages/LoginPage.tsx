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
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { UserAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const { signInWithGoogle,signInWithFacebook } = UserAuth();

  const [input, setInput] = useState("");
  const { t } = useTranslation("form");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const isError = input === "";

  return (
    <>
      <AuthLayout title={t("form:login")}>
        <Formik
          initialValues={{ email:'', password:'' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(
            props: FormikProps<{
             
              email:string;
              password:string;
            }>
          ) => (
            <Form>
        <Button onClick={signInWithGoogle}>Google</Button>


              <Button my={3} mx={2} onClick={signInWithFacebook}>
                Facebook
              </Button>

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

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                {t("form:btn.submit")}
              </Button>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
};
