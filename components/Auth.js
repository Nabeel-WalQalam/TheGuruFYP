import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/reducers/user-reducer";

export const Auth = ({ isLoading }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("hi");
      let token = localStorage.getItem("token");
      //   console.log(token);
      isLoading = true;
      setTimeout(() => {}, 500000);
      axios
        .get(`${process.env.NEXT_PUBLIC_Host_URL}api/verifytoken`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          //   console.log("response came 2", res);
          if (res.data.success) {
            dispatch(setCurrentUser(res.data.payload));
          } else {
            localStorage.clear();
          }
          //   isLoading(false);
          isLoading = false;
          // if (res.data.success) {
          //   toast({
          //     title: "Welcome To THE GURU",
          //     position: "top-left",
          //     status: "success",
          //     duration: 3000,
          //     isClosable: true,
          //   });
          //   reset();
          //   dispatch(setCurrentUser(res.data.payload));
          //   localStorage.setItem("token", res.data.payload.token);
          //   Router.push("/");
          // } else {
          //   toast({
          //     title: res.data.payload,
          //     status: "error",
          //     position: "top-left",
          //     duration: 3000,
          //     isClosable: true,
          //   });
          // }
        })
        .catch((err) => {
          console.log("error");
        });
    }
  }, []);

  return <div></div>;
};
