import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar.jsx";
import { Button, Field, Input, Textarea } from "@fluentui/react-components";
import ShowcaseService from "../service/ShowcaseService.jsx";
import ThemeService from "../service/ThemeService.jsx";


const ShowcaseAdd = () => {
    const [imagePreview, setImagePreview] = useState();
    const [title, setTitle] = useState('');
    const [themes, setThemes] = useState([]);
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStartDate] = useState('');
    const [end, setEndDate] = useState('');
    const [heroImage, setHeroImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const filePath = `/uploads/${file.name}`;
                setImagePreview(reader.result);
                setHeroImage(filePath);
            };

            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const showcase = {
            title,
            theme,
            description,
            start,
            end,
            heroImage
        }

        ShowcaseService.create(showcase).then(response => {
            console.log(response.data);
        });
    }

    useEffect(() => {
        ThemeService.getAll().then((response) => {
            setThemes(response.data);
        });
    }, []);

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
                        <Field label="Theme">
                            <select
                                className="border rounded p-2"
                                value={theme?.id || ""}
                                onChange={(e) => setTheme({ id: Number(e.target.value) })}
                            >
                                <option value="">Select a theme</option>
                                {themes.map(theme => (
                                    <option key={theme.id} value={theme.id}>
                                        {theme.name}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Description">
                            <Textarea
                                placeholder="Write a short description..."
                                required={true}
                                resize="vertical"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                        <div className="flex-1">

                        </div>
                        <Field label="Start Date">
                            <Input
                                type="datetime-local"
                                required={true}
                                value={start}
                                onChange={(e) => setStartDate(e.target.value)}
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
                                required={true}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Field>
                        <Field label="End Date">
                            <Input
                                type="datetime-local"
                                required={true}
                                value={end}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Field>
                    </div>
                </div>
                <Button
                    type="submit"
                    appearance="primary"
                >
                    Add Showcase
                </Button>
            </form>
        </div>
    );
};

export default ShowcaseAdd