import { React, useState, useRef, useEffect } from "react";
import { Avatar, Collapse, Textarea, Tooltip } from "@chakra-ui/react";
import { TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { Badge, Spinner } from "@chakra-ui/react";
import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  Tag,
  Heading,
  Divider,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { userReducer } from "../redux/reducers/user-reducer";
import ReactHtmlParser from "react-html-parser";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  BsArrowDownCircle,
  BsArrowUpCircle,
  BsFillReplyFill,
} from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import { socket } from "./socketWrapper";

export const Answers = ({ Answers, isPosted }) => {
  const user = useSelector((state) => state.userReducer.currentUser);
  const [show, setShow] = useState(false);
  const [disable, setdisable] = useState(false);
  const comment = useRef("");
  const handleToggle = () => setShow(!show);
  // console.log(user);
  const toast = useToast();
  const [upVote, setupVote] = useState(false);
  const [downVote, setdownVote] = useState(false);
  const [disableVotes, setdisableVotes] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // console.log(Answers);
    if (Answers.length) {
      Answers.upVote.map((items) => {
        if (items == user._id) {
          // isPosted(true);
          setupVote(true);
        }
      });
      Answers.downVote.map((items) => {
        if (items == user._id) {
          // isPosted(true);
          setdownVote(true);
        }
      });
    }
  }, [Answers, user]);

  const handleComment = async (key) => {
    if (!comment.current.value) {
      return;
    }
    console.log(key);
    setdisable(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_Host_URL}api/postComment`, {
        answer_id: key,
        email: user.email,
        user: user,
        comment_description: comment.current.value,
      })
      .then(function (response) {
        console.log("res", response);
        if (response.data.success) {
          toast({
            title: response.data.payload,
            position: "top-left",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setdisable(false);
          isPosted(true);
          comment.current.value = "";
          onClose();
          // Router.push("/");
        } else {
          toast({
            title: response.data.payload,
            status: "error",
            position: "top-left",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleanswerVote = async (answer_id, text) => {
    // console.log(answer_id, text);
    axios
      .post(`${process.env.NEXT_PUBLIC_Host_URL}api/postAnswerVote`, {
        qid: answer_id,
        text: text,
        user: user,
      })
      .then(function (response) {
        // console.log("res", response);
        if (response.data.success) {
          toast({
            title: response.data.payload,
            position: "top-left",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          if (text === "upVote") {
            if (upVote) {
              setupVote(false);
            } else {
              setupVote(true);
            }
          } else {
            if (downVote) {
              setdownVote(false);
            } else {
              setdownVote(true);
            }
            setupVote(false);
          }

          // setquillText("");
          isPosted(true);

          // Router.push("/");
        } else {
          toast({
            title: response.data.payload,
            status: "error",
            position: "top-left",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleStartChat = () => {
    socket.emit(
      "chatrequest",
      { user_id: Answers.user._id, fromUser: user },
      (res) => {
        if (res.success) {
          toast({
            title: res.msg,
            status: "success",
          });
        } else {
          toast({
            title: res.msg,
          });
        }
      }
    );
  };

  return (
    <>
      <Box
        boxShadow={"-0.5px 4px 10px -5.5px #dddddd"}
        p="6"
        rounded="lg"
        w={"80%"}
        mx="auto"
        my={"1rem"}
        bg={"white"}
        border="1px"
        borderColor={"gray.200"}
      >
        <Flex
          direction={"column"}
          // border="1px"
          // borderColor={"black"}
          align="center"
        >
          <Flex
            width="85%"
            // direction={"row"}
            justify="space-between"
            align={"center"}
            // alignContent="center"
          >
            <Box
              // mx={"5"}
              display={"inherit"}
              // border={"1px black solid"}
            >
              {Answers.user && Answers.user.profileImage ? (
                <>
                  <Image
                    borderRadius="full"
                    boxSize="30px"
                    src={Answers.user && Answers.user.profileImage}
                    alt="Dan Abramov"
                  />
                  <Box textTransform="Capitalize" fontWeight={"sm"} mx="4px">
                    {Answers ? Answers.user.name : ""}
                  </Box>
                </>
              ) : (
                <>
                  <Avatar
                    boxSize="30px"
                    name={Answers.user && Answers.user.name}
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Box textTransform="Capitalize" fontWeight={"sm"} mx="4px">
                    {Answers ? Answers.user.name : ""}
                  </Box>
                </>
              )}
            </Box>

            <Box
              mx={"5rem"}
              //  border={"1px black solid"}
            >
              <TimeIcon mr="2" />
              <Center display={"inline"}>
                {" "}
                {new Date(Answers.post_date).toLocaleString()}{" "}
              </Center>
            </Box>
          </Flex>

          {/* Second Box */}

          <Flex
            // border="1px"
            // borderColor={"black"}
            width="80%"
            direction={"row"}
            my="3"
            ml="6"
            bg={"gray.100"}
            p={"0.5rem"}
            mt="1rem"
          >
            <Box width={"95%"}>
              <Box
              //  p={"2rem"}
              >
                {Answers ? ReactHtmlParser(Answers.asnwer_description) : ""}
              </Box>
            </Box>
          </Flex>

          {/* Third Box */}

          {/* <Divider width={"60%"} my="3"></Divider> */}
        </Flex>
        <Flex
          // flexDirection={"column"}
          // border="1px"
          // borderColor={"black"}
          // width="90%"
          justify={"space-between"}
          align="center"
          mt={"3"}
        >
          <Flex
            justify={"space-between"}
            border="1"
            // direction={"column"}
            // width={"40%"}
            // ml="15"
            align={"center"}
          >
            {user && (
              <>
                <Tooltip label="up vote">
                  <Button
                    variant={"none"}
                    ml={"4rem"}
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                    // mr="5"
                    className="ArrowUp"
                    isDisabled={disableVotes}
                    onClick={() => handleanswerVote(Answers._id, "upVote")}
                  >
                    <BsArrowUpCircle
                      fontSize={"2rem"}
                      fontWeight={"bold"}
                      fill={upVote ? "purple" : "gray"}
                    />
                    {/* <Text mx={"1"} className="text">
                Up vote
              </Text> */}
                  </Button>
                </Tooltip>
                <Text
                  // bg="#635DFF"
                  fontSize={"1.5rem"}
                  fontWeight={"semibold"}
                >
                  {Answers
                    ? Answers.upVote.length - Answers.downVote.length
                    : 0}
                </Text>
                <Tooltip label="down vote">
                  <Button
                    variant={"none"}
                    isDisabled={disableVotes}
                    // mx={"5"}
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                    className="ArrowUp"
                    onClick={() => handleanswerVote(Answers._id, "downVote")}
                  >
                    <BsArrowDownCircle
                      fontSize={"2rem"}
                      fontWeight={"bold"}
                      fill={downVote ? "purple" : "gray"}
                    />
                  </Button>
                </Tooltip>
                <Flex
                  gap="1rem"
                  mx={"3"}
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  // bg="#635DFF"
                  // border={"1px"}
                  // borderColor={"gray.200"}
                  padding="1px 15px"
                  // color={"white"}
                  borderRadius={"5"}
                >
                  <Button
                    leftIcon={<BsFillReplyFill />}
                    variant={"solid"}
                    colorScheme="guru"
                    border={"none"}
                    _focus={"none"}
                    // color={"white"}
                    onClick={onOpen}
                  >
                    Add Comment
                  </Button>
                  <Button
                    colorScheme="facebook"
                    variant={"outline"}
                    // border={"none"}
                    onClick={handleStartChat}
                  >
                    Start a chat
                  </Button>

                  <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Comment</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Flex justify={"center"} direction={"column"}>
                          <Textarea
                            ref={comment}
                            placeholder="please give a valid commente"
                          />
                          <Button
                            isDisabled={disable}
                            mt={"1rem"}
                            onClick={() => handleComment(Answers._id)}
                            colorScheme="guru"
                          >
                            Add Comment
                          </Button>
                        </Flex>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="facebook" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
              </>
            )}
          </Flex>
          {/* <Box
            // border={"1"}
            display="flex"
            alignItems={"center"}
            mr="4rem"
            // bg="#635DFF"
            // borderRadius="10"
            // border={"1px"}
            // borderColor={"#635DFF"}
            // borderRadius="50"
          >
            <ViewIcon />
            <Text mx={"4"}>1090 Views</Text>
          </Box> */}
        </Flex>

        <Flex w={"90%"} marginInline={"auto"} direction={"column"}>
          {/* <Text>Comments : </Text> */}
          {Answers.commet
            ? Answers.commet.map((comments, index) => {
                return (
                  <Box key={index} my={"1rem"}>
                    <Text color={"gray.500"}>
                      {comments.comment_description} -{" "}
                      <Badge colorScheme="purple">
                        {comments.user ? comments.user.name : ""}
                      </Badge>
                    </Text>
                    <Box>
                      <Divider mt={"0.5rem"} />
                    </Box>
                  </Box>
                );
              })
            : ""}
        </Flex>
      </Box>
      {/* <Divider w={"70%"} marginInline="auto" /> */}
    </>
  );
};
