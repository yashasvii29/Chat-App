import React from 'react'
import {Link,NavLink } from 'react-router-dom';
import logoimg from '../../assets/conversation.png'

export default function Header2() {
    return (
        <header className="shadow  sticky z-50 top-0 ">
            <nav className="bg-[#e0b1cb] px-4 lg:px-6 py-2.5">
                <div className="flex  flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logoimg}
                            className="mr-3 h-14"
                            alt="Logo"
                        />
                        
                        <h1 className=' pl-4 text-4xl font-bold'>Chatting App</h1>
                        
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/"
                            className="text-gray-800 hover:bg-purple-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Logout
                        </Link>
                        <Link
                            to="#"
                            className="text-white bg-purple-400 hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}


