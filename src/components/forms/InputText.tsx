import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import i18n from "../../i18n/config";

interface Props {
  label: string | React.ReactNode;
  name: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  Component: React.ElementType;
}
const traductor=(translationKey:string)=>{
  const errorMessage = i18n.t(translationKey, { defaultValue: "Invalid password" });
  return errorMessage
}

export const InputText = ({
  label,
  name,
  placeholder,
  Component,
  ...props
}: Props) => {
  return (
    <Box mb={5}>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
            <FormLabel htmlFor={name} fontSize={{ base: 16, md: 19 }}>
              {label}
            </FormLabel>
            <Component
              {...field}
              id={name}
              placeholder={placeholder}
              {...props}
            />
            <FormErrorMessage> {traductor(meta.error)}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Box>
  );
};

interface IProps {
  label: string | React.ReactNode;
  name: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;

}
export const InputPassword = ({
  label,
  name,
  placeholder,
  
  ...props
}: IProps) => {

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Box mb={5}>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <>
          <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
            <FormLabel htmlFor={name} fontSize={{ base: 16, md: 19 }}>
              {label}
            </FormLabel>
              <InputGroup>
                <Input
                name={name}
                  type={show ? "text" : "password"}
                  placeholder={show ? placeholder : "******"}
                  {...field}
              id={name}
              {...props}
                />
                <InputRightAddon
                  cursor="pointer"
                  children={
                    show ? (
                      <Icon as={AiFillEye} boxSize={5} transition="all 1s" />
                    ) : (
                      <Icon
                        as={AiFillEyeInvisible}
                        boxSize={5}
                        transition="all 1s"
                      />
                    )
                  }
                  transition="all 1s"
                  onClick={handleClick}
                />
              </InputGroup>
              <FormErrorMessage> {traductor(meta.error)}</FormErrorMessage>
            </FormControl>
          </>
        )}
      </Field>
    </Box>
  );
};
