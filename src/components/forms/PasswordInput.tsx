import  { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Icon,
} from '@chakra-ui/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface IProps {
  label:string,
  placeholder:string
}
export const PasswordInput = ({label,placeholder}:IProps) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={show ? 'text' : 'password'}
          placeholder={show ? placeholder : '******'}
        />
        <InputRightAddon
          cursor="pointer"
          children={
            show ? (
              <Icon as={AiFillEye} boxSize={5} transition="all 1s" />
            ) : (
              <Icon as={AiFillEyeInvisible} boxSize={5} transition="all 1s" />
            )
          }
          transition="all 1s"
          onClick={handleClick}
        />
      </InputGroup>
    </FormControl>
  );
};


