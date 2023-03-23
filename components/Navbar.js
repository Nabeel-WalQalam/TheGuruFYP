import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  ButtonGroup,
  Button,
  Heading,
  Text,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Icon,
  ScaleFade,
  Slide,
  SlideFade,
  useDisclosure,
  Highlight,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { BsQuestionSquare, BsQuestionLg, BsUiRadios } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { FiTag } from "react-icons/fi";
import { HiCode } from "react-icons/hi";
import Script from "next/script";
import Nav_Search_Expand from "./Nav_Search_Expand";
import Link from "next/link";
function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [menuOpened, setmenuOpened] = useState(false);
  const navbar_search = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (navbar_search.current)
        if (!navbar_search.current.contains(e.target)) {
          if (isOpen) onToggle();
        }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const show = () => {
    if (menuOpened === false) {
      document.getElementById("one").style.transform =
        "rotate(45deg) translate(8px)";
      document.getElementById("two").style.opacity = "0";
      document.getElementById("two").style.transform = "translate(-20px)";
      document.getElementById("three").style.transform =
        "rotate(-45deg) translate(9px)";

      setmenuOpened(true);
    } else {
      document.getElementById("one").style.transform =
        "rotate(0deg) translate(0px)";
      document.getElementById("two").style.opacity = "1";
      document.getElementById("two").style.transform = "translate(0px)";
      document.getElementById("three").style.transform =
        "rotate(0deg) translate(0px)";

      setmenuOpened(false);
    }
  };

  return (
    <>
      <Flex
        p="2"
        align={"center"}
        h="70px"
        px="4"
        justify={"space-between"}
        style={{ boxShadow: " -1px 0px 20px 0px rgba(99,93,255,0.2)" }}
        bg={"white"}
        position="relative"
        // w="100%"
        zIndex={"1000"}
      >
        {/* 1st component */}
        <Flex align={"center"} minW="215px" justify={"space-between"}>
          <Menu autoSelect={false} closeOnBlur={false} closeOnSelect={false}>
            <MenuButton onClick={show} className="hambtn" bg="white">
              <Flex
                h={"20px"}
                w="24px"
                direction={"column"}
                justifyContent="space-between"
              >
                <Box
                  className="sub"
                  id="one"
                  h="5px"
                  bg="gray.400"
                  borderRadius={"8px"}
                  style={{ transition: "transform 0.3s,background-color 0.3s" }}
                ></Box>
                <Box
                  className="sub"
                  id="two"
                  h="4px"
                  bg="gray.400"
                  borderRadius={"8px"}
                  style={{
                    transition:
                      "opacity 0.3s, transform 0.3s,background-color 0.2s",
                  }}
                ></Box>
                <Box
                  className="sub"
                  id="three"
                  h="5px"
                  bg="gray.400"
                  borderRadius={"8px"}
                  style={{ transition: "transform 0.3s,background-color 0.1s" }}
                ></Box>
              </Flex>
            </MenuButton>
            <MenuList
              position={"relative"}
              zIndex={"0"}
              bottom="-13px"
              left="-16px"
              border="none"
              bg="white"
              //  boxShadow={"none"}
              py="5"
            >
              <Link href={"/topquestion"} legacyBehavior>
                <a>
                  <MenuItem
                    my="5px"
                    fontWeight={"semibold"}
                    icon={<BsQuestionLg size={"18px"} color="#635dff" />}
                    borderRight="2px solid #635dff"
                  >
                    Questions
                  </MenuItem>
                </a>
              </Link>
              <MenuItem
                my="5px"
                fontWeight={"semibold"}
                icon={<FiTag size={"18px"} color="#635dff" />}
              >
                Tags
              </MenuItem>
              <MenuItem
                my="5px"
                fontWeight={"semibold"}
                icon={<FiUser size={"18px"} color="#635dff" />}
              >
                Users
              </MenuItem>
              <Link href={"/Compiler"}>
                <MenuItem
                  my="5px"
                  fontWeight={"semibold"}
                  icon={<HiCode size={"18px"} color="#635dff" />}
                >
                  Online Compiler
                </MenuItem>
              </Link>
              <MenuItem
                my="5px"
                fontWeight={"semibold"}
                icon={<BsQuestionSquare size={"18px"} color="#635dff" />}
              >
                About
              </MenuItem>
            </MenuList>
          </Menu>

          <Box h="30px">
            <Link href={"/"} legacyBehavior>
              <a>
                <Image
                  h="100%"
                  src="/images/logo-high.png"
                  alt="logoImage"
                ></Image>
              </a>
            </Link>
          </Box>
        </Flex>
        {/* 1st component */}

        {/* for spacing only */}
        <Box w="40px"></Box>
        {/* for spacing only */}

        {/* 2nd component */}
        <Box minW="240px" maxW="587px" w="100%" position={"relative"}>
          <ScaleFade initialScale={0.9} in={isOpen} unmountOnExit={true}>
            <Box
              ref={navbar_search}
              position={"absolute"}
              width={"100%"}
              h="130px"
              top={"2.7rem"}
              borderRadius="8px"
              bg="white"
              border={"2px"}
              borderColor="gray.300"
              p={"10px"}
            >
              <Nav_Search_Expand />
            </Box>
          </ScaleFade>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <Icon
                  as={BiSearchAlt}
                  color="rgb(99, 93, 255)"
                  boxSize={"24px"}
                />
              }
            />
            <Input
              id="navbar-search"
              onClick={() => {
                if (!isOpen) onToggle();
              }}
              border="1px"
              borderRadius={"8px"}
              variant="filled"
              type="search"
              placeholder="Search"
              _focus={{
                outline: "0px",
                borderColor: "rgb(99, 93, 255)",
                boxShadow:
                  "rgb(0 0 0 / 8%) 0px 0.1rem 0.1rem inset, rgb(158 128 255 / 60%) 0px 0px 0.6rem",
              }}
              _placeholder={{ fontWeight: "semibold" }}
            />
          </InputGroup>
        </Box>
        {/*  2nd component */}

        {/* for spacing only */}
        <Box w="40px"></Box>
        {/* for spacing only */}

        {/*  3rd component */}
        <Box>
          <ButtonGroup>
            <Link href={"/auth"}>
              <Button colorScheme={"guru"} variant="outline" size="guruMd">
                <Text>Log in</Text>
              </Button>
            </Link>

            <Link href={"/auth"}>
              <Button colorScheme={"guru"} size="guruMd">
                <Text>Sign up</Text>
              </Button>
            </Link>
          </ButtonGroup>
        </Box>
        {/* 3rd component */}
      </Flex>
    </>
  );
}

export default Navbar;
