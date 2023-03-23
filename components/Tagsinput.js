import { Box, Input,CloseButton,useDisclosure, Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import css from "../styles/home.module.css"



function Tagsinput() {
const [value, setvalue] = useState("")
const [tags, settags] = useState([ ])
const { isOpen, onToggle } = useDisclosure()
useEffect(() => {
  console.log(tags)

  
}, [tags])

const  addnewtag=()=>{
  
    if(tags.includes(value) === false){
        if(tags.length!==5)
        { 
         settags([...tags,value])
        }
    }
   
    setvalue("")
    return;
}

const removeTag=(index)=>{
 let tempTags=tags.map((tag)=>{
  return tag
 })
 
tempTags.splice(index,1);
settags(tempTags);
}
 

      return (
     <Box>
        <Input border="1px"
            borderRadius={"8px"}
            variant="outline"
            borderColor={"gray.400"}
            placeholder="Press Enter Key to add them"
            value={value}
            onChange={(e)=>{setvalue(e.target.value)}}
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    addnewtag();
                }
            }}
            _focus={{
              outline: "0px",
              borderColor: "rgb(99, 93, 255)",
              boxShadow:
                "rgb(0 0 0 / 8%) 0px 0.1rem 0.1rem inset, rgb(158 128 255 / 60%) 0px 0px 0.6rem",
            }}
            _placeholder={{ fontSize: "0.8rem", color: "gray.400" }}/>

        <Box  border={"1px"} p="1" py="2" color={"white"}>
             {tags && tags.map((tag,index)=>{
              return  (
                
              <Box  key={index} position={"relative"} display="inline-block" mx="3px" bg={"guru.400"} borderRadius="8px" p="4px" px="8px" pr={"7"} mb="5px" > {tag}  
              
              <CloseButton id={index} size='sm' position={"absolute"} right="0px" top="4px"  onClick={()=>removeTag(index)}/>
              
              </Box>
              
              
              )
             
             })}
            
        </Box>
     </Box>
      
      )
}

export default Tagsinput
