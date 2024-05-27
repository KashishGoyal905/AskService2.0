import { useContext } from "react";
import authContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Maid from '../Images/Maid.png'
export default function Profile() {
    const { isAuthenticated, user } = useContext(authContext);
    return (
        <>
            {!isAuthenticated && <Link to='/'>Home</Link>}
            {isAuthenticated && <div className='mt-10' >
                <h1 className='text-3xl text-center text-bold'>{user.name}'s Profile</h1>
                <div className='flex flex-row flex-wrap justify-around mt-10'>
                    <div className="card w-96 glass my-6 mx-4">
                        <figure><img src={Maid} alt="Maid" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{user.name}</h2>
                            <p>{user.email}</p>
                            <div className="card-actions justify-end">
                                <Link to='/hire/maid' ><button className="btn btn-primary">Update</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >}
        </>
    )
}
