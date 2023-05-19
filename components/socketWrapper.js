import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPEND_ACTIVE_CHAT_MESSAGES, SET_CHATS_LIST,UPDATE_CHAT_BADGE } from '../redux/reducers/chat-reducer';
import io from "socket.io-client";
import { useRef } from 'react';


export let socket = '';


function SocketWrapper({ children }) {
    const dispatch = useDispatch()
    const activeChat = useSelector((state) => state.chatReducer.activeChat)
    const user = useSelector(state => state.userReducer.currentUser)
    const chatsList = useSelector(state => state.chatReducer.chatsList)
    const activeChatRef = useRef();


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
        else dispatch(UPDATE_CHAT_BADGE({chat_id:msg.chat._id,badge:1}))
    }

    useEffect(() => {

        if (!user) return;
        const gsocket = io(`${process.env.NEXT_PUBLIC_Host_URL}`);
        socket = gsocket

        socket.on("connect", (id) => {
            console.log("connected")
            socket.emit("setup", user._id);
        })
        socket.on("disconnect", () => { console.log("disocnnected") })

        socket.on("message received", appendMsg)
        return () => {
            socket.off("connect");
            socket.off("message received")
            socket.off("disconnect")
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