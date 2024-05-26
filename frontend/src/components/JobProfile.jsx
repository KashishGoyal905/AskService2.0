import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import authContext from '../context/AuthContext'

export default function JobProfile() {
    const { isAuthenticated } = useContext(authContext);


    const [jobs, setJobs] = useState();

    // to get hold of the url
    const params = useParams();
    useEffect(() => {
        async function fetchEvents() {
            const response = await fetch(`http://localhost:8080/hire/${params.jobProfile}`);
            const resData = await response.json();
            setJobs(resData.jobs);
        }
        fetchEvents();
    }, [params.jobProfile]);

    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-3xl text-bold my-5'>{params.jobProfile}'s</h1>
                <hr />
                <div className="flex flex-col flex-wrap space-around place-content-center hire">
                    {jobs && jobs.length === 0 && <h2>No Job Profiles exits for {params.jobProfile}</h2>}
                    {jobs && jobs.length > 0 && jobs.map(job => {
                        return (<div key={job._id} className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                            <figure className='h-full w-1/2'><img src={`http://localhost:8080/uploads/images/${job.avatar}`} alt="Album" /></figure>
                            <div className="card-body h-full w-1/2">
                                <h1 className="card-title">{job.fullname}</h1>
                                <h2>+91 {job.mobilenumber}</h2>
                                <h3>{job.email}</h3>
                                <h2>{job.city}, {job.state}</h2>
                                <p>{job.about}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" disabled={!isAuthenticated}>Hire!</button>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </>
    )
}
