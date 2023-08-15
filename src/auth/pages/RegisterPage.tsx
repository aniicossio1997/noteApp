import { Input, Text } from "@chakra-ui/react";
import { Formik, Form, FormikProps } from "formik";
import { AuthLayout } from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { InputPassword, InputText } from "../../components/forms/InputText";
import { IValueForm, initialValueForm } from "../utils/form.utils";
import { UserAuth } from "../../context/AuthContext";
import { BtnLayout } from "../layouts/BtnLayout";
import { BtnGoogle } from "../components/BtnGoogle";

export const RegisterPage = () => {
  const { t } = useTranslation("form");
  const { register,isLoading,resetIsLoading } = UserAuth();

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
  const resetForm=(reset:()=>void, )=>{
    resetIsLoading();
    reset()
  }
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
              <BtnGoogle my={"10px"}/>
              {isLoading == "failed" && (
                <Text color={"red.400"}>{t("form:msj.register_error")}</Text>
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
              >
               <Text as='sup' color={"GrayText"}>* {t("form:validate.password")}</Text>
              </InputPassword>

              <InputPassword
                label={t("form:repeat_password")}
                name="confirmPassword"
                placeholder={t("form:placeholder.password")}
              />
              <BtnLayout 
              handleReset={()=>resetForm(props.handleReset)}
              isSubmitting={props.isSubmitting}
              titleReset={t("form:btn.reset")} titleSubmit= {t("form:btn.submit")} />
            
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
};
