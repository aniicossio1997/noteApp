import { Center,  Icon,  Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next";
import { AiFillFileAdd} from "react-icons/ai"
import { Link } from "react-router-dom";

export const NothingSelectedView = () => {
  const { t } = useTranslation("note");
  
  return (
    <>
    <Center width={"100%"}  flexDirection={"column"} h={{base:"80vh",md:"60vh"}} justifyContent={"center"} >
      <Link to={'/note/create'}>
      <Icon as={AiFillFileAdd} h={"4rem"} width={"4rem"}/>
      </Link>
      
      <Text textAlign={"center"}>{t("note:nothing_selected")}</Text>
     

    </Center>
    </>
  )
}
