import React, { useEffect, useState } from 'react'
import AuthService from "../service/AuthService.jsx";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    Button,
} from "@fluentui/react-components"

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.getSession()
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
    }, []);

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed: ', error);
        }
    };

    return (
        <header className="flex justify-between items-center border-b-1 border-gray-400 sticky top-0 z-50 bg-white">
            <a href="/" className="text-[25px] ml-[30px]">
                <img src="/mosaic.svg" alt="Mosaic Logo" className="h-10 w-auto"></img>
            </a>

            <nav className="flex justify-between items-center mr-[20px]">
                <a href="/"        className="py-[24px] px-[20px]">Home</a>
                <a href="/about"   className="py-[24px] px-[20px]">About</a>
                <a href="/contact" className="py-[24px] px-[20px]">Contact</a>

                {!user && <a href="/login" className="py-[24px] px-[20px]">Login</a>}
                {!user && <a href="/signup" className="py-[24px] px-[20px]">Signup</a>}
                {user && (
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <Button
                                appearance="subtle"
                                icon={
                                    <Avatar
                                        name={`${user.firstName} ${user.lastName}`}
                                        size={32}
                                    />
                                }
                                className="h-full gap-2"
                            >
                                {`${user.firstName.charAt(0)}. ${user.lastName}`}
                            </Button>
                        </MenuTrigger>
                        <MenuPopover>
                            <MenuList>
                                <MenuItem onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </MenuItem>
                                <MenuItem onClick={() => navigate("/profile-settings")}>
                                    Profile Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <span style={{color: "red"}}>Logout</span>
                                </MenuItem>
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                )}
            </nav>
        </header>
    );
};

export default Navbar;