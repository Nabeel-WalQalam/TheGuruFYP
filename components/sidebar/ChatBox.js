import { Box,CloseButton, Flex, Text, Divider, Button, Avatar, AvatarBadge, Input, AvatarGroup, IconButton, useToast, Center, HStack, Image, Progress, VStack,useMediaQuery, useColorMode,useColorModeValue, border  } from '@chakra-ui/react'
import React from 'react'

function ChatBox({onToggle,setopenChatbox,openChatbox}) {
  return (
    <Box borderRadius={"8px"} bg="white" h="400px" w="350px" position={"relative"} 
    // display={openChatbox?"block": "none"}
  
    >
     <CloseButton onClick={()=>{onToggle(),setopenChatbox(false)}} size='md'  position={"absolute"} right="0px" />







 {/* message box start below */}
 <Box h="100%" w={"100%"} px="12px" pt={"5px"} border={"1px"} borderColor={"#ededed"} 
                 borderRadius={"8px"}
                
            >


                <Flex w="100%" >

                   
                        
                            
                            <Avatar size="lg" name="hunfa" >
                                <AvatarBadge boxSize="1.25em" bg='red.500' />
                            </Avatar>
                            <Flex flexDirection="column" mx="5" justify="center">
                                <Text fontSize="lg" fontWeight="bold">
                                   hunfa
                                </Text>
                                <Text color={'red.500'}>Offline</Text>
                            </Flex>
                       



                </Flex>
                <Divider borderBottomWidth="3px" color="black" mt="5" />


               
                    <><Flex w="100%" h={ "67%"} overflowY="auto" flexDirection="column" p="3">



                    <Flex w="100%" justify="flex-end" >
                <Flex
                     
                    flexDirection={"column"}
                    position="relative"
                    bg="guru.500"
                    color="white"
                    minW="100px"
                    maxW="350px"
                    borderRadius={"8px"}
                    my="1"
                    // p="3"
                    px={"3"}
                    pt="1"
                >
                    <Text>Hi there</Text>
                    <Text alignSelf={"end"} fontSize={["10px", "12px"]}>6:30 pm</Text>
                </Flex>
            </Flex>
                
                <Flex w="100%"   >
                    <Avatar
                        name="hunfa"
                        size={"sm"}

                    > </Avatar>

                    <Flex
                        ml={"5px"}
                        flexDirection={"column"}
                        bg="gray.100"
                        color="black"
                        borderRadius={"8px"}
                        minW="100px"
                        maxW="350px"
                        px={"3"}
                        pt={1}
                        my="1"

                    >
                        
                        <Text>
                        WEll i am Ok
                        </Text>
                        <Text alignSelf={"end"} fontSize={["10px", "12px"]}>6:20 pm</Text>
                    </Flex>


                </Flex>





                     



                      

                    </Flex>


                        <Box h="35px" p={"0px"} >
                            <Flex w="100%" justifyContent={"space-between"}  h="100%">

                              
                                   
                                   
                                    <Input
autoComplete='off'
                                        
                                       h="100%"
                                        flexBasis={"84%"}
                                        placeholder="Type Something..."
                                        variant={"filled"}
                                        border={"none"}
                                       
                                        borderRadius="8px"
                                        _focus={{
                                            
                                            bg:"gray.200"
                                        }}
                                        _hover={{
                                            bg: "gray.200"
                                        }}
                                        id='msgInput'
                                       

                                    />
                                

<Box w="8px" ></Box>

                               
                                 
                                 

                                <Box w="8px"></Box>
                                <Button h="100%" colorScheme={"guru"} borderRadius="8px">Send</Button>
                            </Flex>
                        </Box></> 
                   
                



            </Box>
















    </Box>
  )
}

export default ChatBox