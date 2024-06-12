import { useEffect, useState } from "react";
import { Form, Link, useParams } from "react-router-dom";
import { useContext } from "react";
import authContext from '../context/AuthContext'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function JobProfile() {
    // To know if the user id logged in or not
    const { isAuthenticated, user } = useContext(authContext);
    // once the jobs are fetched from the db, we will re-render the component
    const [jobs, setJobs] = useState();
    // while the jobs are loading from the backend
    const [isLoading, setIsLoading] = useState(false);

    // open modal to update the job card
    let id = '';
    function handleEditJob(jobId) {
        document.getElementById('my_modal_1').showModal();
        id = jobId;
    }

    // Hnadles the update job card submission
    async function handleEditSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log('Updated Job Form Details: ', data);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/${id}`, {
                method: 'POST',
                body: fd,
            });

            const resData = await response.json();

            if (!response.ok) {
                throw new Error(resData.message || 'Failed to update job application');
            }

            const updatedJob = resData.job;
            setJobs(jobs.map(job => (job._id === id ? updatedJob : job)));
            toast.success(resData.message || 'Job updated successfully');
            document.getElementById('my_modal_1').close();
        } catch (err) {
            document.getElementById('my_modal_1').close();
            console.error("Failed to update job:", err.message);
            toast.error(err.message || "Failed to update job.");
        }
    }

    // to get hold of the url
    const params = useParams();
    useEffect(() => {
        async function fetchEvents() {
            setIsLoading(true);
            // Fetching the specific jobs form the db
            const response = await fetch(`http://localhost:8080/hire/${params.jobProfile}`);
            // converting the jobs recvieved from the db to json format
            const resData = await response.json();
            setJobs(resData.jobs);
            setIsLoading(false);
        }

        fetchEvents();
    }, [params.jobProfile]);

    // function for handling Hire event
    async function handleJobHire(jobId) {
        if (!isAuthenticated || !user) {
            toast.error('You need to be logged in to hire.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/hire/${jobId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user._id })
            });

            const resData = await response.json();
            if (!response.ok) {
                throw new Error(resData.message || 'Failed to hire the Person');
            }

            // Update the job's state to reflect the hire
            setJobs(jobs.map(job =>
                (job._id === jobId ? { ...job, hiredBy: [...job.hiredBy, user._id] } : job)
            ));
            toast.success(resData.message || 'Email for Hiring sent to the Person');
        } catch (err) {
            console.error(err.message || 'Failed to hire the Person');
            toast.error(err.message || 'Failed to hire the Person');
        }

    }

    // Funciton to handle job deletion
    async function handleJobDelete(jobId) {
        // Confirming
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            const response = await fetch(`http://localhost:8080/jobs/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData = await response.json();

            if (!response.ok) {
                console.log(resData.message || 'Failed to delete job application');
                throw new Error(resData.message || 'Failed to delete job application');
            }

            // To re-render the component
            setJobs(jobs.filter(job => job._id !== jobId));
            toast.success(resData.message || 'Job deleted successfully');
        }
        catch (err) {
            console.log("Failed to delete job:", err.message);
            toast.error(err.message || "Failed to delete job.");
        }
    }

    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-3xl my-5 uppercase font-bold'>{params.jobProfile}'s</h1>
                <hr />
                <div className="flex flex-col flex-wrap space-around place-content-center hire">
                    {/* While the data is being fetched */}
                    {isLoading &&
                        <div className="h-96">
                            <p className="relative top-40">
                                <span className="loading loading-dots loading-lg text-primary"></span>
                            </p>
                        </div>
                    }

                    {/* If there is no jobs related to specific job Profile */}
                    {jobs && jobs.length === 0 &&
                        <div className="card w-2/4 h-80 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                            <div className="card-body h-1/2 w-1/2">
                                <h2 className="text-center text-2xl mt-2">No Job Profile exists for - {params.jobProfile}</h2>
                                <div className="card-actions justify-center m-8">
                                    <Link to="/apply">
                                        <button className="btn btn-primary">Create one</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }

                    {/* If any jobs found related to specific job Profile */}
                    {jobs && jobs.length > 0 &&
                        jobs.map(job => {
                            let isHired = false;
                            if (isAuthenticated) {
                                isHired = job.hiredBy.includes(user._id);
                            }

                            return (
                                <div key={job._id} className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                                    <figure className='h-full w-1/2'><img src={`http://localhost:8080/uploads/images/${job.avatar}`} alt="Album" /></figure>
                                    <div className="card-body h-full w-1/2">
                                        <h1 className="text-right font-bold text-2xl mt-2">{job.fullname}</h1>
                                        <h2 className="text-xl">
                                            <img style={{ width: 30, height: 30, display: "inline-block", marginRight: 6 }} src="https://img.icons8.com/fluency/48/phone--v1.png" alt="phone--v1" />
                                            {job.mobilenumber}
                                        </h2>
                                        <h2 className="text-xl">
                                            <img style={{ width: 30, height: 30, display: "inline-block", marginRight: 6 }} src="https://img.icons8.com/fluency/48/new-post.png" alt="phone--v1" />
                                            {job.email}
                                        </h2>
                                        <h2 className="text-xl">
                                            <img style={{ width: 30, height: 30, display: "inline-block", marginRight: 6 }} src="https://img.icons8.com/3d-fluency/375/home.png" alt="phone--v1" />
                                            {job.city}, {job.state}
                                        </h2>
                                        <p className="text-lg">
                                            <img style={{ width: 30, height: 30, display: "inline-block", marginRight: 6 }} src="https://img.icons8.com/color/48/about.png" alt="phone--v1" />
                                            {job.about}
                                        </p>
                                        <div className="card-actions justify-end">
                                            {isAuthenticated && job.email === user.email
                                                && (<>
                                                    <button onClick={() => { handleEditJob(job._id) }}><img style={{ width: 28, height: 28, display: "inline-block", marginRight: 8, marginTop: 10 }} src="https://img.icons8.com/pastel-glyph/64/40C057/create-new--v3.png" alt="Edit_Icon" /></button>
                                                    <button onClick={() => { handleJobDelete(job._id) }}><img style={{ width: 28, height: 28, display: "inline-block", marginRight: 8, marginTop: 10 }} src="https://img.icons8.com/material-rounded/24/FA5252/trash.png" alt="Delete_Icon" /></button>
                                                </>)
                                            }
                                            {isAuthenticated && (
                                                isHired ? (
                                                    <button className="btn btn-success cursor-default">Hired!</button>
                                                ) : (
                                                    <button className="btn btn-primary" onClick={() => handleJobHire(job._id)}>Hire!</button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div >

            <dialog className="modal" id="my_modal_1">
                <div className="modal-box mt-0">
                    <Form method="post" className="space-y-0" encType="multipart/form-data" onSubmit={handleEditSubmit}>
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-4 text-center">Edit Job Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full name<span className="required-asterisk">*</span></label>
                                    <input type="text" name="fullname" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number<span className="required-asterisk">*</span></label>
                                    {/* minLength & maxLength works only on type texts and password | therefore i have to use regular expressions here */}
                                    <input type="text" name="mobilenumber" minLength={10} maxLength={10} pattern="\d{10}" title="It must contains exactly 10 digits" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email address<span className="required-asterisk">*</span></label>
                                    {user
                                        ? <>
                                            <input type="email" name="email" disabled value={user.email} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                            <input type="hidden" name="email" value={user.email} />
                                        </>
                                        : <input type="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Applying for<span className="required-asterisk">*</span></label>
                                    <select name="jobRole" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase">
                                        <option>maid</option>
                                        <option>cook</option>
                                        <option>cleaner</option>
                                        <option>babycaretaker</option>
                                        <option>driver</option>
                                        <option>perosnalworker</option>
                                    </select>
                                    {/* <p className="text-sm text-gray-500 m-0">Select a Job Profile</p> */}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Street address</label>
                                    <input type="text" name="address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City<span className="required-asterisk">*</span></label>
                                    <input type="text" name="city" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">State / Province</label>
                                    <input type="text" name="state" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                    <input type="text" name="postalcode" minLength={6} maxLength={6} pattern="\d{6}" title="It must contain exactly 6 digits" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Profile Picture<span className="required-asterisk">*</span></label>
                                    <input type="file" name="avatar" accept=".jpg,.png,.jpeg" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">About<span className="required-asterisk">*</span></label>
                                    <textarea name="about" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3" placeholder="Write a few words about yourself."></textarea>
                                    <p className="text-sm text-gray-500">This will help people to know about you.</p>

                                </div>

                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            {isAuthenticated
                                ? <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
                                : <Link to='/login' className="btn btn-primary">Login to Update</Link>}
                        </div>
                    </Form>
                </div>
            </dialog>
        </>
    )
}
