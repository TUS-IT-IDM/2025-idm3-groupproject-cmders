import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowcaseService from '../../service/ShowcaseService.jsx';
import Navbar from "../Navbar.jsx";
import ProjectCard from "../project/ProjectCard.jsx";

const Showcase = () => {
    const { id } = useParams();
    const [showcase, setShowcase] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        ShowcaseService.get(id).then((response) => {
            setShowcase(response.data);
        });

        ShowcaseService.getProjects(id).then((response) => {
            setProjects(response.data);
            console.log(response.data);
        })
    }, [id]);

    if (!showcase) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="w-full h-96 overflow-hidden">
                <img
                    src={`http://localhost:8080/assets/images/showcases/${showcase.heroImage}`}
                    className="w-full h-full object-cover object-center"
                    alt=""
                />
            </div>
            <div className="mx-32">
                <h1>{showcase.title}</h1>
                <h3>{showcase.theme.name}</h3>
                <p>{showcase.description}</p>
                <p>{showcase.start} - {showcase.end}</p>
                <p>{showcase.status}</p>

                <h2>Projects</h2>
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                    {projects.map((record) => (
                        <ProjectCard
                            key={`${record.showcase.id}-${record.project.id}`}
                            project={record.project}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Showcase;