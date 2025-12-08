import React from 'react'
import Navbar from "./Navbar.jsx";
import { useUser } from "../context/UserContext.jsx";
import ProjectList from "./project/ProjectList.jsx";
import ShowcaseList from "./showcase/ShowcaseList.jsx";

const Dashboard = () => {
    const { user, loading } = useUser();

    if (loading) return <div>Loading...</div>;

    if (!user) return null;

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
            {(user.type === 'Student' || user.type === 'Employer') && <ProjectList variant="dashboard" />}
            {user.type === 'Admin' && <ShowcaseList />}
            {(!['Student', 'Employer', 'Admin'].includes(user.type)) && <div>Error...</div>}
        </>
    );
};

export default Dashboard;