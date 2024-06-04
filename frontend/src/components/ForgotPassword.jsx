import { Form, Link, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
    // for navigation
    let navigate = useNavigate()

    async function handlePassUpdate(event) {
        event.preventDefault();

        // Extracting data from the Form
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        //extract email from fd
        const email = data.email;
        // Debugging
        console.log('Email for passwrod update: ', data);


        try {
            // Sending req to the backend with eamil
            const response = await fetch('http://localhost:8080/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            // Getting response back from the backend
            const resData = await response.json();
            if (!response.ok) {
                throw new Error(resData.message || 'Failed to send reset email');
            }

            toast.success('Password reset email sent!');
            event.target.reset();
            navigate('/');
        } catch (err) {
            console.log(err.message || 'Failed to send reset email')
            toast.error(err.message || 'Failed to send reset email');
            event.target.reset();
            return navigate(`/updatePass`);
        }
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
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email to receive a password reset link.
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Form className="space-y-6" method='post' onSubmit={handlePassUpdate}>
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
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Send Reset Link
                                </button>
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
    );
}
