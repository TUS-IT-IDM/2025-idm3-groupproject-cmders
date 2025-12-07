import React, { useState } from 'react'
import { Button, Field, Input, Dropdown, Option } from "@fluentui/react-components";
import AuthService from "../service/AuthService.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [accountType, setAccountType] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            type: accountType,
            fullName,
            email,
            password
        };

        AuthService.register(user)
            .then(() => navigate("/login"))
            .catch(console.error);
    }

    return (
        <div className="bg-gray-600 bg-cover bg-center w-full h-screen flex flex-col">
            <div className="flex justify-center items-center flex-1">
                <div className="bg-white w-1/2 h-2/3 p-16">
                    <img src="/mosaic.svg" alt="Mosaic Logo" className="h-15 w-auto"/>
                    <h1>Sign Up</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="gap-8"
                    >
                        <Field label="Account Type" required>
                            <Dropdown
                                placeholder="Select account type"
                                value={accountType}
                                selectedOptions={accountType ? [accountType] : []}
                                onOptionSelect={(e, data) => setAccountType(data.optionValue)}
                            >
                                <Option value="Employer">Employer</Option>
                                <Option value="Student">Student</Option>
                                <Option value="Admin">Admin</Option>
                            </Dropdown>
                        </Field>
                        <Field label="Full Name" required>
                            <Input
                                placeholder="Enter your full name"
                                required={true}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
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
                        
                        <div className="flex justify-end">
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