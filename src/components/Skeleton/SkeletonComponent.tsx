import { Skeleton, Stack } from "@chakra-ui/react";

interface IProps{
  isLoading:boolean
}
export const SkeletonComponent = ({isLoading=true}:IProps) => {
  return (
    <>
     {
      isLoading ?  <Stack>
      <Skeleton height="18px" mb={2} />
      <Skeleton height="18px" mb={2} />
      <Skeleton height="18px" mb={2} />
      <Skeleton height="18px" mb={2} />
      <Skeleton height="18px" mb={2} />
    </Stack> :''
     }
    </>
  );
};
