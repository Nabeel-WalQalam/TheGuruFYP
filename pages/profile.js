import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Text,
  Badge,
  Divider,
  Avatar,
  Button,
  useToast,
  Center,
  UnorderedList,
  ListItem,
  ListIcon,
  List,
} from "@chakra-ui/react";
import { GiRank1, GiRank2, GiRank3 } from "react-icons/gi";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiMessageSquareCheck, BiUser } from "react-icons/bi";
import { FaMedal } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { MdCheckCircle } from "react-icons/md";

export default function Profile() {
  const toast = useToast();
  const [userQuestion, setuserQuestion] = useState([]);
  const [rank1, setrank1] = useState(false);
  const [rank2, setrank2] = useState(false);
  const [rank3, setrank3] = useState(false);
  const [questionDeleted, setquestionDeleted] = useState(false);
  useEffect(() => {
    const getAllQuestion = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_Host_URL}api/getAllQuestion`
        );
        let allQuestion = response.data.payload.data;
        const userId = localStorage.getItem("userId");
        const userQuestion = allQuestion.filter((items) => {
          return items.user._id == userId;
        });
        console.log(allQuestion, userQuestion);
        setuserQuestion(userQuestion);
      } catch (error) {
        console.error(error);
      }
    };
    getAllQuestion();
  }, [questionDeleted]);

  useEffect(() => {
    if (userQuestion) {
      userQuestion.map((items) => {
        if (items.upVote.length >= 1 || items.upVote.length < 5) {
          setrank1(true);
        } else if (items.upVote.length >= 5 || items.upVote.length < 10) {
          setrank2(true);
        } else {
          setrank3(true);
        }
      });
    }
  }, [userQuestion]);

  const handleQuestionDelete = (key) => {
    console.log("delete", key);
    axios
      .delete(`${process.env.NEXT_PUBLIC_Host_URL}api/deleteQuestion/${key}`)
      .then((response) => {
        console.log("Item deleted successfully.", response);
        if (response.data.success) {
          toast({
            title: "Question deleted successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setquestionDeleted(!questionDeleted);
        }
        // Perform any additional actions upon successful deletion
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        // Handle any errors that occurred during deletion
      });
  };

  return (
    <>
      <Box my="3rem">
        <Flex align="center" justify="center" gap="2rem" mt="5rem">
          <Flex
            direction={"column"}
            justify={"space-between"}
            borderTop="1px"
            p={2}
            borderTopWidth="5px"
            bg="white"
            borderColor="#6F6CFB"
            purple
            boxShadow={"base"}
            w="20%"
            height="300px"
          >
            <Flex pos={"relative"} direction={"column"}>
              <Avatar
                boxShadow={"base"}
                border="1px"
                borderColor={"gray.100"}
                pos={"absolute"}
                top={"-60px"}
                left="5.5rem"
                boxSize={"100px"}
                // border={"1px"}
                // borderColor="gray.100"
                name={
                  localStorage.getItem("profileImage")
                    ? localStorage.getItem("profileImage")
                    : localStorage.getItem("username")
                }
                src={
                  localStorage.getItem("profileImage")
                    ? localStorage.getItem("profileImage")
                    : "#"
                }
              />
              <Text
                mt="3rem"
                fontWeight={"bold"}
                fontSize={"1.5rem"}
                // border={"1px"}
              >
                {localStorage.getItem("username")
                  ? localStorage.getItem("username")
                  : "--"}
              </Text>
              <Text color={"gray.400"} noOfLines={3}>
                {localStorage.getItem("bio")
                  ? localStorage.getItem("bio")
                  : "--"}
              </Text>
            </Flex>
            <Flex
              direction="column"
              gap="0.5rem"
              p={2}
              width="95%"
              mx="auto"
              bg="gray.100"
            >
              <Flex justify={"space-between"} align={"center"}>
                <Box fontWeight={"bold"}>Status</Box>
                <Badge p={2} colorScheme="facebook">
                  Active
                </Badge>
              </Flex>
              <Divider
                my="0.5rem"
                borderColor={"#153A5B"}
                borderWidth={"2px"}
                width={"95%"}
                mx="auto"
              />
              <Flex justify={"space-between"} align={"center"}>
                <Box fontWeight={"bold"}>Member Since</Box>
                <Text>
                  {localStorage.getItem("join") && localStorage.getItem("join")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Box p={4} bg="white" boxShadow={"base"} w="70%" height="300px">
            <Button fontSize={"1.2rem"} leftIcon={<BiUser />} variant={"none"}>
              About
            </Button>
            <Flex justify={"center"} gap={"5rem"} mt="1rem" align={"center"}>
              <Flex
                color={"gray.700"}
                direction={"column"}
                gap="1rem"
                width={"45%"}
                justify={"space-between"}
                p={4}
                // border={"1px"}
              >
                <Flex justify={"space-between"} align={"center"}>
                  <Box fontWeight={"semibold"}>Name</Box>
                  <Box>
                    {localStorage.getItem("username")
                      ? localStorage.getItem("username")
                      : "--"}
                  </Box>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                  <Box fontWeight={"semibold"}>Gender</Box>
                  <Box>
                    {localStorage.getItem("gender")
                      ? localStorage.getItem("gender")
                      : "--"}
                  </Box>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                  <Box fontWeight={"semibold"}>Email</Box>
                  <Box>{localStorage.getItem("email")}</Box>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                  <Box fontWeight={"semibold"}>City</Box>
                  <Box>
                    {localStorage.getItem("city")
                      ? localStorage.getItem("city")
                      : "--"}
                  </Box>
                </Flex>
              </Flex>
              <Flex
                color={"gray.700"}
                direction={"column"}
                gap="1rem"
                width={"45%"}
                justify={"space-between"}
                p={4}
                // border={"1px"}
              >
                <Flex justify={"space-between"} align={"center"}>
                  <Box fontWeight={"semibold"}>Institude</Box>
                  <Box>
                    {localStorage.getItem("institude")
                      ? localStorage.getItem("institude")
                      : "--"}
                  </Box>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                  <Box fontWeight={"semibold"}>Student</Box>
                  <Box>
                    {localStorage.getItem("student")
                      ? localStorage.getItem("student")
                      : "--"}
                  </Box>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                  <Box fontWeight={"semibold"}>Birthday</Box>
                  <Box>--</Box>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                  <Box fontWeight={"semibold"}>Website</Box>
                  <Box>--</Box>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Flex align="center" justify="center" gap="2rem" mt="5rem">
          <Flex
            direction={"column"}
            // justify={"space-between"}
            borderTop="1px"
            p={2}
            borderTopWidth="5px"
            bg="white"
            borderColor="#6F6CFB"
            purple
            boxShadow={"base"}
            w="20%"
            height="300px"
          >
            <Center fontWeight={"bold"} fontSize={"1.2rem"}>
              <Button border={"none"} variant={"none"} leftIcon={<FaMedal />}>
                Profile Rank
              </Button>
            </Center>
            <Box fontSize={"2rem"}>
              {rank1 ? (
                <Button rightIcon={<GiRank1 />} variant={"none"}>
                  Silver
                </Button>
              ) : rank2 ? (
                <Button rightIcon={<GiRank2 />} variant={"none"}>
                  Gold
                </Button>
              ) : rank3 ? (
                <Button rightIcon={<GiRank3 />} variant={"none"}>
                  Platinum
                </Button>
              ) : (
                <Text my="1rem">No Rank yet</Text>
              )}
            </Box>
            <Box width={"100%"}>
              <List fontSize={"0.9rem"} color="gray.600">
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Votes on question must be grater than 5
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Should be able to comment on other answers
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Give valid answer to other question
                </ListItem>
              </List>
            </Box>
          </Flex>
          <Box p={4} bg="white" boxShadow={"base"} w="70%" height="300px">
            <Button
              fontSize={"1.2rem"}
              leftIcon={<BiMessageSquareCheck />}
              variant={"none"}
            >
              My Question
            </Button>

            {userQuestion.length ? (
              <>
                <TableContainer>
                  <Table variant="striped" colorScheme="facebook">
                    <TableCaption>List of all Question</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th>States</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {userQuestion &&
                        userQuestion.map((items) => {
                          return (
                            <Tr key={items._id}>
                              <Td>{items.title}</Td>
                              <Td>
                                {
                                  <Flex
                                  // border={"1px"}
                                  >
                                    <Box
                                      className="sideIcon"
                                      // border={"1px"}
                                      // borderColor="gray.300"
                                      p={"3"}
                                      borderRadius="8px"
                                      display="flex"
                                      flexDirection={"column"}
                                      alignItems="center"
                                      // mx={"0.5rem"}
                                      // cursor="pointer"
                                    >
                                      <Text>
                                        {items
                                          ? items.upVote.length -
                                            items.downVote.length
                                          : 0}
                                      </Text>
                                      <Text>Votes</Text>
                                      <AiFillLike />
                                      {/* <Image>xyz</Image> */}
                                    </Box>
                                    {/* <Divider orientation="vertical" ></Divider> */}

                                    <Box
                                      // cursor="pointer"
                                      // border={"1px"}
                                      className="sideIcon"
                                      display="flex"
                                      // border={"1px"}
                                      // borderColor="gray.300"
                                      p={"3"}
                                      borderRadius="8px"
                                      flexDirection={"column"}
                                      alignItems="center"
                                      mx={"0.9rem"}
                                    >
                                      <Text>
                                        {items.views.count
                                          ? items.views.count
                                          : 0}
                                      </Text>
                                      <Text>Views</Text>
                                      {/* <Image>xyz</Image> */}
                                      <ViewIcon />
                                    </Box>
                                    <Box
                                      // cursor="pointer"
                                      className="sideIcon"
                                      // border={"1px"}
                                      display="flex"
                                      // border={"1px"}
                                      // borderColor="gray.300"
                                      p={"3"}
                                      borderRadius="8px"
                                      flexDirection={"column"}
                                      alignItems="center"
                                      mx={"0.5rem"}
                                    >
                                      <Text>
                                        {items.answers ? items.answers : 0}
                                      </Text>
                                      <Text>Answers</Text>
                                      <RiMessage3Fill />
                                      {/* <Image>xyz</Image> */}
                                    </Box>
                                  </Flex>
                                }
                              </Td>
                              <Td>
                                <Flex
                                  // justify={"space-around"}
                                  // border="10"
                                  // width={"10%"}
                                  // ml="15"
                                  align={"center"}
                                >
                                  <Flex
                                    // onClick={editHandler}
                                    // ml={"0.7rem"}
                                    // display={"flex"}
                                    justifyContent="center"
                                    alignItems={"center"}
                                    className="editIcon"
                                  >
                                    <EditIcon />
                                    <Text mx={"1"}>Edit</Text>
                                  </Flex>
                                  <Box
                                    mx={"5"}
                                    display={"flex"}
                                    justifyContent="center"
                                    alignItems={"center"}
                                    className="editIcon2"
                                    onClick={() =>
                                      handleQuestionDelete(items._id)
                                    }
                                  >
                                    <DeleteIcon />
                                    <Text ml={"1"}>Delete</Text>
                                  </Box>
                                </Flex>
                              </Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Flex gap="1rem" p={5} direction={"column"}>
                <Text fontSize={"1.2rem"}>No question posted yet!</Text>
                <Link href={"/askquestion"}>
                  <Button colorScheme="guru">Ask a question</Button>
                </Link>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
