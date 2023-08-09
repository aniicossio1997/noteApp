import { useTranslateContext } from '../../context/TranslateContext';
import { Select } from '@chakra-ui/react';

export const TranslatorMenuResponsive = () => {
    const { handleChanged, translate } = useTranslateContext();

  return (
    <>
    <Select
        maxWidth={100}
        value={translate}
        onChange={handleChanged}
        bgColor="whiteAlpha.600"
        fontSize={{ base: 15, md: 18 }}
        textAlign="center"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </Select>
    </>
  )
}
