import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure,Button,Lorem, Box,InputGroup,InputLeftElement,Input,Flex
  } from '@chakra-ui/react'
  import { SearchIcon } from "@chakra-ui/icons"
import SUprofile from './SUprofile'
function FindUserModal({children}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

// console.log(children.props[0])
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>


      <Modal onClose={onClose} isOpen={isOpen} isCentered  size={"xl"}
      
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody mt="10px">
          <InputGroup >
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='guru.500' />}
              />
              <Input  autoComplete="off" type={"search"}  id="search" variant='filled' flexBasis={"100%"} placeholder='Search Users'
              focusBorderColor="#635dff"
              />
              
            </InputGroup>



            <Flex mt="10px" maxH={"240px"} overflowY="auto" flexWrap={"wrap"}     align="center" justifyContent={"center"}>  

             
                 <SUprofile name="Hunfa Jalil"/>
                 <SUprofile name="Nabeel"/>
                 <SUprofile name="Sharaiz"/>
            
              
            </Flex>

          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FindUserModal