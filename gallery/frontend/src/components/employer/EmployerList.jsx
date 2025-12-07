import React, { useEffect, useState } from 'react';
import UserService from '../../service/UserService.jsx';
import EmployerCard from './EmployerCard.jsx';
import { SplitButton } from "@fluentui/react-components";
import AuthService from "../../service/AuthService.jsx";

const EmployerList = () => {
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const session = await AuthService.getSession();
                setUser(session.data);

                const favourites = await UserService.getFavourites(session.data.id);
                setProjects(favourites.data);
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="mx-32">
            <div className="flex justify-between items-center mb-4">
                <h2>Liked Projects</h2>
                <div className="flex items-center gap-4">
                    
                    <SplitButton>Sort By</SplitButton>
                </div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {projects.map((record) => (
                    <EmployerCard
                        key = {record.project.id}
                        project = {record.project}
                    />
                ))}
            </div>
        </div>
    );
}

export default EmployerList;