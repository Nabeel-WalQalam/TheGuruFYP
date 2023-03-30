import React from 'react'
import { useEffect } from 'react';
import Navbar from './Navbar';
import SideBar from './sidebar/SideBar';

function SocketWrapper({ children }) {


    useEffect(() => {
        console.log("socket")
    }, [])


    return (
        <>
            {children}
        </>
    );
}


export default SocketWrapper