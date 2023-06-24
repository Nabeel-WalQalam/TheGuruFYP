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
import { useDispatch, useSelector } from 'react-redux'
import { ADD_NEW_CHAT, SET_ACTIVE_CHAT, updateChatSession } from '../../redux/reducers/chat-reducer'
import { removechatrequests } from '../../redux/reducers/user-reducer'
import {socket} from "../../components/socketWrapper"
function FindUserModal({ children }) {
  const dispatch = useDispatch()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showloading, setshowloading] = useState(false)
  const [searchUsers, setsearchUsers] = useState([])
  const user = useSelector((state) => state.userReducer.currentUser)
  const { chatsList } = useSelector((state) => state.chatReducer)
  const activeChat = useSelector((state) => state.chatReducer.activeChat)

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

  const handleApprove = (user_id) => {
    axios.post(`${process.env.NEXT_PUBLIC_Host_URL}api/updatesessionStatus`, { user_id }, { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          const findChat = chatsList.find((i) => {
            if (i.isGroupChat) return false;
            return i.users[0]._id === user_id
          })
          dispatch(removechatrequests(user_id))
          if (findChat) {
            console.log(findChat)
            console.log("activeChat",activeChat)
            socket.emit("chat approved",{user_id,chat_id:findChat._id})
            dispatch(updateChatSession({_id:findChat._id,status:true}))
            if (activeChat?._id === findChat._id)
            {console.log("inside if")
              dispatch(SET_ACTIVE_CHAT({ chat: { ...activeChat, sessionStatus: true } }))}

          }
          else {
            dispatch(ADD_NEW_CHAT({ newChat: res.data.payload }))
            

          }
          toast({
            title: "Approved",
            status: 'success'
          });
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

  const handleReject = (user_id)=>{
    axios.post(`${process.env.NEXT_PUBLIC_Host_URL}api/rejectsession`, { user_id }, { headers: { token: localStorage.getItem('token') } })
    .then((res)=>{
      if (res.data.success) {
        dispatch(removechatrequests(user_id))
        // toast({
        //   title: "Rejected",
        //   description: res.data.payload,
        //   status: 'error',
        //   duration: 5000,
        //   isClosable: true,
        // });
        console.log(res.data)
      }
    }).catch(function (error) {
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


            {user?.chatRequests?.length > 0 ? user.chatRequests.map((r, i) => {
              return <Flex alignItems="center" mb={"10px"}>
                <Avatar size="md" name={r.name} src={r.profileImage} />
                <Box ml="4">
                  <Text fontWeight="bold">{r.name}</Text>
                </Box>
                <Flex ml="auto">
                  <Button mr="2" colorScheme="green" size="sm" border={"none"} onClick={() => handleApprove(r._id,r)}>
                    Approve
                  </Button>
                  <Button colorScheme="red" size="sm" border={"none"} onClick={() => handleReject(r._id,r)}>
                    Reject
                  </Button>
                </Flex>
              </Flex>

            })
              : <Flex alignItems="center" justifyContent={"center"} textAlign={"center"}
              width={"100%"} 
              >
                <Box>
                <Text>No Requests Yet!</Text>
                </Box>
              </Flex >



            }






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