import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Textarea,
  Select,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
const cloudName = "da7eumrs4";
import { useRouter } from "next/router";

export default function UserProfileEdit() {
  const [imageURL, setImageURL] = useState("");
  const [disable, setDisable] = useState(false);
  let [bio, setBio] = useState("");
  const gender = useRef("");
  const city = useRef("");
  const user = useRef("");
  const institide = useRef("");
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (imageURL) {
      console.log(imageURL);
    }
  }, [imageURL]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "comfywear");

    // Upload the image to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setImageURL(data.secure_url);
  };

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setBio(inputValue);
  };

  const handleSubmission = async () => {
    if (
      gender.current == "" ||
      user.current == "" ||
      city.current == "" ||
      institide.current == ""
    ) {
      return;
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_Host_URL}api/addsignup`, {
          gender: gender.current,
          bio,
          city: city.current,
          student: user.current,
          institude: institide.current,
          imageUrl: imageURL ? imageURL : "",
          email: localStorage.getItem("findEmail"),
        })
        .then((res) => {
          console.log("response came", res);
          toast({
            title: "Account created Login now",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          router.push("/auth");
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        direction="column"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"xl"}
          // heigth="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <FormControl id="userName">
            <Stack direction={["column", "row"]} justify="center" spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  src={imageURL || "https://via.placeholder.com/50"}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="blue"
                    aria-label="remove Image"
                    onClick
                    icon={<AiOutlineCamera />}
                  />
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="bio" isRequired>
            <FormLabel>Bio</FormLabel>

            <Textarea
              value={bio}
              onChange={(e) => handleInputChange(e)}
              placeholder="Tell us about yourself"
              size="sm"
            />
          </FormControl>
          <FormControl id="gender" isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Select gender"
              onChange={(e) => (gender.current = e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Femail">Femail</option>
              <option value="gay">Gay</option>
            </Select>
          </FormControl>
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              onChange={(e) => (city.current = e.target.value)}
              placeholder="city"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="student" isRequired>
            <FormLabel>Are you student?</FormLabel>
            <RadioGroup
              defaultValue="2"
              onChange={(value) => (user.current = value)}
            >
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="yes">
                  yes
                </Radio>
                <Radio colorScheme="green" value="no">
                  no
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl id="institide" isRequired>
            <FormLabel>School / College / University</FormLabel>
            <Input
              onChange={(e) => (institide.current = e.target.value)}
              placeholder="Name of your institide"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              my="1rem"
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => handleSubmission()}
              isDisabled={disable}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
