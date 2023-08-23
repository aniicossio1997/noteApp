import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { FiMenu } from "react-icons/fi";
import { useNoteContext } from '../../../context/NoteContext';

interface IProps extends IconButtonProps{

}
export const BtnMenuSidebar = ({...rest}:IProps) => {
  const {changeNavSize}= useNoteContext()
  return (
    <IconButton
   
    transition={"all 0.4ms"}
    aria-label="btn"
    _hover={{ background: "rgb(135 131 131 / 40%)" }}
    icon={<FiMenu />}
    onClick={changeNavSize}
    {...rest}
  />
  )
}

