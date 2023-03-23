import { React } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { AiFillLike } from "react-icons/ai";
import { RiMessage3Fill } from "react-icons/ri";
import { ViewIcon } from "@chakra-ui/icons";
import { Topquestion } from "../components/Topquestion";
import Link from "next/link";

const Question = () => {
  return (
    <>
      {/* Main Heading Start */}
      <Flex direction={"column"} align="center">
        <Flex
          //   border={"1px"}
          justify="space-between"
          align={"center"}
          width="75%"
        >
          <Heading
            // border={"1px"}
            size="lg"
            // width={"72%"}
            // marginInline="auto"
            my={"2rem"}
            //   ml="15rem"
          >
            Top Questions
          </Heading>
          <Link href={"/askquestion"} legacyBehavior><a>
          <Button colorScheme={"guru"}>Ask Question</Button>

            </a></Link>
        </Flex>

        {/* Main Heading Start */}

        <Tabs
          width="75%"
          marginInline={"auto"}
          border="1px"
          borderRadius={"8px"}
          borderColor={"gray.200"}
        >
          <TabList
            // border={"1px"}
            display="flex"
            justifyContent={"space-evenly"}
          >
            <Tab className="questionTabs">Top Question</Tab>
            <Tab className="questionTabs">Unanswerd</Tab>
            <Tab className="questionTabs">Newest</Tab>
            <Tab className="questionTabs">Votes</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Topquestion />
            </TabPanel>

            <TabPanel>
              <Topquestion />
              <Topquestion />
            </TabPanel>

            <TabPanel>
              <Topquestion />
            </TabPanel>

            <TabPanel>
              <Topquestion />
              <Topquestion />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};

export default Question;
