import {
    Box,
    CloseButton,
    Flex,
    Text,
    Divider,
    Button,
    Avatar,
    AvatarBadge,
    Input,
    AvatarGroup,
    IconButton,
    useToast,
    Center,
    HStack,
    Image,
    Progress,
    VStack,
    useMediaQuery,
    useColorMode,
    useColorModeValue,
    border,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPEND_ACTIVE_CHAT_MESSAGES, SET_ACTIVE_CHAT_MESSAGES } from "../../redux/reducers/chat-reducer";

function ChatBox({ onToggle, setopenChatbox, openChatbox }) {
    const { chatsList, activeChat, activeChatMessages } = useSelector(
        (state) => state.chatReducer
    );
    const dispatch = useDispatch()
    const toast = useToast()
    const user = useSelector((state) => state.userReducer.currentUser);
    const msgfield = useRef('')


    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const sendMsg = (e) => {
        const msg = msgfield.current.value;
        if (msg.length === 0) return;

        axios.post(`${process.env.NEXT_PUBLIC_Host_URL}api/sendmsg`, { chat_id: activeChat._id, msg }, { headers: { token: localStorage.getItem("token") } })
            .then(res => {
                // console.log(res.data)
                if (res.data.success) {
                    const msg = {
                        chat: res.data.payload.chat._id,
                        createdAt: res.data.payload.createdAt,
                        messege: res.data.payload.messege,
                        sender: res.data.payload.sender,
                        _id: res.data.payload._id

                    }
                    dispatch(APPEND_ACTIVE_CHAT_MESSAGES({ message: msg }))


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

        msgfield.current.value = "";





    }
    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    const gettime = (time) => {
        let t = tConvert(new Date(time).toLocaleTimeString())
        let [h, m, s] = t.split(":")
        let [se, p] = s.split(" ")
        let ti = h + ":" + m + " " + p;
        return ti;
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
                        <Text color={"red.500"}>Offline</Text>
                    </Flex>
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
                        {activeChatMessages?.map((msg, i) => {
                            if (user._id !== msg.sender) {
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
                                                {gettime(msg.createdAt)}
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
                                                {gettime(msg.createdAt)}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                );
                            }
                        })}
                        <AlwaysScrollToBottom />
                    </Flex>

                    <Box h="35px" p={"0px"}>
                        <Flex w="100%" justifyContent={"space-between"} h="100%">
                            <Input
                                autoComplete="off"
                                h="100%"
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

                            <Box w="8px"></Box>

                            <Box w="8px"></Box>
                            <Button h="100%" colorScheme={"guru"} borderRadius="8px" onClick={sendMsg}>
                                Send
                            </Button>
                        </Flex>
                    </Box>
                </>
            </Box>
        </Box>
    );
}

export default ChatBox;
