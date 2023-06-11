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
    },
    removechatrequests:(state,action)=>{
      state.currentUser.chatRequests= state.currentUser.chatRequests.filter((c)=>{
        return c._id !== action.payload
      })
    }
    
  },
});

export const { setCurrentUser,updatechatrequests,removechatrequests } = userReducer.actions;



export default userReducer.reducer;
