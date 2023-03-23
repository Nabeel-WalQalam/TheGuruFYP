import { React, useState } from "react";
import { Collapse } from "@chakra-ui/react";
import { TimeIcon, ViewIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";
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
} from "@chakra-ui/react";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { BsFillReplyFill } from "react-icons/bs";

export const Answers = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <>
      <Box
        boxShadow={"-0.5px 4px 10px -5.5px #dddddd"}
        p="6"
        rounded="md"
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
                Nabeel Muzaffar
              </Center>
            </Box>
            <Box
              mx={"5rem"}
              //  border={"1px black solid"}
            >
              <TimeIcon mr="2" />
              <Center display={"inline"}>15 hours ago</Center>
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
          >
            <Box width={"95%"}>
              <Collapse startingHeight={50} in={show}>
                JavaScript is a scripting or programming language that allows
                you to implement complex features on web pages — every time a
                web page does more than just sit there and display static
                information for you to look at displaying timely content
                updates, interactive maps, animated 2D/3D graphics, scrolling
                video jukeboxes, etc. JavaScript is a scripting or programming
                language that allows you to implement complex features on web
                pages every time a web page does more than just sit there and
                display static information for you to look at — displaying
                timely content updates, interactive maps, animated 2D/3D
                graphics, scrolling video jukeboxes, etc.
              </Collapse>
              <Text
                color={"#635DFF"}
                fontWeight={"bold"}
                onClick={handleToggle}
              >
                Show{show ? " Less " : " More "}
              </Text>
            </Box>
          </Flex>

          {/* Third Box */}

          <Divider width={"60%"} my="3"></Divider>
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
            <Box
              ml={"4rem"}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              mr="5"
              className="ArrowUp"
            >
              <FaArrowUp />
              <Text mx={"1"} className="text">
                Up vote
              </Text>
            </Box>
            <Text
              bg="#635DFF"
              padding="1px 20px"
              color={"white"}
              borderRadius={"5"}
            >
              5000
            </Text>
            <Box
              mx={"5"}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              className="ArrowUp"
            >
              <FaArrowDown />
              <Text className="text" ml={"1"}>
                Down Vote
              </Text>
            </Box>

            <Box
              mx={"3"}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              bg="#635DFF"
              padding="3px 25px"
              color={"white"}
              borderRadius={"5"}
            >
              <BsFillReplyFill />
              <Text ml={"1"}>Comment</Text>
            </Box>
          </Flex>
          <Box
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
          </Box>
        </Flex>
      </Box>
      {/* <Divider w={"70%"} marginInline="auto" /> */}
    </>
  );
};
