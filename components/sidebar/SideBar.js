import React, { useRef, useState, useEffect } from 'react'
import { Box, Button, Icon, ScaleFade, useDisclosure, useToast } from '@chakra-ui/react'
import ChatBox from './ChatBox'
import { BiSearchAlt } from "react-icons/bi";
import MyChats from './MyChats';
import FindUserModal from './FindUserModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SET_CHATS_LIST } from "../../redux/reducers/chat-reducer"
function SideBar() {

  const initialRender = useRef(true)
  const [openSidebar, setopenSidebar] = useState(false)
  const [openChatbox, setopenChatbox] = useState(false)
  const { chatsList, activeChat } = useSelector((state) => state.chatReducer)
  const user = useSelector((state) => state.userReducer.currentUser)
  const [selectedChat, setselectedChat] = useState()
  const { isOpen, onToggle } = useDisclosure()
  const dispatch = useDispatch();
  const toast = useToast()

  let sideStyles = {
    position: "fixed",
    right: "0px",
    top: "0px",
    zIndex: 500,
    backgroundColor: "white",
    width: "300px",
    height: "100vh",
    transition: "all 0.3s",
    transform: openSidebar ? "translateX(0px)" : "translateX(100%)"
  }


  const fetchChats = () => {

    axios.get(`${process.env.NEXT_PUBLIC_Host_URL}api/getallchats`, {
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        if (res.data.success) {
          dispatch(SET_CHATS_LIST({ chats: res.data.payload }))
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

  useEffect(() => {
    fetchChats();
  }, [])


  useEffect(() => {

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (openChatbox) {
        onToggle();
        // setopenSidebar(false)
      }
    }


  }, [openChatbox])



  return (
    <>

      <Box style={sideStyles} >
        <Box mt="100px">

          <FindUserModal>
            <Button colorScheme={"guru"} display="block" mx="auto" w="180px" ><Icon as={BiSearchAlt} position="absolute" left={"10px"} boxSize="23px" top="8px" /> Find Users</Button>
          </FindUserModal>

        </Box>


        <Box pt="20px">
          {/* <MyChats setopenChatbox={setopenChatbox} setselectedChat={setselectedChat} />
 
  <MyChats  setopenChatbox={setopenChatbox} setselectedChat={setselectedChat}/>
  <MyChats  setopenChatbox={setopenChatbox} setselectedChat={setselectedChat}/> */}
          {chatsList.map((chat) => {
            return (
              <Box key={chat._id}>
                <MyChats setopenChatbox={setopenChatbox} setselectedChat={setselectedChat} name={chat.users[0].name} chat={chat} />
              </Box>
            )
          })}

        </Box>




        <Button position={"fixed"} colorScheme="guru" borderRadius={"full"} px="5" height={"34px"} left="-84px" bottom={"100px"} onClick={() => { setopenSidebar(!openSidebar) }} >Chats</Button>


        <Box position={"absolute"} bottom="0px" left={"-450px"}>
          <ScaleFade in={isOpen} initialScale={0.9} unmountOnExit={true}>
            <ChatBox onToggle={onToggle} setopenChatbox={setopenChatbox} openChatbox={openChatbox} activeChat={activeChat} />
          </ScaleFade>
        </Box>


      </Box>

    </>
  )
}

export default SideBar