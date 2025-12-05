import React, { useEffect, useState } from 'react'
import AuthService from "../service/AuthService.jsx";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.getSession()
            .then(response => setUser(response.data))
            .catch(() => {
                setUser(null);
            })
    }, [])

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed: ', error);
        }
    };

    return (
        <header className="flex justify-between items-center border-b-2 border-gray-400 sticky top-0 z-50 bg-white">
            <a href="/" className="text-[25px] ml-[30px]">
                <img src="/mosaic.svg" alt="Mosaic Logo" className="h-10 w-auto"></img>
            </a>
            <nav className="flex justify-between items-center mr-[20px]">
                <a href="/"        className="py-[24px] px-[20px]">Home</a>
                <a href="/about"   className="py-[24px] px-[20px]">About</a>
                <a href="/contact" className="py-[24px] px-[20px]">Contact</a>
                {!user && <a href="/login" className="py-[24px] px-[20px]">Login</a>}
                {user && <a href="/dashboard" className="py-[24px] px-[20px]">Dashboard</a>}
                {user && (
                    <a
                        href="#"
                        className="py-[24px] px-[20px]"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    >
                        Logout
                    </a>
                )}
            </nav>
        </header>
    );
};

export default Navbar;