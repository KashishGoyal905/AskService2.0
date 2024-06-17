import { useContext, useState } from "react";
import authContext from "../context/AuthContext";
import { Form, Link, useNavigate } from "react-router-dom";
import user1 from '../Images/user1.avif';

import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
    const { isAuthenticated, updateFun, user, logout } = useContext(authContext);
    // const user = JSON.parse(localStorage.getItem('user'));
    const [myUser, setMyUser] = useState(user);
    // Navigate
    const navigate = useNavigate();
    // while the profile is updating...
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log('Updated User Form Details: ', data);

        try {
            setIsLoading(true);
            // Note: No need to manually create an object | you can use FormData directly
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/${user._id}`, {
                method: 'POST',
                body: fd, // FormData automatically sets the correct headers
            });

            const resData = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                throw new Error(resData.message || 'Failed to update the user');
            }

            setMyUser(resData.user);
            updateFun(resData.user);
            event.target.reset();
            setIsLoading(false);
            return;
        } catch (err) {
            console.log('Failed to Update the Profile: ', err.message);
            toast.error(err.message || 'Failed to Update the Profile');
            event.target.reset();
            return redirect(`/profile/${user._id}`);
        }
    }

    // Hnadle Account Delteion
    async function handleAccDelete(userId) {
        // Confirming
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData = await response.json();

            if (!response.ok) {
                console.log(resData.message || 'Failed to delete User Account');
                setIsLoading(false);
                throw new Error(resData.message || 'Failed to delete User Account');
            }

            logout();
            navigate('/');
            setIsLoading(false);
            toast.success(resData.message || 'User Account deleted successfully');
        } catch (err) {
            console.log('Failed to delete User Account: ', err.message);
            toast.error(err.message || 'Failed to delete User Account');
        }
    }

    return (
        <>
            {!isAuthenticated && <Link to='/'>Home</Link>}
            {isAuthenticated && <div className='mt-10' >
                {/* While the data is being fetched */}
                {isLoading &&
                    <div className="loading-overlay">
                        <p className="relative">
                            {/* {console.log("Clicking...")} */}
                            <span className="loading loading-dots loading-lg text-primary"></span>
                            {/* <progress className="progress progress-primary w-56"></progress> */}
                        </p>
                    </div>
                }
                <h1 className='text-3xl text-center text-bold'>{myUser.name}'s Profile</h1>
                <hr className="mt-4" />
                <div className='flex flex-row flex-wrap justify-around mt-10'>
                    <div className="card w-96 glass my-6 mx-4">
                        {myUser.image
                            ? <figure><img src={myUser.image} alt="ProfilePic" style={{ height: 300, width: 450, }} /></figure>
                            : <figure><img src={user1} alt="ProfilePic" style={{ height: 300, width: 450, }} /></figure>}
                        <div className="card-body">
                            <h2 className="card-title">{myUser.name}</h2>
                            <p>{myUser.email}</p>
                        </div>
                    </div>
                    <div className="p-4 md:p-0">
                        <Form method="post" className="space-y-8 mt-6" encType="multipart/form-data" onSubmit={handleUpdate}>
                            <div className="bg-white shadow-md rounded-lg p-8">
                                <h2 className="text-2xl font-bold mb-4 text-center">Update Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mt-2">Email</label>
                                        <input type="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mt-2">Profile Picture</label>
                                        <input type="file" name="image" accept=".jpg,.png,.jpeg" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-center">
                                    {isAuthenticated
                                        ? <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
                                        : <Link to='/login' className="btn btn-primary">Login to Update</Link>}
                                </div>
                            </div>
                        </Form>
                        {isAuthenticated && <div className="mt-8 mb-4 flex justify-center">
                            <button className="btn btn-outline btn-error" onClick={() => handleAccDelete(myUser._id)}>Delete Account</button>
                        </div>}
                    </div>
                </div>
            </div >}
        </>
    )
}
