import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from '../../service/ProjectService.jsx';
import Navbar from "../Navbar.jsx";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        ProjectService.get(id).then((response) => {
            setProject(response.data);
        });
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
                {/*<p>{project.user.firstName} {project.user.lastName}</p>*/}
            </div>
        </>
    );
};

export default Project;