
import React,{useContext,useState,useEffect} from 'react'
import { Box, Text, Divider, Icon, HStack, Badge, Avatar } from '@chakra-ui/react'

function MyChats({ setselectedChat,setopenChatbox }) {
 
 
      const date = "2/08/22"
      const CircleIcon = (props) => (
          <Icon viewBox='0 0 200 200' {...props}>
            <path
              fill='currentColor'
              d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
            />
          </Icon>
        )
  
  
    
      return (
          <>
             
              
                <Box  cursor={"pointer"} 
                onClick={()=>{setopenChatbox(true)}} 
                // onClick={() => _setselectedChat(chat._id)}
                //  backgroundColor={selectedChat===chat._id? "#0078FF":""}
                //  color={selectedChat===chat._id?"white":""}
                  _hover={{
                    // bgColor:selectedChat===chat._id?"":"blue.100",
                    boxShadow:"0px 0px 10px 0px #888888",
                   
                    
                  }}
                  
                  transition="background-color 0.2s,color 0.2s,box-shadow 0.3s"
                  borderRadius="8px"
                  justifyContent={"center"}
                  alignItems={"center"} w={"100%"} h={"80px"} display={"flex"}>
  
                  <Box w={"14%"}>
                    {/* image box */}
  
                    <Avatar 
                    // name={chat.isGroupChat? chat.chatName:chat.users[0].name} size={"md"} src={!chat.isGroupChat?chat.users[0].profileImage:""}
                    name="hunfa"
                    size={"sm"}
                    >

                    </Avatar>
                  </Box>
                  <Box w={"79%"} >
                    <Box>
                      {/* date */}
                      <Text fontSize={"14px"} textAlign={"right"}>
                        {/* {
                      chat.latestMessage?
                      gettime(chat.latestMessage.createdAt):<Text visibility={"hidden"}>6:20 pm</Text>} */}
                      {date}                     
                       </Text>
  
  
                      
                    </Box>
                    <Box>
                      
                      <HStack spacing={19}>
                        <Box w="220px"> <Text fontSize={"20px"}> 
                        Hunfa
                         {/* {chat.isGroupChat? chat.chatName:chat.users[0].name} */}
                        </Text></Box>
                        <Box   ><Badge px={"10px"} textAlign={"center"} borderRadius={"7px"} colorScheme='red'>
                            {/* {chat.unReadmessages>0?chat.unReadmessages:""} */}
                            10
                            </Badge></Box>
  
  
                      </HStack>
                     
                    </Box>
                    <Box>
                      <HStack mt={"5px"} spacing="1">
                      <Box w="220px" > <Text  fontStyle={"italic"}>

                        {/* {chat.latestMessage ? sliceLatestmsg(chat.latestMessage.messege) : "Start a conversion..."} */}
                        Start a conversion...
                      </Text></Box>
                       {/* {!chat.isGroupChat? <><CircleIcon boxSize="10px" color={onlineStatus==="Online"?'green.500':'red.500'} />
                        <Text fontSize={"12px"}>{onlineStatus}</Text></>:""} */}
                        <><CircleIcon boxSize="10px" 
                        // color={onlineStatus==="Online"?'green.500':'red.500'} 
                        color={'red.500'} 
                        />
                        <Text fontSize={"12px"}>
                            {/* {onlineStatus} */}
                            Offline
                            </Text>
                            </>
                      </HStack>
                    </Box>
  
                  </Box>
  
                </Box>
                
                <Divider py={"2px"}/>
          </>
      )
  }

export default MyChats