import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function JobProfile() {
    const [jobs, setJobs] = useState();

    const params = useParams();
    // const value = 
    useEffect(() => {
        async function fetchEvents() {
            const response = await fetch(`http://localhost:8080/hire/${params.jobProfile}`);
            const resData = await response.json();
            setJobs(resData.jobs);
        }
        fetchEvents();
    }, []);

    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-3xl text-bold my-5'>Choose Your Service Expert</h1>
                <hr />
                <h1>{params.jobProfile}</h1>
                <h1>{jobs && jobs.length > 0 && jobs.map(job => {
                    return <li key={job._id}>{job.fullname}</li>
                })}</h1>
            </div>
        </>
    )
}
