import React from 'react'

const Navbar = () => {
    return (
        <header className="flex justify-between items-center border-b-2 border-gray-400">

            <a href="/" className="text-[25px] ml-[30px]">
                <img src="/mosaic.svg" alt="Mosaic Logo" className="h-10 w-auto"></img>
            </a>
            <nav className="flex justify-between items-center mr-[20px]">
                <a href="/"        className="py-[24px] px-[20px]">Home</a>
                <a href="/about"   className="py-[24px] px-[20px]">About</a>
                <a href="/contact" className="py-[24px] px-[20px]">Contact</a>
                <a href="/login"   className="py-[24px] px-[20px]">Login</a>
            </nav>
        </header>
    );
};

export default Navbar;