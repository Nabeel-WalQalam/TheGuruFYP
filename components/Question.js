import { React, useState, useEffect } from "react";
import { Collapse, Button, Tooltip, Avatar } from "@chakra-ui/react";
import { Answers } from "../components/Answer";
import {
  BsArrowDownCircle,
  BsArrowUpCircle,
  BsFillSuitHeartFill,
} from "react-icons/bs";
<link
  href="https://cdn.quilljs.com/1.0.0/quill.snow.css"
  rel="stylesheet"
></link>;
import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  Tag,
  Heading,
  Divider,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { userReducer } from "../redux/reducers/user-reducer";
import ReactHtmlParser from "react-html-parser";

import { ImArrowDown2, ImArrowUp2 } from "react-icons/im";
import { MdFavoriteBorder } from "react-icons/md";
import { TimeIcon, EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { RiArrowUpCircleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { Texteditor } from "./Texteditor";
import Link from "next/link";
export default function Home({ isPosted, question, Allanswer, question_id }) {
  const toast = useToast();
  const user = useSelector((state) => state.userReducer.currentUser);
  // console.log(Allanswer.length);
  // console.log(user);
  const [quillText, setquillText] = useState("");
  const [isposted, setisposted] = useState(false);
  const [upVote, setupVote] = useState(false);
  const [downVote, setdownVote] = useState(false);
  const [disableVotes, setdisableVotes] = useState(false);
  const Router = useRouter();

  const editHandler = () => {
    // console.log("Edit button");
  };
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  // console.log(quillText);

  const handleSubmitAnswer = async () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_Host_URL}api/postAnswer`, {
        qid: question_id,
        email: user.email,
        user: user,
        description: quillText,
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
          setisposted(true);
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
  // console.log(user._id);

  // useEffect(() => {
  //   if (user) {
  //     if (Allanswer) {
  //       // console.log(Allanswer);
  //       Allanswer[0].question_id.upVote.map((items) => {
  //         if (items == user._id) {
  //           // isPosted(true);
  //           setupVote(true);
  //         }
  //       });
  //       Allanswer[0].question_id.downVote.map((items) => {
  //         if (items == user._id) {
  //           // isPosted(true);
  //           setdownVote(true);
  //         }
  //       });
  //     }
  //   }
  // }, [user]);

  const handleupVote = async (question_key, text) => {
    // console.log(question_id, text);
    axios
      .post(`${process.env.NEXT_PUBLIC_Host_URL}api/postUpVote`, {
        qid: question_id,
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
              setdownVote(false);
            }
          } else {
            if (downVote) {
              setdownVote(false);
            } else {
              setdownVote(true);
              setupVote(false);
            }
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

  console.log("question of user", question);

  return (
    <>
      {Allanswer && (
        <Box>
          <Box
            // boxShadow={"rgba(99, 93, 255, 0.1) 0px 8px 20px"}
            p="6"
            borderRadius={"8px"}
            w={"80%"}
            mx="auto"
            mt="3rem"
            bg={"white"}
            border="1px"
            borderColor={`guru.100`}
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
                // border={"1px"}
                justify="space-between"
                align={"center"}
                // alignContent="center"
              >
                <Box
                  // mx={"5"}
                  // ml={"2rem"}
                  display={"inherit"}
                  // border={"1px black solid"}
                >
                  {question && question[0].user.profileImage ? (
                    <>
                      <Image
                        borderRadius="full"
                        boxSize="30px"
                        src="https://bit.ly/dan-abramov"
                        alt="Dan Abramov"
                      />
                      <Box
                        textTransform="Capitalize"
                        fontSize="lg"
                        ml={"2"}
                        // color="black"
                        fontWeight={"bold"}
                      >
                        {question[0].user ? question[0].user.name : ""}
                      </Box>
                    </>
                  ) : (
                    <>
                      <Avatar
                        boxSize="30px"
                        name={question[0] && question[0].user.name}
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                      <Box
                        textTransform="Capitalize"
                        fontSize="lg"
                        ml={"2"}
                        // color="black"
                        fontWeight={"bold"}
                      >
                        {question[0].user ? question[0].user.name : ""}
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
                    {new Date(Allanswer[0]?.post_date).toLocaleString()}
                  </Center>
                </Box>
              </Flex>

              {/* Second Box */}

              <Flex
                // border="1px"
                // borderColor={"black"}
                // width="90%"
                // my={"15px"}
                w={"100%"}
                direction={"row"}
              >
                <Box
                  pt={"1rem"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-around"}
                  alignContent="center"
                  alignItems={"center"}
                  // border={"1px"}
                  // width="20"
                  my={"auto"}
                  mx={"4"}
                  // mt={"4"}
                  // height={"200px"}
                  gap={"1rem"}
                >
                  <Tooltip label="up vote">
                    <Button variant={"none"} isDisabled={disableVotes}>
                      <BsArrowUpCircle
                        fontSize={"2rem"}
                        fontWeight={"bold"}
                        fill={upVote ? "purple" : "black"}
                        onClick={() => handleupVote(Allanswer[0]._id, "upVote")}
                        className="ArrowUp"
                      />
                    </Button>
                  </Tooltip>
                  <Text fontSize={"1.5rem"} fontWeight={"semibold"}>
                    {Allanswer[0].question_id
                      ? Allanswer[0].question_id.upVote.length -
                        Allanswer[0].question_id.downVote.length
                      : Allanswer[0].upVote.length -
                        Allanswer[0].downVote.length}
                  </Text>
                  <Tooltip label="down vote">
                    <Button isDisabled={disableVotes} variant={"none"}>
                      <BsArrowDownCircle
                        fontSize={"2rem"}
                        fontWeight={"bold"}
                        fill={downVote ? "red" : "gray"}
                        className="ArrowUp"
                        onClick={() =>
                          handleupVote(Allanswer[0]._id, "downVote")
                        }
                      />
                    </Button>
                  </Tooltip>
                  {/* <BsFillSuitHeartFill
                    size={"35px"}
                    color="lightgray"
                    className="heartIcon"
                    // style={{   color: "#635DFF" }}
                  /> */}
                </Box>

                <Flex
                  // border={"1px"}
                  // w={"90%"}
                  direction={"column"}
                  justify="center"
                >
                  <Heading as="h2" size={"md"} mt="5">
                    {Allanswer[0].title
                      ? Allanswer[0].title
                      : Allanswer[0].question_id.title}
                  </Heading>
                  <Box
                    // width={"90%"}
                    bg="gray.50"
                    padding={"4"}
                    borderRadius={"8"}
                  >
                    <Box P="1rem">
                      {Allanswer[0].description
                        ? ReactHtmlParser(Allanswer[0].description)
                        : ReactHtmlParser(Allanswer[0].question_id.description)}
                    </Box>
                  </Box>
                  <Flex my="3" gap={"0.5rem"}>
                    {Allanswer[0].tags
                      ? Allanswer[0].tags.map((tag) => {
                          return (
                            <Tag
                              mx={"0.5rem"}
                              key={tag}
                              bg="#635DFF"
                              color={"white"}
                              px="0.7rem"
                              py={"0.5rem"}
                            >
                              {tag}
                            </Tag>
                          );
                        })
                      : Allanswer[0].question_id.tags.map((tag) => {
                          return (
                            <Tag key={tag} bg="#635DFF" color={"white"} p="2">
                              {tag}
                            </Tag>
                          );
                        })}
                  </Flex>
                </Flex>
              </Flex>

              {/* Third Box */}
            </Flex>
          </Box>
        </Box>
      )}

      {Allanswer[0].asnwer_description ? (
        <Heading size={"lg"} mt={"10"} ml="9rem" color={"#635DFF"}>
          {Allanswer.length} Answer
        </Heading>
      ) : (
        ""
      )}
      {Allanswer[0].asnwer_description
        ? Allanswer.map((data) => (
            <Box key={data._id}>
              {}
              <Answers isPosted={isPosted} Answers={data} />
            </Box>
          ))
        : ""}

      {user ? (
        <>
          <Heading size={"lg"} my={"10"} ml="9rem" color={"#635DFF"}>
            Submit Your Answer
          </Heading>
          <Box my={"2rem"} w={"80%"} marginInline="auto">
            <Texteditor isposted={isposted} setText={setquillText} />
          </Box>
          <Flex justify={"center"} w={"100%"} my={"2rem"}>
            <Button
              onClick={handleSubmitAnswer}
              colorScheme="guru"
              width={"20%"}
            >
              Submit
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            my={"5rem"}
            justify={"center"}
            direction={"column"}
            align={"center"}
          >
            <Text fontSize={"2rem"} color={"#153A5B"}>
              Login to Answer
            </Text>
            <Link href={"/"}>
              <Button w={"15%"} colorScheme="guru">
                Home
              </Button>
            </Link>
          </Flex>
        </>
      )}
    </>
  );
}
