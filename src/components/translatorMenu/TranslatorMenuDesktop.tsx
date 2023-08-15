import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useTranslateContext } from "../../context/TranslateContext";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface IProps extends MenuButtonProps {}
export const TranslatorMenuDesktop = ({ ...rest }: IProps) => {
  const { handleChanged, translate} = useTranslateContext();

  const isActive = (title: "en" |"es") => {
   
    return translate === title;
  };

  
  return (
    <>
      <Menu>
      <>
            <MenuButton
             
             as={Button} rightIcon={<ChevronDownIcon />}
              boxSizing="border-box"
              borderRadius={0}
              textTransform="uppercase"
              textAlign={"center"}
              bgColor={"blackAlpha.200"}
              fontSize={{ base: undefined, md: "1.2em" }}
              rounded={5}
              letterSpacing="1.2px"
              {...rest}
            >
              {translate || ""}
            </MenuButton>

            <MenuList
              className={"btnTransladeDesktop"}
              paddingTop={0}
              paddingBottom={0}
            >
              <MenuItem
                onClick={() => handleChanged("en")}
                className={isActive("en") ? `isActive` : ""}
                padding={2}
              >
                EN 
              </MenuItem>
              <MenuItem
                padding={2}
                onClick={() => handleChanged("es")}
                className={isActive("es") ? `isActive` : ""}
              >
                ES 
              </MenuItem>
            </MenuList>
          </>
      </Menu>
    </>
  );
};
