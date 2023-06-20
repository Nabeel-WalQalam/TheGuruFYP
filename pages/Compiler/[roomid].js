import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Flex,
  Box,
  Center,
  Heading,
  Button,
  Textarea,
  Tooltip,
  Input,
  Text,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { BsFillPlayCircleFill } from "react-icons/bs";
import AvatarCard from "../../components/AvatarCard";
import { initSocket } from "../../socket";
import { basicSetup } from "codemirror";
// import { basicSetup } from "@codemirror/basic-setup";
import { EditorView } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { oneDark } from "@codemirror/theme-one-dark";
import { autoCloseTags, javascript } from "@codemirror/lang-javascript";
import { cpp, cppLanguage } from "@codemirror/lang-cpp";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { autocompletion } from "@codemirror/autocomplete";

import { highlightSelectionMatches } from "@codemirror/search";
import { bracketMatching } from "@codemirror/matchbrackets";
import { foldGutter, foldKeymap } from "@codemirror/fold";
import { commentKeymap } from "@codemirror/comment";
import { lint } from "@codemirror/lint";
import { python, pythonLanguage } from "@codemirror/lang-python";
import { styleTags } from "@codemirror/highlight";
import { onUpdate } from "../../components/Update";
import axios from "axios";
export default function EditorCom() {
  const editor = useRef(null);
  const [client, setClient] = useState([]);
  const router = useRouter();
  const roomId = router.query.roomid;
  const [view, setView] = useState();
  const [code, setcode] = useState("");
  const [Language, SetLanguage] = useState("");
  const [output, setoutput] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [UserInput, setUserInput] = useState("");
  const toast = useToast();

  // const basicKeymap = keymap.of(defaultKeymap);

  // console.log('code' , code)

  const socketRef = useRef(null);
  const coderef = useRef();
  // console.log(router.query.username);

  // function handleEditorDidMount(editor, monaco) {
  //   editorRef.current = editor;
  //   // console.log(editor);
  // }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      //checking error on connection
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        // toast.error('Socket connection failed, try again later.');
        // reactNavigator('/');
      }

      //send join user to server
      socketRef.current.emit("join", {
        roomId,
        username: router.query.username,
      });

      //listning for clients
      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== router.query.username) {
          console.log(`${username} joined`);
        }
        // console.log(coderef);
        setClient(clients);
        socketRef.current.emit("sync-code", {
          code: coderef.current,
          socketId,
        });
      });

      // Listening for disconnected

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        // toast.success(`${username} left the room.`);
        console.log(`${username} left`);
        toast({
          title: "User left",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setClient((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });

      socketRef.current.on("message", (data) => {
        console.log(data);
      });
    };

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };
  }, []);

  useEffect(() => {
    const handleCodeChange = ({ value, output, Language }) => {
      // console.log(value);
      setoutput(output);
      SetLanguage(Language);
      const editorValue = view.state.doc.toString();
      if (value !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value || "",
          },
        });
      }
    };

    if (socketRef.current) {
      socketRef.current.on("code-change", handleCodeChange);
    }

    return () => {
      socketRef.current.off("code-change");
    };
  }, [view, editor]);

  useEffect(() => {
    const view = new EditorView({
      extensions: [
        basicSetup,
        cpp(),
        python(),
        pythonLanguage,
        cppLanguage,
        vscodeDark,
        // oneDark,
        highlightSelectionMatches(),

        javascript({
          jsx: true,
        }),
        // styleTags(),
        onUpdate(handleChange),
      ],
      parent: editor.current,
    });

    setView(view);

    /**
     * Make sure to destroy the codemirror instance
     * when our components are unmounted.
     */
    return () => {
      view.destroy();
      setView(undefined);
    };
  }, []);

  const handleChange = (value, viewUpdate) => {
    coderef.current = value;
    // console.log(value)
    setcode(value);
    socketRef.current.emit("code-change", {
      roomId,
      value,
      output,
      Language,
    });
  };

  //end

  const handleLeave = () => {
    router.push("/Compiler");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    toast({
      title: "Room id copy successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCodeSubmit = async () => {
    if (Language == "") {
      toast({
        title: "Please Select language",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (code == "") {
      toast({
        title: "Please write the correct code",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      // console.log(code)

      try {
        setloading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_Host_URL}api/postCompiler`,
          {
            code: code,
            languange: Language,
            userInput: UserInput,
          }
        );
        // console.log(response)
        if (response.data.output.output) {
          console.log(response.data.output);
          setoutput(response.data.output.output);
          toast({
            title: "Program run successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setloading(false);
          return;
        } else {
          setloading(false);
          console.log("error", response.data.output);
          setoutput(response.data.output.error);
          toast({
            title: "Some error occured",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        // Handle the response from the backend if needed
      } catch (error) {
        console.log("error", error);
        setloading(false);
        // Handle any error that occurs during the request
      }
    }
    // console.log(code , Language)
  };
  return (
    <>
      <Flex border={"1px"} borderColor="dark blue">
        <Flex
          direction={"column"}
          width="100%"
          // height={"100%"}
        >
          <Box width={"100%"}>
            <Box
              border={"1px"}
              // borderColor="white"
              position={"relative"}
              fontSize={"1rem"}
              height="450px"
              ref={editor}
            />
            <Flex
              // height={"70%"}
              bg={"#282A36"}
            >
              <Flex justify={"center"} align="center">
                <Box py="1rem">
                  <Select
                    ml={"1rem"}
                    pos={"relative"}
                    placeholder="Select Language"
                    color={"grey"}
                    fontWeight="bold"
                    required
                    onChange={(e) => SetLanguage(e.target.value)}
                  >
                    <option color="black" value="c++">
                      C++
                    </option>
                    <option color="black" value="Python">
                      Python
                    </option>
                    {/* <option color="black" value="Javascript">
                      Javascript
                    </option> */}
                  </Select>
                </Box>
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Tooltip label="Run Code">
                      <Button
                        variant={"none"}
                        position={"absolute"}
                        // bottom="12rem"
                        right={"20rem"}
                        border={"none"}
                        borderRadius={"none"}
                        _hover={{
                          // borderRadius: "50%",
                          // boxShadow: "0 0 40px #524DFF",
                          cursor: "pointer",
                        }}
                      >
                        <BsFillPlayCircleFill
                          fill="#524DFF"
                          size={"50px"}
                          onClick={() => {
                            handleCodeSubmit();
                          }}
                        />
                      </Button>
                    </Tooltip>
                  </>
                )}
              </Flex>
            </Flex>
          </Box>
          <Flex
            justify={"space-between"}
            // border={"5px"}
            //  borderColor="green"
            height="35%"
            bg={"#1c1e29"}
          >
            <Box width={"50%"}>
              <Heading size={"lg"} mt="0.5rem" ml={"0.5rem"} color={"white"}>
                Output
              </Heading>
              <Text
                //   ml={"6rem"}
                mt="0.5rem"
                p={"1rem"}
                color={"white"}
                //  border="1px"
                width={"100%"}
                height={"inherit"}
                bg="grey"
              >
                {output}
              </Text>
            </Box>
            <Box width={"45%"}>
              <Heading size={"lg"} mt="0.5rem" ml={"0.5rem"} color={"white"}>
                Compile with Input
              </Heading>
              <Textarea
                mt="0.5rem"
                p={"1rem"}
                onChange={(e) => setUserInput(e.target.value)}
                color={"white"}
                //  border="1px"
                placeholder="enter the user input if have"
                //  bg="grey"
              />
            </Box>
          </Flex>
        </Flex>
        <Box
          bg={"gray.900"}
          // border={"1px"}
          // width="20%"
          height={"90.4vh"}
          //   borderColor="#524DFF"

          //   p={"1rem"}
        >
          <Flex
            height={"100%"}
            direction={"column"}
            justify="space-between"
            align={"center"}
            px="1rem"
          >
            <Box
              color={"white"}
              bg="#524DFF"
              p={"0.7rem"}
              mt="2rem"
              w="80%"
              borderRadius={"8px"}
            >
              <Center fontWeight={"semibold"}>Connected User</Center>
            </Box>
            <Box
              //   border={"1px"}
              //   borderColor="grey.400"
              width={"100%"}
              height="70%"
            >
              <Flex
                justify={"space-evenly"}
                wrap="wrap"
                width={"100%"}
                my="1rem"
              >
                {client.map((client) => {
                  return (
                    <AvatarCard
                      clients={client.username}
                      key={client.socketId}
                    />
                  );
                })}
              </Flex>
            </Box>
            <Flex
              gap={"1rem"}
              justify={"space-evenly"}
              width="100%"
              mb={"2rem"}
            >
              <Button
                onClick={handleCopy}
                colorScheme={"green"}
                variant="outline"
              >
                Copy Room-ID
              </Button>
              <Button onClick={handleLeave} colorScheme={"red"} border="none">
                Leave
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
