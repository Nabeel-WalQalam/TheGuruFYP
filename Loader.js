import { Flex, Progress } from "@chakra-ui/react";
import React from "react";
// import css from "./styles/loader.css"
function Loader() {
  return (
    <>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default Loader;
