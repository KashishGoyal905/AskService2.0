import { useContext, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import authContext from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(authContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        };
        console.log('user Application:', user);

        // Example of sending data to the backend
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            console.log('Failed to login');
            throw new Error('Failed to login');
        }

        const data = await response.json();
        login(data.token, data.user);
        console.log(data.message);

        // Redirect or handle success
        return navigate(`/profile/${data.user._id}`);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="flex flex-col justify-center py-12 px-6 lg:px-8 w-full max-w-md mx-auto">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to="/"><img
                        className="mx-auto h-12 w-auto"
                        src="https://img.icons8.com/ios-filled/100/carpenter.png"
                        alt="AskService Logo"
                    /></Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Create One
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Form className="space-y-6" method='post' onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <div>
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Sign in with Google</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                <path d="M44.5 20H24v8.5h11.9C34.9 34.4 30.5 38 24 38c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.2 1.2 8.4 3.2l6.3-6.3C34.6 5.4 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c10.4 0 19.2-7.4 20-17h-19.5V20z" fill="#4285F4" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Sign in with GitHub</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                <path d="M24 2C11 2 2 11.5 2 24.5 2 34.4 8.5 42.2 17.7 44.5c1.3.2 1.7-.5 1.7-1.2 0-.6-.2-2.3-.2-4.4-5.4 1.2-6.4-2.7-6.4-2.7-1-2.7-2.5-3.4-2.5-3.4-2.1-1.4.1-1.4.1-1.4 2.3.2 3.4 2.4 3.4 2.4 2 3.5 5.2 2.5 6.4 1.9.2-1.5.8-2.6 1.4-3.2-4.3-.4-8.8-2.2-8.8-9.5 0-2.2.8-4 2.2-5.4-.2-.4-.9-2.1.2-4.3 0 0 1.7-.5 5.5 2.1 1.5-.4 3.1-.6 4.7-.6s3.2.2 4.7.6c3.8-2.6 5.5-2.1 5.5-2.1 1 2.2.3 3.9.2 4.3 1.4 1.4 2.2 3.3 2.2 5.4 0 7.3-4.5 9.1-8.8 9.5.9.8 1.5 2.1 1.5 4.3 0 3.1-.2 5.5-.2 6.2 0 .6.4 1.4 1.7 1.2C39.5 42.2 46 34.4 46 24.5 46 11.5 37 2 24 2z" fill="#333" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVycGxlJTIwY29vbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
                    alt=""
                />
            </div>
        </div>
    )
}
