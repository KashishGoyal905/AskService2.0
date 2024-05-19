import { useParams } from "react-router-dom";

export default function JobProfile() {
    const params = useParams();
    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-3xl text-bold my-5'>Choose Your Service Expert</h1>
                <hr />
                <h1>{params.jobProfile}</h1>
            </div>
        </>
    )
}
