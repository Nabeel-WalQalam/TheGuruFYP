import { React } from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Heading,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { AiFillLike } from "react-icons/ai";
import { RiMessage3Fill } from "react-icons/ri";
import { ViewIcon } from "@chakra-ui/icons";
import { Topquestion } from "../components/Topquestion";
import axios from "axios";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../redux/reducers/user-reducer";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const Question = ({ questions }) => {
  const user = useSelector(setCurrentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("data", questions);
  return (
    <>
      {questions.payload.data.length ? (
        <>
          <Flex direction={"column"} align="center">
            <Flex
              //   border={"1px"}
              justify="space-between"
              align={"center"}
              width="75%"
            >
              <Heading
                // border={"1px"}
                size="lg"
                // width={"72%"}
                // marginInline="auto"
                my={"2rem"}
                //   ml="15rem"
              >
                Top Questions
              </Heading>

              {user.payload.userReducer.currentUser ? (
                <Link href={"/askquestion"} legacyBehavior>
                  <a>
                    <Button colorScheme={"guru"}>Ask Question</Button>
                  </a>
                </Link>
              ) : (
                <>
                  <Button colorScheme={"guru"} onClick={onOpen}>
                    Ask Question
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Please Login First!</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <ButtonGroup>
                          <Link href={"/auth"}>
                            <Button
                              colorScheme={"guru"}
                              variant="outline"
                              size="guruMd"
                            >
                              <Text>Log in</Text>
                            </Button>
                          </Link>

                          <Link href={"/auth"}>
                            <Button colorScheme={"guru"} size="guruMd">
                              <Text>Sign up</Text>
                            </Button>
                          </Link>
                        </ButtonGroup>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="guru"
                          // color={"black"}
                          onClick={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}
            </Flex>

            {/* Main Heading Start */}

            <Tabs
              width="75%"
              marginInline={"auto"}
              border="1px"
              borderRadius={"8px"}
              borderColor={"gray.200"}
            >
              <TabList
                // border={"1px"}
                display="flex"
                justifyContent={"space-evenly"}
              >
                <Tab className="questionTabs">Top Question</Tab>
                <Tab className="questionTabs">Unanswerd</Tab>
                <Tab className="questionTabs">Newest</Tab>
                <Tab className="questionTabs">Votes</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Topquestion questions={questions.payload.data} />
                </TabPanel>

                <TabPanel>
                  <Topquestion />
                  <Topquestion />
                </TabPanel>

                <TabPanel>
                  <Topquestion />
                </TabPanel>

                <TabPanel>
                  <Topquestion />
                  <Topquestion />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </>
      ) : (
        <Flex justify={"center"} align="center" mt={"2rem"}>
          <Box>
            <Text fontWeight={"bold"} fontSize="2rem" color={"#153A5B"}>
              Oops No Questions Posted yet!
            </Text>
          </Box>
          <Box>
            <Image
              src={"/images/noQuestion.png"}
              alt={"no Question"}
              width={350}
              height={400}
            />
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Question;

export async function getServerSideProps(context) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_Host_URL}api/getAllQuestion`
    );
    // console.log(response.data);
    return {
      props: { questions: response.data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { questions: null },
    };
  }
}
