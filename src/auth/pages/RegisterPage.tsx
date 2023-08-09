import { Button, Flex, Input } from "@chakra-ui/react";
import { Formik, Form, FormikProps } from "formik";
import { AuthLayout } from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { InputPassword, InputText } from "../../components/forms/InputText";
import { IValueForm, initialValueForm } from "../utils/form.utils";

export const RegisterPage = () => {
  const { t } = useTranslation("form");

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("validation_inputs.email.invalid")
      .required("validation_inputs.email.required"),
    password: Yup.string()
      .required("Campo obligatorio")
      .min(4, "La contraseña debe tener al menos 4 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Campo obligatorio"), // Agrega validación de campo obligatorio
  });

  return (
    <>
      <AuthLayout title={t("form:register")}>
        <Formik
          initialValues={initialValueForm}
          onSubmit={(values) => {
            // Handle form submission
            console.log(values);
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
                label={t("form:repeat_email")}
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
