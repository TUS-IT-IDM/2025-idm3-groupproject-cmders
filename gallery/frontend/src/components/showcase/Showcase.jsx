import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowcaseService from '../../service/ShowcaseService.jsx';
import Navbar from "../Navbar.jsx";
import ProjectCard from "../project/ProjectCard.jsx";
import Footer from "../Footer.jsx";

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-UK', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    if (!showcase) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="w-full h-[66vh] overflow-hidden z-0 relative">
                <img
                    src={`http://localhost:8080/assets/images/showcases/${showcase.heroImage}`}
                    className="w-full h-full object-cover object-center"
                    alt=""
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{color: 'white'}}>
                    <div className="text-center mt-80" style={{maxWidth: '800px'}}>
                        <h1>{showcase.title}</h1>
                        <h3>{showcase.theme.name}</h3>
                        <p>{showcase.description}</p>
                    </div>
                </div>
            </div>
            <div className="mx-32 my-8">
                <div className="text-[#9C0D38]">
                    <p>Starts: {formatDate(showcase.start)}</p>
                    <p>Ends: {formatDate(showcase.end)}</p>
                </div>
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
            <Footer />
        </>
    );
};

export default Showcase;