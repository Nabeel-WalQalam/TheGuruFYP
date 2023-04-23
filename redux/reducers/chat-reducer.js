import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const chatReducer = createSlice({
    name: "chat",
    initialState: {
        chatsList: [],
        activeChat: null,
        activeChatMessages: [],
        showMobileDetail: false,
        apiLoading: false,

    },
    reducers: {

        SET_CHATS_LIST: (state, action) => {
            state.chatsList = action.payload.chats;

        },


        SET_ACTIVE_CHAT: (state, action) => {
            state.activeChat = action.payload.chat
        },

        SET_ACTIVE_CHAT_MESSAGES: (state, action) => {
            state.activeChatMessages = action.payload.messages
        },

        APPEND_ACTIVE_CHAT_MESSAGES: (state, action) => {
            state.activeChatMessages.push(action.payload.message);
        },

        ADD_NEW_CHAT: (state, action) => {
            state.chatsList.unshift(action.payload.newChat);
        },

        UPDATE_CHAT_BADGE: (state, action) => {
            const newList = state.chatsList.map((chat) => {
                if (chat._id === action.payload.chat_id) {
                    if (action.payload.badge === 0) // update badge value to Zero
                        return { ...chat, badge: 0 }
                    else // increment badge value by 1
                        return { ...chat, badge: chat.badge + 1 }

                }
                return chat;
            })
            state.chatsList = newList
        },

        SET_API_LOADING: (state, action) => {
            state.apiLoading = action.payload
        },



    },
});

export const { SET_API_LOADING, UPDATE_CHAT_BADGE, ADD_NEW_CHAT, APPEND_ACTIVE_CHAT_MESSAGES, SET_ACTIVE_CHAT_MESSAGES, SET_CHATS_LIST, SET_ACTIVE_CHAT } = chatReducer.actions;





export const fetchMessages = (payload) => (dispatch) => {
    dispatch(SET_API_LOADING(true))
    const chat_id = payload.chat_id
    const token = localStorage.getItem("token");
    axios.get(`${process.env.NEXT_PUBLIC_Host_URL}api/fetchmessages`, { headers: { token: token, chat_id } })
        .then(res => {

            // console.log(res);
            if (res.data.success) {
                dispatch(SET_ACTIVE_CHAT_MESSAGES({ messages: res.data.payload }))
                dispatch(SET_API_LOADING(false))
            }
            else {
                console.log("failed")
            }
        }).catch((err) => console.log(err))




}



export default chatReducer.reducer;
