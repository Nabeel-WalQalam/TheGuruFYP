import Navbar from "../components/Navbar";
import "../styles/globals.css";
import theme from "../theme.js";
import { Box, ChakraProvider, Flex, Text, Spinner } from "@chakra-ui/react";
import SideBar from "../components/sidebar/SideBar";
import store from "../redux/store";
import { Provider, useDispatch } from "react-redux";
import axios from "axios";
import LargeWithNewsletter from "../components/Footer";

import { setCurrentUser } from "../redux/reducers/user-reducer";

import React, { useEffect, useState } from "react";
import SocketWrapper from "../components/socketWrapper";
import Loader from "../Loader";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const reduxStore = store.getState((state) => state);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      setLoading(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_Host_URL}api/verifytoken`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            store.dispatch(setCurrentUser(res.data.payload.user));
          } else {
            localStorage.clear();
          }
          setLoading(false);
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
          {/* <Spinner size="xl" thickness="15px" />
          <Text>Loading</Text> */}
          <Loader />
        </Flex>
      ) : (
        <ChakraProvider
          theme={theme}
          toastOptions={{
            defaultOptions: {
              status: "error",
              duration: 5000,
              isClosable: true,
            },
          }}
        >
          <Provider store={store}>
            <SocketWrapper>
              <Navbar />
              {reduxStore.userReducer.currentUser && <SideBar />}
              <Component {...pageProps} />
              <LargeWithNewsletter />
            </SocketWrapper>
          </Provider>
        </ChakraProvider>
      )}
    </>
  );
}

export default MyApp;
