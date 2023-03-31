import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPEND_ACTIVE_CHAT_MESSAGES } from '../redux/reducers/chat-reducer';
import io from "socket.io-client";


export let gsocket = '';


function SocketWrapper({ children }) {
    const dispatch = useDispatch()
    const activeChat = useSelector((state) => state.chatReducer.activeChat)
    const user = useSelector(state => state.userReducer.currentUser)
    console.log(activeChat)
    console.log("render")

    const appendMsg = (msg) => {
        console.log("here")
        console.log(msg.chat._id)
        console.log(activeChat._id)
        if (msg.chat._id === activeChat._id) {
            console.log("dispatch")
            dispatch(APPEND_ACTIVE_CHAT_MESSAGES({ message: msg }))
        }
    }

    useEffect(() => {
        if (!user) return;
        if (!gsocket) {
            const socket = io("http://localhost:5000");
            gsocket = socket
        }
        gsocket.on("connect", (id) => {
            console.log("connected")
            gsocket.emit("setup", user._id);
        })


        gsocket.on("message received", (msg) => {
            console.log("received", msg)
            appendMsg(msg)

        })
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