import React from "react";
import { useQuill } from "react-quilljs";
import { Box } from "@chakra-ui/react";

import "quill/dist/quill.snow.css";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

export const Texteditor = () => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike",'code-block'],
       
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],

      [{ size: ["small", false, "large", "huge"] }],
      ["link"],
      [{ color: ["white", "Black"] }, { background: ["pink", "black", "red"] }],
    ],
  };
  const placeholder = "Enter Your Answer...";
  const { quill, quillRef } = useQuill({ modules, placeholder });

  const [vale, setvale] = useState();
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        setvale(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
  return (
    <>
      <Box
        className="textGlow"
        // width={"80%"}
        marginInline="auto"
      >
        <div className="textEditor">
          <div ref={quillRef} />
        </div>
      </Box>
    </>
  );
};
