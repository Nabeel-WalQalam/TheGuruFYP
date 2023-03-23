import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ArrowUpIcon } from "@chakra-ui/icons";
// import { ArrowUpIcon } from '@chakra-ui/icons'

export default function RoomLogin() {
  const [roomId, setRoomId] = useState("");
  const [username, setusername] = useState("");

  const router = useRouter();

  const generateId = () => {
    const id = uuidv4();

    setRoomId(id);
  };

  const handleInputField = (e) => {
    setusername(e.target.value);
  };
  const handleRoomId = (e) => {
    setRoomId(e.target.value);
  };

  const joinHandler = (e) => {
    e.preventDefault();
    router.push({
      pathname: "Compiler/[roomid]",
      query: { roomid: `${roomId}`, username: `${username}` },
    });
  };

  return (
    <Flex
      mt={"1rem"}
      //   minH={"50vh"}

      //   align={"center"}
      //   justify={"center"}
      //   bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        // border={"1px"}
        // spacing={8}
        // mx={"auto"}
        // py={12}
        // px={6}
        width="100%"
      >
        <Box
          rounded={"lg"}
          // bg={}
          boxShadow={"lg"}
          //   p={8}
          // width="100%"
        >
          <form onSubmit={joinHandler}>
            <Stack
              spacing={4}
              //  border="1px"
              maxW={"80%"}
            >
              <InputGroup>
                <Input
                  htmlSize={50}
                  type="text"
                  placeholder="ROOM-ID"
                  value={`${roomId}`}
                  onChange={handleRoomId}
                  required
                />
                <InputRightElement width="6rem">
                  <Button
                    color={"white"}
                    bg="#635dff"
                    size={"sm"}
                    colorScheme="blue"
                    onClick={generateId}
                  >
                    Generate
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Input
                type="text"
                placeholder="USER-NAME"
                onChange={handleInputField}
                required
              />

              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"center"}
                  justify={"space-between"}
                >
                  <Text>If you don't have invite then Generate New one</Text>
                  {/* <ArrowUpIcon /> */}
                </Stack>
                <Button
                  bg={"#635dff"}
                  color={"white"}
                  width="50%"
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Join
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
