import { React, useState } from "react";
import { Collapse, Button } from "@chakra-ui/react";
import { Answers } from "../components/Answer";
import { BsFillSuitHeartFill } from "react-icons/bs";
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
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { userReducer } from "../redux/reducers/user-reducer";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

import { ImArrowDown2, ImArrowUp2 } from "react-icons/im";
import { MdFavoriteBorder } from "react-icons/md";
import { TimeIcon, EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { Texteditor } from "../Components/Texteditor.js";
export default function Home({ question_id, Allanswer }) {
  const toast = useToast();
  const user = useSelector((state) => state.userReducer.currentUser);
  // console.log(Allanswer.length);
  // console.log(user);
  const [quillText, setquillText] = useState("");
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

  return (
    <>
      {Allanswer &&
        Allanswer.map((data) => (
          <Box key={data._id}>
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
                  width="100%"
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
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                      // mr="2"
                      ml={"14"}
                    />
                    <Center
                      fontSize="lg"
                      ml={"2"}
                      // color="black"
                      fontWeight={"bold"}
                    >
                      {data.user.name ? data.user.name : ""}
                    </Center>
                  </Box>
                  <Box
                    mx={"5rem"}
                    //  border={"1px black solid"}
                  >
                    <TimeIcon mr="2" />
                    <Center display={"inline"}>{}</Center>
                  </Box>
                </Flex>

                {/* Second Box */}

                <Flex
                  // border="1px"
                  // borderColor={"black"}
                  // width="90%"
                  // my={"15px"}
                  direction={"row"}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-around"}
                    alignContent="center"
                    alignItems={"center"}
                    // border={"1px"}
                    width="20"
                    mx={"5"}
                    mt={"4"}
                  >
                    <ImArrowUp2 className="ArrowUp" />
                    <Text fontWeight={"semibold"}>
                      {data.question_id ? data.question_id.votes : 2}
                    </Text>
                    <ImArrowDown2 className="ArrowUp" />
                    <BsFillSuitHeartFill
                      size={"25px"}
                      color="lightgray"
                      className="heartIcon"
                      // style={{   color: "#635DFF" }}
                    />
                  </Box>

                  <Flex direction={"column"} justify="center">
                    <Heading as="h2" size={"md"} mt="5">
                      {data.question_id.title ? data.question_id.title : ""}
                    </Heading>
                    <Box
                      width={"90%"}
                      bg="gray.50"
                      padding={"4"}
                      borderRadius={"8"}
                    >
                      <Collapse startingHeight={50} in={show}>
                        {data.question_id.description
                          ? ReactHtmlParser(data.question_id.description)
                          : ""}
                      </Collapse>
                      <Text fontWeight={"bold"} onClick={handleToggle}>
                        Show{show ? " Less " : " More "}
                      </Text>
                    </Box>
                    <Box my="3">
                      {data.question_id.tags
                        ? data.question_id.tags.map((tag) => {
                            return (
                              <Tag key={tag} bg="#635DFF" color={"white"} p="2">
                                {tag}
                              </Tag>
                            );
                          })
                        : ""}
                    </Box>
                  </Flex>
                </Flex>

                {/* Third Box */}

                <Flex
                  // border="1px"
                  // borderColor={"black"}
                  width="90%"
                  justify={"space-between"}
                  align="center"
                  mt={"3"}
                >
                  <Flex
                    justify={"space-around"}
                    // border="10"
                    // width={"10%"}
                    // ml="15"
                    align={"center"}
                  >
                    <Box
                      onClick={editHandler}
                      ml={"0.7rem"}
                      display={"flex"}
                      justifyContent="center"
                      alignItems={"center"}
                      className="editIcon"
                    >
                      <EditIcon />
                      <Text mx={"1"}>Edit</Text>
                      <Divider orientation="vertical" />
                    </Box>
                    <Box
                      mx={"5"}
                      display={"flex"}
                      justifyContent="center"
                      alignItems={"center"}
                      className="editIcon2"
                    >
                      <DeleteIcon />
                      <Text ml={"1"}>Delete</Text>
                    </Box>
                  </Flex>
                  <Box
                    // border={"1"}
                    display="flex"
                    alignItems={"center"}
                    mr="2rem"
                    // bg="#635DFF"
                    // borderRadius="10"
                    // border={"1px"}
                    // borderColor={"#635DFF"}
                    // borderRadius="50"
                  >
                    <ViewIcon />
                    <Text mx={"2"}>
                      {data.question_id.views
                        ? data.question_id.views.count
                        : 0}
                      Views
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Divider mt="5" width="10%" mx="auto"></Divider>
            </Box>
            <Heading size={"lg"} mt={"10"} ml="9rem" color={"#635DFF"}>
              {data ? data.length : 0} Answer
            </Heading>

            <Answers />
            <Answers />
            <Answers />
            <Heading size={"lg"} my={"10"} ml="9rem" color={"#635DFF"}>
              Submit Your Answer
            </Heading>

            <Box my={"2rem"} w={"80%"} marginInline="auto">
              <Texteditor setText={setquillText} />
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
          </Box>
        ))}
    </>
  );
}
