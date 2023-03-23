import React from 'react'
import {
   Avatar,
    useToast,Box,Text
 
  } from '@chakra-ui/react'


function SUprofile({name}) {
 

  return (
    <>
  
  
   <Box borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{backgroundColor:"blue.100"}} textAlign={"center"}>
   <Avatar name={name}  />
   <Text> {name}</Text>
</Box>
</>
  )
}

export default SUprofile