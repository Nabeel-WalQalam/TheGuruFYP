import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Button, Lorem, Box, InputGroup, InputLeftElement, Input, Flex, useToast, Avatar, Text
} from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons"
import SUprofile from './SUprofile'
import Loader from '../../Loader'
import axios from 'axios'
import { useSelector } from 'react-redux'
function FindUserModal({ children }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showloading, setshowloading] = useState(false)
  const [searchUsers, setsearchUsers] = useState([])
  const user = useSelector((state) => state.userReducer.currentUser)
  const toast = useToast();

  useEffect(() => {
    setsearchUsers([])
  }, [])

  // const handlechange = (e) => {
  //   const searchText = e.target.value;
  //   if (searchText === '') {
  //     setsearchUsers([]);
  //     return
  //   }
  //   setshowloading(true);
  //   axios.get(`${process.env.NEXT_PUBLIC_Host_URL}api/searchuser?search=${searchText}`, { headers: { token: localStorage.getItem('token') } })
  //     .then(res => {
  //       // console.log(res.data);
  //       if (res.data.success) {
  //         setsearchUsers(res.data.payload);
  //         // setnoResultsFound(true);
  //       }

  //       else {
  //         toast({
  //           title: "ERROR OCCURED",
  //           description: res.data.payload,
  //           status: 'error',
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //       setshowloading(false);
  //     }

  //     ).catch(function (error) {
  //       setshowloading(false);
  //       toast({
  //         title: error.message,
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     })
  // }

  const handleApprove=(user_id)=>{
    console.log(user_id)
    axios.post(`${process.env.NEXT_PUBLIC_Host_URL}api/updatesessionStatus`, {user_id},{ headers: { token: localStorage.getItem('token') } })
        .then(res => {
          console.log(res);
          if (res.data.success) {
          
          }
  
          else {
            toast({
              title: "ERROR OCCURED",
              description: res.data.payload,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        }
  
        ).catch(function (error) {
          toast({
            title: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        })
  }

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>


      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xl"}

      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody mt="10px">
            {/* <InputGroup >
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='guru.500' />}
              />
              <Input autoComplete="off" type={"search"} id="search" variant='filled' flexBasis={"100%"} placeholder='Search Users'
                focusBorderColor="#635dff" onChange={handlechange}
              />

            </InputGroup> */}

{user.chatRequests.map((r,i)=>{
  return   <Flex alignItems="center" mb={"10px"}>
  <Avatar size="md" name={r.name} src={r.profileImage} />
  <Box ml="4">
    <Text fontWeight="bold">{r.name}</Text>
  </Box>
  <Flex ml="auto">
    <Button mr="2" colorScheme="green" size="sm" border={"none"} onClick={()=>handleApprove(r._id)}>
      Approve
    </Button>
    <Button colorScheme="red" size="sm" border={"none"}>
      Reject
    </Button>
  </Flex>
</Flex>

})}


          



            {/* {showloading ?
              <Flex mt="10px" alignItems="center" justifyContent={"center"}>

                <Loader />
              </Flex>

              : <Flex mt="10px" maxH={"240px"} overflowY="auto" flexWrap={"wrap"} align="center" justifyContent={"center"}>
                {searchUsers.map((element, index) => {
                  return <SUprofile onClose={onClose} key={index} name={element.name} img={element.profileImage} _id={element._id} />
                }

                )}
              </Flex>} */}





          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FindUserModal