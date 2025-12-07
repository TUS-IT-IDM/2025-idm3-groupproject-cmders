import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from '../../service/ProjectService.jsx';
import Navbar from "../Navbar.jsx";
import ProjectCard from "./ProjectCard.jsx";
import {Button} from "@fluentui/react-components";
import {DocumentRegular, DocumentPdfRegular, ImageRegular, MusicNote2Regular, VideoClipRegular} from "@fluentui/react-icons";

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

    const getFileIcon = (fileName, fileType) => {
        let type = fileType;

        if (!type && fileName) {
            const ext = fileName.split('.').pop();
            if (['mp4', 'mov', 'avi'].includes(ext)) type = 'Video';
            else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) type = 'Image';
            else if (['mp3', 'wav'].includes(ext)) type = 'Mp3';
            else if (['pdf'].includes(ext)) type = 'Pdf';
        }
        if (!type) return <DocumentRegular className="size-4"/>;

        switch (fileType) {
            case 'Video': return <VideoClipRegular className="size-4"/>;
            case 'Image': return <ImageRegular className="size-4"/>;
            case 'Mp3': return <MusicNote2Regular className="size-4"/>;
            case 'Pdf': return <DocumentPdfRegular className="size-4"/>;
            default: return <DocumentRegular className="size-4"/>;
        }
    }

    return (
        <>
            <Navbar />
            <div className="w-full h-[66vh] overflow-hidden z-0 relative">
                <img
                    src={`http://localhost:8080/assets/images/projects/${project.heroImage}`}
                    className="w-full h-full object-cover object-center"
                    alt=""
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{color: 'white'}}>
                    <div className="text-center mt-80" style={{maxWidth: '800px'}}>
                    <h1>{project.title}</h1>
                    <h3>by {project.user.firstName} {project.user.lastName}</h3>
                    <p>{project.descSummary}</p>
                    </div>
                </div>
            </div>

            <div className="mx-32">
                <div className="flex justify-between items-center mt-8 mb-8" style={{color: '#9C0D38'}}>
                    <div>
                        <p>Created: {project.created}</p>
                        <p>Modified: {project.modified}</p>
                    </div>
                    <Button appearance="primary" style={{backgroundColor: '#9C0D38', color: 'white'}}>Add to Showcase</Button>
                </div>
                <h1 className="mt-4 mb-8">Description</h1>
                <p className="mb-8">{project.description}</p>
                <h2>Files</h2>
                <div className="flex flex-row gap-4 mb-40">
                    {files.map((record) => (
                        <div className="flex justify-center items-center border-1 border-gray-400 p-2 rounded-2xl gap-2 w-fit mb-2 break-inside-avoid">
                        <div>{getFileIcon(record.filePath, record.type)}</div>
                        <p>{record.filePath}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


export default Project;