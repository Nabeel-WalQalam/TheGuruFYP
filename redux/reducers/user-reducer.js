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
    updatechatrequests:(state,action)=>{
      state.currentUser.chatRequests.push(action.payload)
    }
  },
});

export const { setCurrentUser,updatechatrequests } = userReducer.actions;



export default userReducer.reducer;
