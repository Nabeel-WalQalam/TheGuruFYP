import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import {
  Flex,
  Box,
  Divider,
  Heading,
  Tag,
  Text,
  Image,
} from "@chakra-ui/react";
import { AiFillLike } from "react-icons/ai";
import { RiMessage3Fill } from "react-icons/ri";
import { ViewIcon } from "@chakra-ui/icons";
export const Topquestion = () => {
  return (
    <>
      <Flex
        border={"1px"}
        borderColor="gray.300"
        justify="space-between"
        align={"center"}
        p="1rem"
        borderRadius={"8px"}
        my="2"
      >
        <Flex
          // border={"1px"}
          direction="column"
        >
          <Heading size={"md"} color="#635DFF">
            WHats's your Favorite dev tool?
          </Heading>
          <Box my={"0.7rem"} mr="1rem">
            <Tag
              // border={"1px"}
              borderColor="#635DFF"
              borderRadius={"8px"}
            >
              Technology
            </Tag>
            <Tag
              // border={"1px"}
              mx="0.7rem"
              borderRadius={"8px"}
              borderColor="#635DFF"
            >
              tools
            </Tag>
          </Box>
          <Box display={"inherit"}>
            <Image
              borderRadius="full"
              boxSize="30px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />{" "}
            <Box fontWeight={"sm"} mx="4px">
              hunfa Jalil
            </Box>
          </Box>
        </Flex>
        <Flex
          // border={"1px"}
          justify="space-between"
        >
          <Box
            className="sideIcon"
            border={"1px"}
            borderColor="gray.300"
            p={"3"}
            borderRadius="8px"
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            mx={"0.5rem"}
          >
            <Text>100</Text>
            <Text>Votes</Text>
            <AiFillLike fill="#635DFF" />
            {/* <Image>xyz</Image> */}
          </Box>
          {/* <Divider orientation="vertical" ></Divider> */}

          <Box
            // border={"1px"}
            className="sideIcon"
            display="flex"
            border={"1px"}
            borderColor="gray.300"
            p={"3"}
            borderRadius="8px"
            flexDirection={"column"}
            alignItems="center"
            mx={"0.9rem"}
          >
            <Text>200</Text>
            <Text>Views</Text>
            {/* <Image>xyz</Image> */}
            <ViewIcon />
          </Box>
          <Box
            className="sideIcon"
            // border={"1px"}
            display="flex"
            border={"1px"}
            borderColor="gray.300"
            p={"3"}
            borderRadius="8px"
            flexDirection={"column"}
            alignItems="center"
            mx={"0.5rem"}
          >
            <Text>10</Text>
            <Text>Answers</Text>
            <RiMessage3Fill fill="#635DFF" />
            {/* <Image>xyz</Image> */}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
