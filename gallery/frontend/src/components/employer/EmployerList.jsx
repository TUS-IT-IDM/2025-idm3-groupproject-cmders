import React, { useEffect, useState } from 'react';
import ProjectService from '../../service/ProjectService.jsx';
import EmployerCard from './EmployerCard.jsx';
import { Button, SplitButton } from "@fluentui/react-components";
import { Link } from "react-router-dom";

const EmployerList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        ProjectService.getAll().then((response) => {
            setProjects(response.data);
        });
    }, []);

    return (
        <div className="mx-32">
            <div className="flex justify-between items-center mb-4">
                <h2>Liked Projects</h2>
                <div className="flex items-center gap-4">
                    
                    <SplitButton>Sort By</SplitButton>
                </div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {projects.map((project) => (
                    <EmployerCard
                        key = {project.id}
                        project = {project}
                    />
                ))}
            </div>
        </div>
    );
}

export default EmployerList;