import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPEND_ACTIVE_CHAT_MESSAGES, SET_ACTIVE_CHAT, SET_CHATS_LIST, UPDATE_CHAT_BADGE, UpdateOnlineStatus, updateChatSession } from '../redux/reducers/chat-reducer';
import io from "socket.io-client";
import { useRef } from 'react';
import { updatechatrequests } from '../redux/reducers/user-reducer';


export let socket = '';


function SocketWrapper({ children }) {
    const dispatch = useDispatch()
    const activeChat = useSelector((state) => state.chatReducer.activeChat)
    const user = useSelector(state => state.userReducer.currentUser)
    const chatsList = useSelector(state => state.chatReducer.chatsList)
    const activeChatRef = useRef();
// console.log(chatsList)
    useEffect(() => {
        activeChatRef.current = activeChat

    }, [activeChat])


    const appendMsg = (msg) => {
        if (msg.chat._id === activeChatRef?.current?._id) {//

            dispatch(APPEND_ACTIVE_CHAT_MESSAGES({ message: msg }))
            const newState = chatsList.map(element => {

                if (element._id === msg.chat._id) {
                    return { ...element, latestMessage: { messege: msg.messege, createdAt: msg.createdAt } }

                }

                return element
            });

            dispatch(SET_CHATS_LIST({ chats: newState }))
        }
        else dispatch(UPDATE_CHAT_BADGE({ chat_id: msg.chat._id, badge: 1 }))
    }

    useEffect(() => {

        if (!user) return;
        const gsocket = io(`${process.env.NEXT_PUBLIC_Host_URL}`);
        socket = gsocket

        socket.on("connect", (id) => {
            console.log("connected")
            socket.emit("setup", user._id,(payload)=>{
                // console.log(payload)
                dispatch(UpdateOnlineStatus(payload))

                
            });
        })
        socket.on("disconnect", () => { console.log("disocnnected") })

        socket.on("message received", appendMsg)

        socket.on("chatRequestReceive", (fromUser) => {
            dispatch(updatechatrequests(fromUser))
        })

        socket.on("sessionEnded", (payload) => {
            dispatch(updateChatSession({ _id: payload.chat_id, status: false }))
            if (activeChatRef?.current?._id === payload.chat_id)
                dispatch(SET_ACTIVE_CHAT({ chat: { ...activeChatRef.current, sessionStatus: false } }))

        })
        socket.on("chatapprovedrecive", (payload) => {
            dispatch(updateChatSession({ _id: payload, status: true }))
            if (activeChatRef?.current?._id === payload)
                dispatch(SET_ACTIVE_CHAT({ chat: { ...activeChatRef.current, sessionStatus: true } }))

        })
        socket.on("onlineUsers", (payload) => {
          
            // console.log("onlineUsers",payload);
            dispatch(UpdateOnlineStatus(payload))

        })
        

        

        return () => {
            socket.off("connect");
            socket.off("message received")
            socket.off("chatRequestReceive")
            socket.off("disconnect")
            socket.off("sessionEnded")
            socket.off("chatapprovedrecive")
            socket.off("onlineUsers")
            
            

            socket.disconnect()
        }
    }, [user])





    return (
        <>
            {children}
        </>
    );
}


export default SocketWrapper