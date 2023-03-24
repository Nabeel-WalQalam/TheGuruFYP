import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    userInfo: [],
    userToken: null,
  },
  reducers: {
    SET_LOGGEDIN: (state, action) => {
      console.log("hi", action, state);
      state.loggedIn = true;
      state.userInfo = action.payload;
      //   state.userInfo = action;
    },

    SET_LOGOUT: (state, action) => {
      state.loggedIn = false;
      state.userInfo = null;
      //   state.userInfo = action;
    },
  },
});

export const { SET_LOGGEDIN, SET_LOGOUT } = userReducer.actions;

// export const loginUser = (payload) => (dispatch) => {
//   console.log("inside asyn: ", payload);
//   axios
//     .post(`${process.env.NEXT_PUBLIC_Host_URL}api/loginuser`, {
//       email: payload.email,
//     })
//     .then((res) => {
//       console.log("response came", res);
//       dispatch(SET_LOGGEDIN(true));
//     })
//     .catch((err) => {
//       console.log("error");
//     });
// };

export default userReducer.reducer;
