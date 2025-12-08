import React, { useState } from 'react'
import { Button, Field, Input, Dropdown, Option } from "@fluentui/react-components";
import AuthService from "../service/AuthService.jsx";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();

    const [type, setAccountType]               = useState();
    const [firstName, setFirstName]     = useState();
    const [lastName, setLastName]       = useState();
    const [email, setEmail]             = useState();
    const [password, setPassword]       = useState();
    

    const [profilePicture, setProfilePicture]         = useState();   // raw file
    const [profilePicPreview, setProfilePicPreview]   = useState(null);   // object-URL

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result);
            };
            reader.readAsDataURL(file);

            setProfilePicture(file);
        } else {
            setProfilePicPreview(null);
            setProfilePicture(null);
        }
    };

    const handleSubmit = (e) => {
            e.preventDefault();
    
            const user = {
                type,
                firstName,
                lastName,
                email,
                password
            };
    
            AuthService.register(user, profilePicture)
                .then(() => navigate("/login"))
                .catch(console.error);
        };

    return (
        <div className="bg-gray-600 bg-cover bg-center w-full min-h-screen flex flex-col py-8">
            <div className="flex justify-center items-center flex-1">
                <div className="bg-white w-1/2 min-h-[66vh] p-16 rounded-lg">
                    <img src="/mosaic.svg" alt="Mosaic Logo" className="h-15 w-auto mb-4"/>
                    <h1 className="mb-6">Sign Up</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8"
                    >
                        <Field label="Account Type" required>
                            <Dropdown
                                placeholder="Select account type"
                                value={type}
                                selectedOptions={type ? [type] : []}
                                onOptionSelect={(e, data) => setAccountType(data.optionValue)}
                            >
                                <Option value="Employer">Employer</Option>
                                <Option value="Student">Student</Option>
                                <Option value="Admin">Admin</Option>
                            </Dropdown>
                        </Field>
                        
                        <Field label="First Name" required>
                            <Input
                                placeholder="Enter your first name"
                                required={true}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Field>

                        <Field label="Last Name" required>
                            <Input
                                placeholder="Enter your last name"
                                required={true}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Field>

                        <Field label="Email Address" required>
                            <Input
                                placeholder="john.doe@email.com"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field>
                        
                        <Field label="Password" required>
                            <Input
                                type="password"
                                placeholder="**************"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field>
                        
                        <Field label="Profile Picture">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Field>
                        
                        {profilePicPreview && (
                            <div className="flex justify-center">
                                <img
                                    src={profilePicPreview}
                                    alt="Preview"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                            </div>
                        )}

                        <div className="flex justify-end mt-4">
                            <Button
                                type="submit"
                                appearance="primary"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                    
                    <p className="text-center mt-4 text-sm text-gray-600">
                        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;