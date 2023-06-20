import {
    Box,
    CloseButton,
    Flex,
    Text,
    Divider,
    Avatar,
    AvatarBadge,
    Input,
    IconButton,
    useToast,
    VStack,
    HStack,
    Badge,
    Button
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPEND_ACTIVE_CHAT_MESSAGES, SET_ACTIVE_CHAT, SET_ACTIVE_CHAT_MESSAGES, SET_CHATS_LIST, updateChatSession } from "../../redux/reducers/chat-reducer";
import { AiOutlineSend } from "react-icons/ai";
import { socket } from "../socketWrapper";
import LoadingBar from 'react-top-loading-bar'
import getTime from "../../utils/getTime";
import Loader from "../../Loader";

function ChatBox({ onToggle, setopenChatbox, openChatbox }) {
    const { chatsList, activeChat, activeChatMessages } = useSelector(
        (state) => state.chatReducer
    );
    const dispatch = useDispatch()
    const [progress2, setProgress2] = useState(0)
    const toast = useToast()
    const user = useSelector((state) => state.userReducer.currentUser);
    const apiLoading = useSelector(state => state.chatReducer.apiLoading)
    const msgfield = useRef()


    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const sendMsg = (e) => {


        const msg = msgfield.current.value;
        if (msg.length === 0) return;
        if(activeChat.sessionStatus === false){
            toast({
                title:"Can't send message",
                description:"Session is closed"
            })
            return;
        }
        msgfield.current.disabled = true;
        setProgress2(20);
        axios.post(`${process.env.NEXT_PUBLIC_Host_URL}api/sendmsg`, { chat_id: activeChat._id, msg }, { headers: { token: localStorage.getItem("token") } })
            .then(res => {
                // console.log(res.data)
                if (res.data.success) {
                    setProgress2(60);
                    const msg = {
                        chat: res.data.payload.chat._id,
                        createdAt: res.data.payload.createdAt,
                        messege: res.data.payload.messege,
                        sender: res.data.payload.sender,
                        _id: res.data.payload._id

                    }
                    dispatch(APPEND_ACTIVE_CHAT_MESSAGES({ message: msg }))
                    setProgress2(90);
                    const newState = chatsList.map(element => {

                        if (element._id === msg.chat) {
                            return { ...element, latestMessage: { messege: msg.messege, createdAt: msg.createdAt } }

                        }

                        return element
                    });
                    dispatch(SET_CHATS_LIST({ chats: newState }))

                    setProgress2(100);
                    msgfield.current.value = "";
                    if (socket.connected) {

                        socket.emit("new message", res.data.payload);

                    }
                    else {

                        toast({
                            title: "SOCKET NOT CONNECTED",
                            status: 'error',
                        });
                    }
                }
                else {
                    toast({
                        title: "ERROR OCCURED",
                        description: res.data.payload,
                    });
                }
            }).catch(function (error) {
                toast({
                    title: error.message
                });
            })







    }

    const handleEndSession=()=>{
        if(activeChat.sessionStatus === false){
            toast({
                title:"Session Already Closed",
                status:"warning"
            })
            return
        }
        socket.emit("endSession",{chat_id:activeChat._id,user_id:activeChat.users[0]._id},(res)=>{
            if(res.success){
                toast({
                    title:"Session Closed",
                    status:"success"
                })
                dispatch(SET_ACTIVE_CHAT({chat:{...activeChat,sessionStatus:false}}))
                dispatch(updateChatSession({_id:activeChat._id,status:false}))

            }
            else{
                toast({
                    title:"Error",
                    description:"Network Error",
                })
            }
        })
    }
    return (
        <Box
            borderRadius={"8px"}
            bg="white"
            h="400px"
            w="350px"
            position={"relative"}
        // display={openChatbox?"block": "none"}
        >
            <CloseButton
                onClick={() => {
                    onToggle(), setopenChatbox(false);
                    dispatch(SET_ACTIVE_CHAT_MESSAGES([]))
                    dispatch(SET_ACTIVE_CHAT({ chat: null }))
                }}
                size="md"
                position={"absolute"}
                right="0px"
            />

            {/* message box start below */}
            <Box
                h="100%"
                w={"100%"}
                px="12px"
                pt={"5px"}
                border={"1px"}
                borderColor={"#ededed"}
                borderRadius={"8px"}
            >
                <Flex w="100%">
                    <Avatar size="lg" name={activeChat?.users[0].name}>
                        <AvatarBadge boxSize="1.25em" bg="red.500" />
                    </Avatar>
                    <Flex flexDirection="column" mx="5" justify="center">
                        <Text fontSize="lg" fontWeight="bold">
                            {activeChat?.users[0].name}
                        </Text>
                        {activeChat?.sessionStatus ? 
                        <Badge variant='solid' colorScheme='green'>session: Open</Badge>
                        :
                        <Badge variant='solid' colorScheme='red'>session: Closed</Badge>
                    }

                   
                        
                    </Flex>

                    {user._id === activeChat?.admin &&<Button onClick={handleEndSession} size={"xs"} variant={"outline"} colorScheme="red" 
                    mt="33px"
                    >End Session</Button>}
                </Flex>
                <Divider borderBottomWidth="3px" color="black" mt="5" />

                <>
                    <Flex
                        w="100%"
                        h={"67%"}
                        overflowY="auto"
                        flexDirection="column"
                        p="3"

                    >
                        {apiLoading ?
                            <Box h={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                <Loader />
                            </Box>
                            :

                            user && activeChatMessages?.map((msg, i) => {

                                if (user._id === msg.sender._id) {

                                    return (
                                        <Flex w="100%" justify="flex-end" key={i}>
                                            <Flex
                                                flexDirection={"column"}
                                                position="relative"
                                                bg="guru.500"
                                                color="white"
                                                minW="100px"
                                                maxW="350px"
                                                borderRadius={"8px"}
                                                my="1"
                                                // p="3"
                                                px={"3"}
                                                pt="1"
                                            >
                                                <Text>{msg.messege}</Text>
                                                <Text alignSelf={"end"} fontSize={["10px", "12px"]}>
                                                    {getTime(msg.createdAt)}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    );
                                } else {
                                    return (
                                        <Flex w="100%" key={i}>
                                            <Avatar name="hunfa" size={"sm"}>
                                                {" "}
                                            </Avatar>

                                            <Flex
                                                ml={"5px"}
                                                flexDirection={"column"}
                                                bg="gray.100"
                                                color="black"
                                                borderRadius={"8px"}
                                                minW="100px"
                                                maxW="350px"
                                                px={"3"}
                                                pt={1}
                                                my="1"
                                            >
                                                <Text>{msg.messege}</Text>
                                                <Text alignSelf={"end"} fontSize={["10px", "12px"]}>
                                                    {getTime(msg.createdAt)}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    );
                                }
                            })

                        }

                        < AlwaysScrollToBottom />


                    </Flex>

                    <Box h="35px" p={"0px"}>
                        <Flex w="100%" justifyContent={"space-between"} h="100%" >
                            <VStack position='relative' spacing={0} flexBasis="84%" h="47px">
                                <LoadingBar

                                    color='#635dff'
                                    waitingTime="100"
                                    // loaderSpeed="1000"
                                    progress={progress2}
                                    containerStyle={{
                                        position: 'absolute', width: "98%", borderRadius: "50px",

                                        visibility: progress2 === 0 ? "hidden" : "",
                                        marginLeft: "4px"
                                    }}
                                    onLoaderFinished={() => { setProgress2(0); msgfield.current.disabled = false; msgfield.current.focus(); }}
                                />
                                <Input

                                    autoComplete="off"

                                    flexBasis={"84%"}
                                    placeholder="Type Something..."
                                    variant={"filled"}
                                    border={"none"}
                                    borderRadius="8px"
                                    _focus={{
                                        bg: "gray.200",
                                    }}
                                    _hover={{
                                        bg: "gray.200",
                                    }}
                                    id="msgInput"
                                    ref={msgfield}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter')
                                            sendMsg(e)
                                    }}
                                />
                            </VStack>

                            <IconButton icon={<AiOutlineSend />} isDisabled={progress2 !== 0} colorScheme={"guru"} borderRadius="8px" onClick={sendMsg} />
                        </Flex>
                    </Box>
                </>
            </Box>



        </Box>
    );
}

export default ChatBox;
