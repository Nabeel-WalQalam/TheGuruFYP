import React, { useState, useRef, useEffect, useMemo } from "react";
// import clipboard from "clipboard";
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
} from "@chakra-ui/react";
// import Editor from "@monaco-editor/react";
import { useRouter } from "next/router";
import { BsFillPlayCircleFill } from "react-icons/bs";
import AvatarCard from "../../components/AvatarCard";

import { initSocket } from "../../socket";
import { basicSetup } from "codemirror";

import { EditorView, ViewUpdate } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
// import { useCodeMirror } from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import { autoCloseTags, javascript } from "@codemirror/lang-javascript";

// import EditorPage from "../../components/EditorPage";
import { onUpdate } from "../../components/Update";
export default function EditorCom() {
  // const [code, setCode] = useState(
  //   "initial code state that can be changed externally"
  // );
  const editor = useRef(null);
  // const valueRef = useRef(code);
  // const [field, setfield] = useState("xyz");
  const [client, setClient] = useState([]);
  const router = useRouter();
  const roomId = router.query.roomid;
  const [view, setView] = useState();
  const [code, setcode] = useState();
  // const editorRef = useRef(null);

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
        console.log(coderef);
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
    const handleCodeChange = ({ value }) => {
      // console.log(value);

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

        vscodeDark,

        javascript({
          jsx: true,
          typescript: true,
        }),

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
    socketRef.current.emit("code-change", {
      roomId,
      value,
    });
  };

  //end

  const handleLeave = () => {
    router.push("/Compiler");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
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
            {/* <Editor
              // value={field}
              height="70vh"
              defaultLanguage="javascript"
              theme="vs-dark"
              onMount={handleEditorDidMount}
              onChange={handleInput}
            /> */}
            <Box
              // border={"1px"}
              // borderColor="white"
              position={"relative"}
              fontSize={"1rem"}
              height="450px"
              ref={editor}
            />
            <Flex
              height={"70%"}
              bg={"#282A36"}

              // my="0.1rem"
            >
              <Flex justify={"center"} align="center">
                <Box position={"absolute"} bottom="15.4rem" right={"24rem"}>
                  <Select
                    placeholder="Select Lang"
                    color={"grey"}
                    fontWeight="bold"
                    required
                  >
                    <option color="black" value="c++">
                      C++
                    </option>
                    <option color="black" value="Python">
                      Python
                    </option>
                    <option color="black" value="Javascript">
                      Javascript
                    </option>
                  </Select>
                </Box>
                <Tooltip label="Run Code">
                  <Box
                    position={"absolute"}
                    bottom="15rem"
                    right={"20rem"}
                    // border="1px"
                    // borderColor={"#524DFF"}
                    // borderRadius={"50%"}
                    // borderColor="grey.100"
                    _hover={{
                      //   border: "1px",
                      //   borderColor: "black",
                      borderRadius: "50%",
                      boxShadow: "0 0 40px #524DFF",
                      cursor: "pointer",
                    }}
                  >
                    <BsFillPlayCircleFill
                      fill="#524DFF"
                      size={"50px"}
                      //   onClick={() => {
                      //     console.log("button clicked");
                      //   }}
                    />
                  </Box>
                </Tooltip>
              </Flex>
            </Flex>
          </Box>
          <Box
            // border={"5px"}
            //  borderColor="green"
            height="35%"
            bg={"#1c1e29"}
          >
            <Heading size={"lg"} mt="0.5rem" ml={"0.5rem"} color={"white"}>
              Output
            </Heading>
            <Text
              //   ml={"6rem"}
              mt="0.5rem"
              p={"1rem"}
              color={"white"}
              //  border="1px"
              bg="grey"
            ></Text>
          </Box>
        </Flex>
        <Box
          bg={"#1c1e29"}
          //   border={"1px"}
          width="20%"
          height={"90.4vh"}
          //   borderColor="#524DFF"

          //   p={"1rem"}
        >
          <Flex
            height={"100%"}
            direction={"column"}
            justify="space-between"
            align={"center"}
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
            <Flex justify={"space-evenly"} width="100%" mb={"2rem"}>
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
