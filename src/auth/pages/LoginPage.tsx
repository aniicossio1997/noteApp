import { Input, Text } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { AuthLayout } from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import { UserAuth } from "../../context/AuthContext";
import { InputPassword, InputText } from "../../components/forms/InputText";
import * as Yup from "yup";
import { BtnLayout } from "../layouts/BtnLayout";
import { BtnGoogle } from "../components/BtnGoogle";
export const LoginPage = () => {
  const { signInEmailPassword, isLoading, resetIsLoading } = UserAuth();

  const { t } = useTranslation("form");
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("form:validate.email")
      .required("form:validate.required"),
    password: Yup.string().required("form:validate.required"),
  });
  const resetForm = (reset: () => void) => {
    resetIsLoading();
    reset();
  };
  return (
    <>
      <AuthLayout title={t("form:login")}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              signInEmailPassword(values, actions.resetForm);
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={SignupSchema}
        >
          {(
            props: FormikProps<{
              email: string;
              password: string;
            }>
          ) => (
            <Form>
              <BtnGoogle my={"10px"} />
              {isLoading == "failed" && (
                <Text color={"red.400"}>{t("form:msj.error")}</Text>
              )}
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

              <BtnLayout
                handleReset={() => resetForm(props.handleReset)}
                isSubmitting={props.isSubmitting}
                titleReset={t("form:btn.reset")}
                titleSubmit={t("form:login")}
              />
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
};
