import React ,{useState}from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Highlight,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Input,
  Button,ButtonGroup
} from "@chakra-ui/react";
import { Texteditor } from "../Components/Texteditor";
import Tagsinput from "../components/Tagsinput";
function Askquestion() {

  return (
    <>
      <Flex
        //  border="2px solid red"
        // align="center"
        px="10"
        justify={"center"}
        direction="column"
        mt="50px"
        mb="50px"
        maxW={"1000px"}
        mx="auto"
      >
        {/* box 1 started*/}
        <Box
          px="6"
          py="4"
          border={"1px"}
          
          borderColor={"guru.100"}
          borderRadius="8px"
          bg="#b5b3ff38"
        >
          <Heading color={"guru.500"} align="center" mt="10px">
            Ask your question
          </Heading>
          <Text mt="10px" fontSize={"1.4rem"} fontWeight="semibold">
            Writing a good question
          </Text>
          <Text>
            <Highlight
              query={["ask", "programming-related", "question"]}
              styles={{ py: "1", fontWeight: "normal", color: "#635dff" }}
            >
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </Highlight>
          </Text>

          <Text mt="10px" fontWeight={"medium"}>
            Steps
          </Text>

          <UnorderedList ml="40px" fontSize={"0.8rem"}>
            <ListItem>Summarize your problem in a one-line title.</ListItem>
            <ListItem>Describe your problem in more detail.</ListItem>
            <ListItem>
              Describe what you tried and what you expected to happen.
            </ListItem>
            <ListItem>
              Add “tags” which help surface your question to members of the
              community.
            </ListItem>
            <ListItem>Review your question and post it to the site.</ListItem>
          </UnorderedList>
        </Box>

        {/* box 1 ended*/}

        {/* box 2 started */}

        <Box
          mt="30px"
          px="6"
          py="4"
          border={"1px"}
          
          borderColor={"gray.200"}
          borderRadius="8px"
          bg="white"
          boxShadow={"md"}
        >
          <Text fontSize={"1.4rem"} fontWeight="semibold">
            Title
          </Text>
          <Text mb="5px" fontSize={"0.8rem"}>
            Be specific and imagine you’re asking a question to another person.
          </Text>
          <Input
            border="1px"
            borderRadius={"8px"}
            variant="outline"
            borderColor={"gray.400"}
            placeholder="eg. How to center a div in html "
            _focus={{
              outline: "0px",
              borderColor: "rgb(99, 93, 255)",
              boxShadow:
                "rgb(0 0 0 / 8%) 0px 0.1rem 0.1rem inset, rgb(158 128 255 / 60%) 0px 0px 0.6rem",
            }}
            _placeholder={{ fontSize: "0.8rem", color: "gray.400" }}
          ></Input>
        </Box>

        {/* box 2 ended */}

        {/* box 3 started */}

        <Box
          mt="20px"
          px="6"
          py="4"
          border={"1px"}
          
          borderColor={"gray.200"}
          borderRadius="8px"
          bg="white"
          boxShadow={"md"}
        >
          <Text fontSize={"1.4rem"} fontWeight="semibold">
            What are the details of your problem?
          </Text>
          <Text mb="5px" fontSize={"0.8rem"}>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </Text>

          <Texteditor />
        </Box>

        {/* box 3 ended */}











         {/* box 4 started */}

         <Box
          mt="20px"
          px="6"
          py="4"
          
          border={"1px"}
          
          borderColor={"gray.200"}
          borderRadius="8px"
          bg="white"
          boxShadow={"md"}
        >
          <Text fontSize={"1.4rem"} fontWeight="semibold">
            Tags
          </Text>
          <Text mb="5px" fontSize={"0.8rem"}>
          Add up to 5 tags to describe what your question is about.
          </Text>
           <Tagsinput />
          
        </Box>

        {/* box 4 ended */}

        <Box  mt="20px"  align="right">
        <ButtonGroup   spacing='3' >
  <Button colorScheme='guru'>Submit Question</Button>
  <Button colorScheme='red' variant={"outline"}>Discard draft</Button>
</ButtonGroup>
        </Box>
      </Flex>
    </>
  );
}

export default Askquestion;
