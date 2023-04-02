import Navbar from "../components/Navbar";
import "../styles/globals.css";
import theme from "../theme.js";
import { Box, ChakraProvider, Flex, Text, Spinner } from "@chakra-ui/react";
import SideBar from "../components/sidebar/SideBar";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter } from "next/router";
import store from "../redux/store";
import { Provider, useDispatch } from "react-redux";
import axios from "axios";

import { setCurrentUser } from "../redux/reducers/user-reducer";


import React, { useEffect, useState } from "react";
import SocketWrapper from "../components/socketWrapper";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  // let Loading = false;
  const reduxStore = store.getState((state => state))

  const router = useRouter();
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const handleStart = (url) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      //   console.log(token);
      setLoading(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_Host_URL}api/verifytoken`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          //   console.log("response came 2", res);
          if (res.data.success) {
            store.dispatch(setCurrentUser(res.data.payload.user));
          } else {
            localStorage.clear();
          }

          //   isLoading(false);
          setLoading(false);
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
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Flex
          direction={"column"}
          width={"100%"}
          height="100vh"
          justify={"center"}
          align="center"
        >
          <Spinner size="xl" thickness="15px" />
          <Text>Loading</Text>
        </Flex>
      ) : (
        <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { status: "error", duration: 5000, isClosable: true } }}>
          <Provider store={store}>
            <SocketWrapper>
              <Navbar />
              {reduxStore.userReducer.currentUser && <SideBar />}
              <Component {...pageProps} />
            </SocketWrapper>
          </Provider>
        </ChakraProvider>
      )}
    </>
  );
}

export default MyApp;
