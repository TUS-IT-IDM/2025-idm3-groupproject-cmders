import React, {useEffect, useState} from 'react'
import AuthService from "../service/AuthService.jsx";
import Navbar from "./Navbar.jsx";
import Student from "./Student.jsx";
import Employer from "./Employer.jsx";
import Admin from "./Admin.jsx";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        AuthService.getSession()
            .then(response => setUser(response.data))
            .catch(() => {
                window.location.href = "/login";
            })
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="flex justify-between items-center ml-32">
                <div>
                    <h1 className="text-[48px]">Hello, {user.firstName}!</h1>
                    <h2 className="text-[40px]">Welcome to your dashboard.</h2>
                </div>
                <img src="/tile-pattern.svg" alt="Tile Pattern" className="w-auto max-h-[300px] mt-4 mb-8"/>
            </div>
            {user.type === 'Student' && <Student />}
            {user.type === 'Employer' && <Employer />}
            {user.type === 'Admin' && <Admin />}
            {(!['Student', 'Employer', 'Admin'].includes(user.type)) && <div>Error...</div>}
        </>
    );
};

export default Dashboard;