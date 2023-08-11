import { Button, Flex, Input } from "@chakra-ui/react";
import { Formik, Form, FormikProps } from "formik";
import { AuthLayout } from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { InputPassword, InputText } from "../../components/forms/InputText";
import { IValueForm, initialValueForm } from "../utils/form.utils";
import { UserAuth } from "../../context/AuthContext";

export const RegisterPage = () => {
  const { t } = useTranslation("form");
  const { register } = UserAuth();

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("form:validate.email")
      .required("form:validate.required"),
    password: Yup.string()
      .required("form:validate.required")
      .min(6, "form:validate.password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "form:validate.repeat_password")
      .required("form:validate.required"), // Agrega validación de campo obligatorio
  });

  return (
    <>
      <AuthLayout title={t("form:register")}>
        <Formik
          initialValues={initialValueForm}
          onSubmit={(values,actions) => {
            // Handle form submission
            console.log(values);
            const {email,password}=values;
            setTimeout(() => {
            
            register(email,password);
            actions.setSubmitting(false);
            
            }, 1000);
          }}
          validationSchema={SignupSchema}
        >
          {(props: FormikProps<IValueForm>) => (
            <Form>
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

              <InputPassword
                label={t("form:repeat_password")}
                name="confirmPassword"
                placeholder={t("form:placeholder.password")}
              />

              <Flex justifyContent={"space-between"}>
                <Button mt={4} variant={"solid"} onClick={props.handleReset}>
                  reset
                </Button>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  
                >
                  {t("form:btn.create_account ")}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
};
