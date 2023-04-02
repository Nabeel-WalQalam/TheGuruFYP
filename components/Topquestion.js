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
  Badge,
  Stack,
} from "@chakra-ui/react";
import { AiFillLike } from "react-icons/ai";
import { RiMessage3Fill } from "react-icons/ri";
import { ViewIcon } from "@chakra-ui/icons";
import Link from "next/link";
export const Topquestion = ({ questions }) => {
  console.log(questions);
  return (
    <>
      {questions
        ? questions.map((data) => (
            <Flex
              border={"1px"}
              borderColor="gray.300"
              justify="space-between"
              align={"center"}
              p="1rem"
              borderRadius={"8px"}
              my="2"
              key={data._id}
            >
              <Flex
                // border={"1px"}
                direction="column"
              >
                <Link href={`/question/${data._id}`}>
                  <Heading
                    cursor={"pointer"}
                    _hover={{ textDecoration: "underline", cursor: "pointer" }}
                    size={"md"}
                    color="#635DFF"
                  >
                    {data.title ? data.title : ""}
                  </Heading>
                </Link>

                <Stack my={"0.7rem"} mr="1rem" direction="row">
                  {data.tags
                    ? data.tags.map((tag) => (
                        <Badge px={"0.5rem"} colorScheme={"facebook"} key={tag}>
                          {tag}
                        </Badge>
                      ))
                    : ""}
                </Stack>

                <Box display={"inherit"}>
                  <Image
                    borderRadius="full"
                    boxSize="30px"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />{" "}
                  <Box fontWeight={"sm"} mx="4px">
                    {data.user[0].name ? data.user[0].name : ""}
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
                  cursor="pointer"
                >
                  <Text>{data.votes ? data.votes : 0}</Text>
                  <Text>Votes</Text>
                  <AiFillLike fill="#635DFF" />
                  {/* <Image>xyz</Image> */}
                </Box>
                {/* <Divider orientation="vertical" ></Divider> */}

                <Box
                  cursor="pointer"
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
                  <Text>{data.views.count ? data.views.count : 0}</Text>
                  <Text>Views</Text>
                  {/* <Image>xyz</Image> */}
                  <ViewIcon />
                </Box>
                <Box
                  cursor="pointer"
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
                  <Text>{data.answers ? data.answers : 0}</Text>
                  <Text>Answers</Text>
                  <RiMessage3Fill fill="#635DFF" />
                  {/* <Image>xyz</Image> */}
                </Box>
              </Flex>
            </Flex>
          ))
        : ""}
    </>
  );
};
