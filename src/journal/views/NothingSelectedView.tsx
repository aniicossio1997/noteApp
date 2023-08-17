import { Center,  Icon, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next";
import { AiOutlineStar } from "react-icons/ai"

export const NothingSelectedView = () => {
  const { t } = useTranslation("note");
  
  return (
    <>
    <Center width={"100%"}  flexDirection={"column"} h={"85vh"} justifyContent={"center"} >
      <Icon as={AiOutlineStar} h={"4rem"} width={"4rem"}/>
      <Text textAlign={"center"}>{t("note:nothing_selected")}</Text>
    </Center>
    </>
  )
}
