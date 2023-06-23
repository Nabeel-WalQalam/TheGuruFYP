import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

export const Feature = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{
      base: "0",
      lg: "12",
    }}
    py={{
      base: "0",
      lg: "12",
    }}
  >
    <Stack
      direction={{
        base: "column-reverse",
        lg: "row",
      }}
      spacing={{
        base: "0",
        lg: "20",
      }}
    >
      <Box
        width={{
          lg: "sm",
        }}
        transform={{
          base: "translateY(-50%)",
          lg: "none",
        }}
        bg={{
          base: useColorModeValue("red.50", "gray.700"),
          lg: "transparent",
        }}
        mx={{
          base: "6",
          md: "8",
          lg: "0",
        }}
        px={{
          base: "6",
          md: "8",
          lg: "0",
        }}
        py={{
          base: "6",
          md: "8",
          lg: "12",
        }}
      >
        <Stack
          spacing={{
            base: "8",
            lg: "10",
          }}
        >
          <Stack
            spacing={{
              base: "2",
              lg: "4",
            }}
          >
            <Heading size="xl" color="guru.500">
              Who we are
            </Heading>
            <Heading size="xl" fontWeight="normal">
              Empowering the world to develop technology through collective
              knowledge.
            </Heading>
          </Stack>
          <HStack spacing="3">
            <Text>
              Our public platform serves 100 million people every month, making
              it one of the most popular websites in the world.
            </Text>
            <Text>
              Our asynchronous knowledge management and collaboration offering,
              Stack Overflow for Teams, is transforming how people work.
            </Text>
            {/* <Link
              color={useColorModeValue("red.500", "red.300")}
              fontWeight="bold"
              fontSize="lg"
            >
              Discover now
            </Link> */}
            {/* <Icon
              color={useColorModeValue("red.500", "red.300")}
              as={FaArrowRight}
            /> */}
          </HStack>
        </Stack>
      </Box>
      <Flex flex="1" overflow="hidden">
        <Image
          src="/images/bg.png"
          alt="Lovely Image"
          fallback={<Skeleton />}
          //   maxH="350px"
          // minW="300px"
          objectFit="cover"
          flex="1"
        />
      </Flex>
    </Stack>
  </Box>
);
