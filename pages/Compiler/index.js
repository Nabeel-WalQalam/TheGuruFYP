import React from "react";
import { Img, Stack, Text } from "@chakra-ui/react";
import { Box, Flex, Center, Heading, Highlight, color } from "@chakra-ui/react";
import RoomLogin from "../../components/RoomLogin";

export default function index() {
  return (
    <>
      <Box bg="gray.800" as="section" minH="140px" position="relative">
        <Box py="32" position="relative" zIndex={1}>
          <Box
            maxW={{ base: "xl", md: "7xl" }}
            mx="auto"
            px={{ base: "6", md: "8" }}
            color="white"
          >
            <Box maxW="xl">
              <Heading as="h2" size="2xl" fontWeight="extrabold">
                Build Logic with your TeamMates
              </Heading>
              <Text>Online Collaboration IDE</Text>
              <RoomLogin />
              <Stack
                direction={{ base: "column", md: "row" }}
                mt="10"
                spacing="4"
              >
                <Center>
                  <Heading lineHeight="tall">
                    <Highlight
                      query={["Code", "Together"]}
                      styles={{
                        px: "2",
                        py: "0.5",
                        rounded: "full",
                        bg: "#635dff",
                        color: "white",
                      }}
                    >
                      Code Better | Faster Together
                    </Highlight>
                  </Heading>
                </Center>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Flex
          id="image-wrapper"
          position="absolute"
          insetX="0"
          insetY="0"
          w="full"
          h="full"
          overflow="hidden"
          align="center"
        >
          <Box position="relative" w="full" h="full">
            <Img
              src="/images/team.svg"
              alt="Main Image"
              //   w="half"
              marginLeft={"45rem"}
              marginTop="1rem"
              h="650px"
              //   objectFit="cover"
              //   objectPosition="right"
              position="absolute"
            />
            <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
