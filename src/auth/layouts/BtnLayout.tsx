import { Button, ButtonProps, Flex } from '@chakra-ui/react'

interface IProps extends ButtonProps{
    titleReset:string,
    titleSubmit:string,
    handleReset: ()=>void,
    isSubmitting:boolean
}
export const BtnLayout = ({titleReset,titleSubmit, handleReset,isSubmitting}:IProps) => {
  return (
    <>
                  <Flex
                justifyContent={"space-between"}
                flexDirection={{ base: "column-reverse", md: "row" }}
              >
                <Button
                  mt={4}
                  variant={"solid"}
                  onClick={handleReset}
                  className="item btn-form "
                >
                  {titleReset}
                </Button>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  className="btn-form"
                >
                  {titleSubmit}
                </Button>
              </Flex>
    </>
  )
}
