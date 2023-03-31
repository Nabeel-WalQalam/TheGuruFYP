import React, { useContext, useState } from 'react'
import {
  Avatar,
  useToast, Box, Text

} from '@chakra-ui/react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_CHAT } from '../../redux/reducers/chat-reducer';

function SUprofile({ name, img, _id, onClose }) {
  const toast = useToast();
  const user = useSelector((state) => state.userReducer.currentUser)
  const { chatsList } = useSelector((state) => state.chatReducer)
  const dispatch = useDispatch()
  const [axiosinprocess, setaxiosinprocess] = useState(false);
  const handleclick = () => {
    const findChat = chatsList.find((i) => {
      if (i.isGroupChat) return false;
      return i.users[0]._id === _id
    })
    if (findChat) {
      toast({

        description: "Chat already exists with that person",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    setaxiosinprocess(true);

    axios.post(`${process.env.NEXT_PUBLIC_Host_URL}api/accesschat`, { user_id: _id }, { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        console.log(res)
        if (res.data.success) {
          dispatch(ADD_NEW_CHAT({ newChat: res.data.payload }))
          setaxiosinprocess(false);
          onClose();
        }
        else {
          setaxiosinprocess(false);
          toast({
            title: "ERROR OCCURED",
            description: res.data.payload,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }

      }).catch(function (error) {
        setaxiosinprocess(false);
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


      <Box onClick={() => {
        if (!axiosinprocess)
          handleclick()
      }} borderRadius={"8px"} px="2" py={"1"} cursor={"pointer"} _hover={{ backgroundColor: "blue.100" }} textAlign={"center"}>
        <Avatar name={name} src={img} />
        <Text> {name}</Text>
      </Box>
    </>
  )
}

export default SUprofile