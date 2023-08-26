import { Skeleton, Stack } from "@chakra-ui/react";

interface IProps{
  isLoading:boolean
}
export const SkeletonComponent = ({isLoading=true}:IProps) => {
  return (
    <>
     {
      isLoading ?  <Stack  zIndex={10}>
      <Skeleton height="18px" mb={2}backgroundColor={"#ccc"} />
      <Skeleton height="18px" mb={2} />
      <Skeleton height="18px" mb={2} />
      <Skeleton height="18px" mb={2} />
      <Skeleton height="18px" mb={2} />
    </Stack> :''
     }
    </>
  );
};
