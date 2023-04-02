import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPEND_ACTIVE_CHAT_MESSAGES, SET_CHATS_LIST } from '../redux/reducers/chat-reducer';
import io from "socket.io-client";


export let gsocket = '';


function SocketWrapper({ children }) {
    const dispatch = useDispatch()
    const activeChat = useSelector((state) => state.chatReducer.activeChat)
    const user = useSelector(state => state.userReducer.currentUser)
    const chatsList = useSelector(state => state.chatReducer.chatsList)


    const appendMsg = (msg) => {
        if (msg.chat._id === activeChat._id) {//

            dispatch(APPEND_ACTIVE_CHAT_MESSAGES({ message: msg }))
            const newState = chatsList.map(element => {

                if (element._id === msg.chat._id) {
                    return { ...element, latestMessage: { messege: msg.messege, createdAt: msg.createdAt } }

                }

                return element
            });
            dispatch(SET_CHATS_LIST({ chats: newState }))
        }
    }

    useEffect(() => {
        if (!user) return;
        if (!gsocket) {
            const socket = io(`${process.env.NEXT_PUBLIC_Host_URL}`);
            gsocket = socket
        }
        gsocket.on("connect", (id) => {
            console.log("connected")
            gsocket.emit("setup", user._id);
        })


        gsocket.on("message received", appendMsg)
        return () => {
            gsocket.off("connect");
            gsocket.off("message received")
        }
    }, [user, activeChat])





    return (
        <>
            {children}
        </>
    );
}


export default SocketWrapper