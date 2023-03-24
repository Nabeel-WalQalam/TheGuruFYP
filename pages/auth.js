import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Script from "next/script";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/reducers/user-reducer";
import { SET_LOGGEDIN } from "../redux/reducers/user-reducer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
useRouter;

function Auth() {
  const Router = useRouter();
  const toast = useToast();
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,

    reset,
    formState: { errors: errorsForm1 },
  } = useForm();
  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    reset2,
    formState: { errors: errorsForm2 },
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    return () => {};
  }, []);

  //sumbit Sugn-Up data
  const onSubmitForm1 = async (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_Host_URL}api/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log("response came", res);
        if (res.data.success) {
          toast({
            title: "Account Created ! Login Now",
            position: "top-left",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          reset();
          let button = document.getElementById("signIn");
          button.click();
        } else {
          toast({
            title: res.data.payload,
            status: "error",
            position: "top-left",
            duration: 6000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };

  //api for login

  const onSubmitForm2 = async (data) => {
    console.log(data);
    axios
      .post(`${process.env.NEXT_PUBLIC_Host_URL}api/loginuser`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log("response came", res);
        if (res.data.success) {
          toast({
            title: "Welcome To THE GURU",
            position: "top-left",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          reset();
          dispatch(SET_LOGGEDIN(res.data.payload.user));
          Router.push("/");
        } else {
          toast({
            title: res.data.payload,
            status: "error",
            position: "top-left",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };

  // const handleclick=()=>{
  //     const signUpButton = document.getElementById('signUp');
  //     const signInButton = document.getElementById('signIn');
  //     const container = document.getElementById('container');

  //     signUpButton.addEventListener('click', () => {
  //         container.classList.add("right-panel-active");
  //     });

  //     signInButton.addEventListener('click', () => {
  //         container.classList.remove("right-panel-active");
  //     })
  // }

  return (
    <>
      {/* <Script id="show-banner">
{`
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
`}
</Script> */}

      <style jsx>{`
        h1 {
          font-weight: bold;
          margin: 0;
        }

        h2 {
          text-align: center;
        }

        p {
          font-size: 14px;
          font-weight: 100;
          line-height: 20px;
          letter-spacing: 0.5px;
          margin: 20px 0 30px;
        }

        span {
          font-size: 12px;
        }

        a {
          color: #333;
          font-size: 14px;
          text-decoration: none;
          margin: 15px 0;
        }

        button {
          border-radius: 20px;
          border: 1px solid #ff4b2b;
          background-color: #ff4b2b;
          color: #ffffff;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 80ms ease-in;
        }

        button:active {
          transform: scale(0.95);
        }

        button:focus {
          outline: none;
        }

        button.ghost {
          background-color: transparent;
          border-color: #ffffff;
        }

        form {
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 63px;
          height: 100%;
          text-align: center;
        }

        input {
          /* background-color: #eee; */
          border-radius: 0.3rem;
          border: 0.01rem solid rgb(204, 204, 204);
          padding: 12px 15px;
          margin: 8px 0;
          width: 100%;
        }

        .container {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
          position: relative;
          overflow: hidden;
          width: 900px;
          /* max-width: 100%; */
          min-height: 600px;
          max-height: 600px;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }

        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .container.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }

        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show 0.6s;
        }

        @keyframes show {
          0%,
          49.99% {
            opacity: 0;
            z-index: 1;
          }

          50%,
          100% {
            opacity: 1;
            z-index: 5;
          }
        }

        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }

        .container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: rgb(99, 93, 255);
          background: -webkit-linear-gradient(
            to right,
            rgb(99, 93, 255),
            rgb(99, 93, 255)
          );
          background: linear-gradient(
            to right,
            rgb(99, 93, 255),
            rgb(99, 93, 255)
          );
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #ffffff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .overlay-left {
          transform: translateX(-20%);
        }

        .container.right-panel-active .overlay-left {
          transform: translateX(0);
        }

        .overlay-right {
          right: 0;
          transform: translateX(0);
        }

        .container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }

        .social-container {
          margin: 20px 0;
        }

        .social-container a {
          border: 1px solid #dddddd;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
        }

        .signintbtn {
          background-color: rgb(99, 93, 255);
          border: none;
        }

        .signintbtn:hover {
          background-color: #483dff;
        }

        .inputs:focus {
          outline: 0px;
          border-color: rgb(99, 93, 255);
          box-shadow: rgb(0 0 0 / 8%) 0px 0.1rem 0.1rem inset,
            rgb(158 128 255 / 60%) 0px 0px 0.8rem;
        }
        .inputs:hover {
          border-color: rgb(99, 93, 255);
        }
      `}</style>
      <Flex h="92vh" align={"center"} justify="center" minH={"700px"}>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={handleSubmitForm1(onSubmitForm1)}>
              <Heading mb={"1rem"} size={"lg"}>
                Create Account
              </Heading>
              {/* <div className="social-container">
                <div
                  id="g_id_onload"
                  data-client_id="558191027770-41ulkdtdb9qi8t7i90bh5r56rp50dk4u.apps.googleusercontent.com"
                  data-login_uri="https://your.domain/your_login_endpoint"
                  data-auto_prompt="false"
                ></div>
                <div
                  className="g_id_signin"
                  data-type="standard"
                  data-size="large"
                  data-theme="outline"
                  data-text="sign_in_with"
                  data-shape="rectangular"
                  data-logo_alignment="left"
                ></div>
              </div>
              <span>or use your email for registration</span>
              <input className="inputs" type="text" placeholder="Name" />

              <input className="inputs" type="email" placeholder="Email" />
              <input
                className="inputs"
                type="password"
                placeholder="Password"
              />
              {/* <button className="signintbtn">Sign Up</button> */}
              {/* <Button
                mt="20px"
                px="45px"
                py="12px"
                colorScheme={"guru"}
                w="140px"
              >
                {" "}
                Sign Up
              </Button> */}
              <Box width={"100%"}>
                <FormLabel>Username</FormLabel>
                <input
                  className="inputs"
                  placeholder="Username"
                  {...registerForm1("name", {
                    required: true,
                  })}
                />
                {errorsForm1.name && (
                  <Text fontSize={"0.8rem"} color="red.300">
                    Username is Required
                  </Text>
                )}
              </Box>
              <Box width={"100%"}>
                <FormLabel>Email</FormLabel>
                <input
                  className="inputs"
                  placeholder="Email"
                  type={"email"}
                  {...registerForm1("email", {
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                />
                {errorsForm1.email && (
                  <Text fontSize={"0.8rem"} color="red.300">
                    Email must be valid
                  </Text>
                )}
              </Box>
              <Box width={"100%"}>
                <FormLabel>Password</FormLabel>
                <input
                  className="inputs"
                  placeholder="Password"
                  {...registerForm1("password", {
                    required: true,
                    minLength: 2,
                    maxLength: 50,
                  })}
                  type="password"
                />
                {errorsForm1.password && (
                  <Text fontSize={"0.8rem"} color="red.300">
                    Password must be atleast 8 character
                  </Text>
                )}
              </Box>
              <Box my={"1rem"}>
                <Button colorScheme={"guru"} type="submit">
                  Sign Up
                </Button>
              </Box>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleSubmitForm2(onSubmitForm2)}>
              <Heading size={"lg"}>Sign in</Heading>
              <div className="social-container"> </div>
              <span>or use your account</span>
              <Box width={"100%"}>
                <FormLabel>Email</FormLabel>
                <input
                  className="inputs"
                  placeholder="Email"
                  type={"email"}
                  {...registerForm2("email", {
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                />
                {errorsForm2.email && (
                  <Text fontSize={"0.8rem"} color="red.300">
                    Email must be valid
                  </Text>
                )}
              </Box>
              <Box width={"100%"}>
                <FormLabel>Password</FormLabel>
                <input
                  className="inputs"
                  placeholder="Password"
                  {...registerForm2("password", {
                    required: true,
                    minLength: 2,
                    maxLength: 50,
                  })}
                  type="password"
                />
                {errorsForm2.password && (
                  <Text fontSize={"0.8rem"} color="red.300">
                    Password must be atleast 8 character
                  </Text>
                )}
              </Box>

              <a href="#">Forgot your password?</a>
              {/* <button className="signintbtn">Sign In</button> */}

              <Box>
                <Button
                  // onClick={handleLogin}
                  type="submit"
                  px="45px"
                  py="12px"
                  colorScheme={"guru"}
                  w="140px"
                >
                  {" "}
                  Sign In
                </Button>
              </Box>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div
                className="overlay-panel overlay-left"
                style={{ backgroundColor: "rgb(99, 93, 255)" }}
              >
                <Heading>The GURU</Heading>
                <Text py={"20px"}>Your Guru!</Text>
                {/* <button className="ghost" id="signIn">Sign In</button> */}
                <Button
                  variant={"none"}
                  color="white"
                  borderColor={"white"}
                  border="1px"
                  className="ghost"
                  id="signIn"
                  px="45px"
                  py="12px"
                  colorScheme={"guru"}
                  w="140px"
                >
                  {" "}
                  Sign In
                </Button>
              </div>
              <div
                className="overlay-panel overlay-right"
                style={{ backgroundColor: "rgb(99, 93, 255)" }}
              >
                <Heading>Have a question!</Heading>
                <Text py={"20px"}>Just ask the guru!</Text>
                {/* <button style={{backgroundColor: "rgb(99, 93, 255)" }} className="ghost" id="signUp">Sign Up</button> */}
                <Button
                  variant={"none"}
                  color="white"
                  borderColor={"white"}
                  border="1px"
                  className="ghost"
                  id="signUp"
                  px="45px"
                  py="12px"
                  colorScheme={"guru"}
                  w="140px"
                >
                  {" "}
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </>
  );
}

export default Auth;
