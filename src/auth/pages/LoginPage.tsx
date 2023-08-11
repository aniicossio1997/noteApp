import {
  Button, Input, Text
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import { UserAuth } from "../../context/AuthContext";
import { InputPassword, InputText } from "../../components/forms/InputText";
import * as Yup from "yup";

export const LoginPage = () => {
  const { signInWithGoogle,signInWithFacebook,signInEmailPassword,isLoading } = UserAuth();

  const { t } = useTranslation("form");
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("form:validate.email")
      .required("form:validate.required"),
    password: Yup.string()
      .required("form:validate.required")
      });


  return (
    <>
      <AuthLayout title={t("form:login")}>
        <Formik
          initialValues={{ email:'', password:'' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              signInEmailPassword(values,actions.resetForm)
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={SignupSchema}
        >
          {(
            props: FormikProps<{
             
              email:string;
              password:string;
            }>
          ) => (
            <Form>
              {
                isLoading=='failed' && <Text color={"red.400"}>Error en el correo o contraseña</Text>
              }
        <Button onClick={signInWithGoogle}>Google</Button>


              <Button my={3} mx={2} onClick={signInWithFacebook}>
                Facebook
              </Button>
              <InputText
                label={t("form:email")}
                name={"email"}
                Component={Input}
                type="email"
              />

              <InputPassword
                label={t("form:password")}
                name="password"
                placeholder={t("form:placeholder.password")}
              />

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
