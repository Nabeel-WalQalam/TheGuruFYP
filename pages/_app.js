import Navbar from "../components/Navbar";
import "../styles/globals.css";
import theme from "../theme.js";
import { Box, ChakraProvider } from "@chakra-ui/react";
import SideBar from "../components/sidebar/SideBar";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useRouter } from 'next/router'
import store from "../redux/store";
import { Provider } from 'react-redux';

// import "monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css";
// import "monaco-editor/esm/vs/base/browser/ui/aria/aria.css";

import React, { useEffect } from "react";

function MyApp({ Component, pageProps }) {



  const router = useRouter()
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const handleStart = (url) => {

      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])



  return (
    <>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Navbar />
          <SideBar />
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
