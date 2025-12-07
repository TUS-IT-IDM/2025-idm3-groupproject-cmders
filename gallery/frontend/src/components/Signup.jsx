import React, { useState } from 'react'
import { Button, Field, Input } from "@fluentui/react-components";
import AuthService from "../service/AuthService.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        };

        AuthService.login(user)
            .then(() => navigate("/dashboard"))
            .catch(console.error);
    }

    return (
        <div className="bg-gray-600 bg-cover bg-center w-full h-screen flex flex-col">
            <div className="flex justify-center items-center flex-1">
                <div className="bg-white w-1/2 h-2/3 p-16">
                    <img src="/mosaic.svg" alt="Mosaic Logo" className="h-15 w-auto"/>
                    <h1>Sign up</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="gap-8"
                    >
                        <Field label="Email">
                            <Input
                                placeholder="john.doe@email.com"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field>
                        <Field label="Password">
                            <Input
                                placeholder="**************"
                                requred={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                appearance="primary"
                            >
                                Sign up
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;