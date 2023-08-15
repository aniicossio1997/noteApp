import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../../context/AuthContext";

interface IProps extends ButtonProps{}
export const BtnGoogle = ({...rest}:IProps) => {
  const { signInWithGoogle } = UserAuth();

  const { t } = useTranslation("form");
  return (
    <>
      <Button
        width={"100%"}
        className="item btn-form "
        onClick={signInWithGoogle}
        leftIcon={<Icon as={FcGoogle} />}
        {...rest}
      >
        {t("form:btn.with_google")} Google
      </Button>
    </>
  );
};
