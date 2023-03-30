import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      // console.log("action", action.payload)
      state.currentUser = action.payload;
      //   state.userInfo = action;
    },
  },
});

export const { setCurrentUser } = userReducer.actions;



export default userReducer.reducer;
