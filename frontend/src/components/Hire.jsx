import Maid from '../Images/Maid.png';
import Cook from '../Images/cook.jpg';
import Cleaning from '../Images/Cleaning.png';
import BabyCaretaker from '../Images/BabyCaretaker.png';
import Driver from '../Images/Driver.png';
import Worker from '../Images/Worker.jpg';
import { Link } from 'react-router-dom';

export default function Hire() {
    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-3xl text-bold my-5'>Choose Your Service Expert</h1>
                <hr />
            </div>
            <div className="flex flex-col flex-wrap space-around place-content-center hire">
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-full w-1/2'><img src={Maid} alt="Album" /></figure>
                    <div className="card-body h-full w-1/2">
                        <h2 className="card-title">House Maid</h2>
                        <p>Reliable and trustworthy housemaids to manage your household chores with care and efficiency.</p>
                        <div className="card-actions justify-end">
                            <Link to='maid' ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-full w-1/2'><img src={Cook} alt="Album" /></figure>
                    <div className="card-body h-full w-1/2">
                        <h2 className="card-title">Cook</h2>
                        <p>Professional cooks to prepare delicious and healthy meals tailored to your preferences.</p>
                        <div className="card-actions justify-end">
                            <Link to="/hire/cook" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-full w-1/2'><img src={Cleaning} alt="Album" /></figure>
                    <div className="card-body h-full w-1/2">
                        <h2 className="card-title">Cleaner</h2>
                        <p>Expert house cleaners to keep your home spotless and hygienic.</p>
                        <div className="card-actions justify-end">
                            <Link to="/hire/cleaner" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-full w-1/2'><img src={BabyCaretaker} alt="Album" /></figure>
                    <div className="card-body h-full w-1/2">
                        <h2 className="card-title">Baby Caretaker</h2>
                        <p>Caring and qualified babycare takers to ensure the safety and well-being of your little ones.</p>
                        <div className="card-actions justify-end">
                            <Link to="/hire/babycaretaker" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-full w-1/2'><img src={Driver} alt="Album" /></figure>
                    <div className="card-body h-full w-1/2">
                        <h2 className="card-title">Driver</h2>
                        <p>Experienced and courteous drivers for safe and comfortable transportation.</p>
                        <div className="card-actions justify-end">
                            <Link to="/hire/driver" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-full w-1/2'><img src={Worker} alt="Album" /></figure>
                    <div className="card-body h-full w-1/2">
                        <h2 className="card-title">Personal Worker</h2>
                        <p>Dedicated personal workers to assist you with various tasks and personal needs efficiently.</p>
                        <div className="card-actions justify-end">
                            <Link to="/hire/perosnalworker" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
