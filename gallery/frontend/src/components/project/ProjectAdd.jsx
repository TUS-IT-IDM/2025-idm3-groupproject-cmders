import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import { Button, Field, Input, Textarea } from "@fluentui/react-components";
import ProjectService from "../../service/ProjectService.jsx";



const ProjectAdd = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [imagePreview, setImagePreview] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState([]);
    const [descSummary, setDescSummary] = useState('');
    const [created, setCreated] = useState('');
    const [modified, setModified] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            setSelectedImage(file);
        } else {
            setImagePreview(null);
            setSelectedImage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const project = {
            id: id ? Number(id) : null,
            title,
            description,
            descSummary,
            created,
            modified
        };

        ProjectService.save(project, selectedImage)
            .then(() => navigate("/projects"))
            .catch(console.error);
    };

    useEffect(() => {
        if (id) {
            ProjectService.get(id).then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDescSummary(response.data.descSummmary);
                setCreated(response.data.created);
                setModified(response.data.modified);
                setImagePreview(`http://localhost:8080/assets/images/projects/${response.data.heroImage}`);
                setSelectedImage(response.data.heroImage);
            })
        }

    }, );

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col flex-1 border-2 border-gray-400 mx-32 my-8 p-8 gap-8 rounded-2xl"
            >
                <div className="flex flex-1 gap-8">
                    <div className="flex flex-col flex-1 gap-8 min-h-0">
                        <Field label="Title">
                            <Input
                                placeholder="e.g. Science Fair"
                                required={true}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Field>

                        <Field label="Description">
                            <Textarea
                                placeholder="Write a description..."
                                required={true}
                                resize="vertical"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                        <Field label="Description Summary">
                            <Textarea
                                placeholder="Write a short description..."
                                required={true}
                                resize="vertical"
                                value={descSummary}
                                onChange={(e) => setDescSummary(e.target.value)}
                            />
                        </Field>
                        <div className="flex-1">
                            {/*Filler*/}
                        </div>
                        <Field label="Created">
                            <Input
                                type="datetime-local"
                                required={true}
                                value={created}
                                onChange={(e) => setCreated(e.target.value)}
                            />
                        </Field>

                    </div>
                    <div className="flex flex-col flex-1 gap-8">
                        <div className="flex-1 bg-gray-200 rounded-2xl overflow-hidden">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <span className="text-gray-500">Image Preview</span>
                            )}
                        </div>
                        <Field label="Upload Image">
                            <Input
                                type="file"
                                required={!id} // only required when creating
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Field>
                        <Field label="Modified">
                            <Input
                                type="datetime-local"
                                required={true}
                                value={modified}
                                onChange={(e) => setModified(e.target.value)}
                            />
                        </Field>
                    </div>
                </div>
                <Button
                    type="submit"
                    appearance="primary"
                >
                    Save
                </Button>
            </form>
        </div>
    );
};

export default ProjectAdd