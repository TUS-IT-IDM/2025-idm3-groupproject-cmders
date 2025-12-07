import React, { useState, useEffect } from 'react';
import { Button, Field, Input, Dropdown, Option } from "@fluentui/react-components";
import AuthService from "../service/AuthService.jsx";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
    const navigate = useNavigate();

    const [type, setAccountType]     = useState();
    const [firstName, setFirstName]  = useState();
    const [lastName, setLastName]    = useState();
    const [email, setEmail]          = useState();
    const [password, setPassword]    = useState("");

    const [profilePicture, setProfilePicture]       = useState();     // new file (if chosen)
    const [profilePicPreview, setProfilePicPreview] = useState(null); // preview URL
    const [existingPicUrl, setExistingPicUrl]       = useState(null); // from DB

    const [loading, setLoading] = useState(true);

    // 1) Load current user on mount and prefill all fields
    useEffect(() => {
        AuthService.checkSession()
            .then(user => {
                setAccountType(user.type);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);

                if (user.profilePicture) {
                    const url = `http://localhost:8080/uploads/images/users/${user.profilePicture}`;
                    setExistingPicUrl(url);
                    setProfilePicPreview(url);
                }

                setLoading(false);
            })
            .catch(err => {
                console.error("Not logged in:", err);
                navigate("/login");
            });
    }, [navigate]);

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
            // revert to existing picture if user cancels
            setProfilePicPreview(existingPicUrl);
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
            // only send password if user typed something (blank = keep old)
            password: password || undefined,
            // for now just send a placeholder; later you’ll switch to FormData
            profilePicture: profilePicture || null,
        };

        AuthService.updateProfile(user)
            .then(() => {
                alert("Profile updated");
                navigate("/dashboard");
            })
            .catch(console.error);
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <span className="text-gray-500">Loading profile…</span>
            </div>
        );
    }

    return (
        <div className="bg-gray-600 bg-cover bg-center w-full min-h-screen flex flex-col py-8">
            <div className="flex justify-center items-center flex-1">
                <div className="bg-white w-1/2 min-h-[66vh] p-16 rounded-lg">
                    <img src="/mosaic.svg" alt="Mosaic Logo" className="h-15 w-auto mb-4"/>
                    <h1 className="mb-6">Profile Settings</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8"
                    >
                        <Field label="Account Type">
                            <Dropdown
                                placeholder="Select account type"
                                value={type}
                                selectedOptions={type ? [type] : []}
                                onOptionSelect={(e, data) => setAccountType(data.optionValue)}
                                disabled // keep role fixed
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
                                value={firstName || ""}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Field>

                        <Field label="Last Name" required>
                            <Input
                                placeholder="Enter your last name"
                                required={true}
                                value={lastName || ""}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Field>

                        <Field label="Email Address" required>
                            <Input
                                placeholder="john.doe@email.com"
                                required={true}
                                value={email || ""}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field>
                        
                        <Field label="Password (leave blank to keep current)">
                            <Input
                                type="password"
                                placeholder="**************"
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

                        <div className="flex justify-between mt-4">
                            <Button
                                type="button"
                                appearance="secondary"
                                onClick={() => navigate("/dashboard")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                appearance="primary"
                            >
                                Save changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;