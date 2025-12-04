import React from 'react'
import Navbar from "./Navbar.jsx";
import ShowcaseList from "./showcase/ShowcaseList.jsx";

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="flex justify-between items-center ml-32">
                <div>
                    <h1 className="text-[48px]">Hello, [Firstname]!</h1>
                    <h2 className="text-[40px]">Welcome to your dashboard.</h2>
                </div>
                <img src="/tile-pattern.svg" alt="Tile Pattern" className="w-auto max-h-[300px] mt-4 mb-8"/>
            </div>
            <ShowcaseList />
        </>
    );
};

export default Dashboard;