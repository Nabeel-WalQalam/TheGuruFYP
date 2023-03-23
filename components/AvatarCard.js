import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Flex,
  Text,
  WrapItem,
} from "@chakra-ui/react";

const AvatarCard = ({ clients }) => {
  // console.log(clients);
  return (
    <>
      <Flex my={"0.7rem"} align={"center"} direction="column">
        <Avatar name={`${clients}`} />
        <Text fontSize="sm" size={"sm"} color={"white"}>
          {clients}
        </Text>
      </Flex>
    </>
  );
};

export default AvatarCard;
