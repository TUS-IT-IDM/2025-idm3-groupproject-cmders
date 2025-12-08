import React, { useState } from 'react'
import { Button, Field, Input } from "@fluentui/react-components";
import AuthService from "../service/AuthService.jsx";
import { useNavigate } from "react-router-dom";
import { EyeRegular, EyeOffRegular } from "@fluentui/react-icons";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
                    <img src="/mosaic.svg" alt="Mosaic Logo" className="h-15 w-auto mb-8"/>
                    <h1>Log In</h1>
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
                                type={isPasswordVisible ? "text" : "password"}
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                contentAfter={
                                    <Button
                                        appearance="transparent"
                                        icon={isPasswordVisible ? <EyeOffRegular /> : <EyeRegular />}
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                                    />
                                }
                            />
                            <div className="text-sm text-#6574A2 mt-2">
                                <a href="/forgot-password">Forgot Password?</a>
                            </div>
                        </Field>
                        <div className="flex justify-end mt-8">
                            <Button
                                type="submit"
                                appearance="primary"
                                style={{backgroundColor: '#6574A2', color: 'white'}}
                            >
                                Log In
                            </Button>
                        </div>
                    </form>
                    <p className="text-center mt-4 text-sm text-gray-600">
                        Don´t have an account yet? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;