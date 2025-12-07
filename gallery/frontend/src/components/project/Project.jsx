import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from '../../service/ProjectService.jsx';
import Navbar from "../Navbar.jsx";
import ProjectCard from "./ProjectCard.jsx";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        ProjectService.get(id).then((response) => {
            setProject(response.data);
        });

        ProjectService.getFiles(id).then((response) => {
            setFiles(response.data);
            console.log(response.data);
        })
    }, [id]);

    if (!project) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="w-full h-96 overflow-hidden">
                <img
                    src={`http://localhost:8080/assets/images/projects/${project.heroImage}`}
                    className="w-full h-full object-cover object-center"
                    alt=""
                />
            </div>
            <div className="mx-32">
                <h1>{project.title}</h1>
                <h3>{project.description}</h3>
                <p>{project.descSummary}</p>
                <p>{project.created} - {project.modified}</p>
                <p>{project.user.firstName} {project.user.lastName}</p>

                <h2>Files</h2>
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                    {files.map((record) => (
                        <p>{record.filePath}</p>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Project;