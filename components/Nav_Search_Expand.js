import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function Nav_Search_Expand() {
    return (
        <Flex direction={"column"}  h="100%" justify={"space-around"}>


            <Flex justifyContent={"space-around"}>
                <Box  flexBasis="50%">
                    <Text display={"inline-block"} fontWeight="semibold"  color={"guru.300"}>[ tag ]</Text>
                    <Text display={"inline-block"} ml="5px" color={"gray.500"}> search within a tag</Text>
                </Box>


                <Box flexBasis="50%">
                    <Text display={"inline-block"} fontWeight="semibold"  color={"guru.300"}>answers : 0 </Text>
                    <Text display={"inline-block"} ml="5px" color={"gray.500"}> unanswered questions</Text>
                </Box>
            </Flex>


            <Flex justifyContent={"space-around"}>
                <Box flexBasis="50%">
                    <Text display={"inline-block"} fontWeight="semibold"  color={"guru.300"}>user : 1234</Text>
                    <Text display={"inline-block"} ml="5px" color={"gray.500"}> search by author</Text>
                </Box>


                <Box flexBasis="50%">
                    <Text display={"inline-block"} fontWeight="semibold"  color={"guru.300"}>score : 3 </Text>
                    <Text display={"inline-block"} ml="5px" color={"gray.500"}> posts with a 3+ score</Text>
                </Box>
            </Flex>


            <Flex justifyContent={"space-around"}>
                <Box flexBasis="50%">
                    <Text display={"inline-block"} fontWeight="semibold"  color={"guru.300"}>"words here"</Text>
                    <Text display={"inline-block"} ml="5px" color={"gray.500"}> exact phrase</Text>
                </Box>


                <Box flexBasis="50%">
                    <Text display={"inline-block"} fontWeight="semibold"  color={"guru.300"}>is : question </Text>
                    <Text display={"inline-block"} ml="5px" color={"gray.500"}> type of post</Text>
                </Box>
            </Flex>



           
            


        </Flex>
    )
}

export default Nav_Search_Expand