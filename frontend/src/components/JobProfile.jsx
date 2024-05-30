import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import authContext from '../context/AuthContext'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function JobProfile() {
    // To know if the user id logged in or not
    const { isAuthenticated } = useContext(authContext);
    // once the jobs are fetched from the db, we will re-render the component
    const [jobs, setJobs] = useState();
    // while the jobs are loading from the backend
    const [isLoading, setIsLoading] = useState(false);

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
    async function handleJobHire() {
        
        toast.success('Email Sent to the Person');
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
                                            <button className="btn btn-primary" disabled={!isAuthenticated} onClick={handleJobHire}>Hire!</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        </>
    )
}
