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
                <h1 className='text-center text-xl lg:text-3xl text-bold my-5'>Choose Your Service Expert</h1>
                <hr />
            </div>
            <div className="flex flex-col flex-wrap space-around place-content-center hire">
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-2/5 lg:h-full w-full lg:w-1/2'><img src={Maid} alt="Album" /></figure>
                    <div className="card-body h-3/5 lg:h-full w-full lg:w-1/2 p-4 lg:p-8">
                        <h2 className="card-title justify-center">House Maid</h2>
                        <p className='text-center'>Reliable and trustworthy housemaids to manage your household chores with care and efficiency.</p>
                        <div className="card-actions justify-center lg:justify-end">
                            <Link to='maid' ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-2/5 lg:h-full w-full lg:w-1/2'><img src={Cook} alt="Album" /></figure>
                    <div className="card-body h-3/5 lg:h-full w-full lg:w-1/2 p-4 lg:p-8">
                        <h2 className="card-title justify-center">Cook</h2>
                        <p className='text-center'>Professional cooks to prepare delicious and healthy meals tailored to your preferences.</p>
                        <div className="card-actions justify-center lg:justify-end">
                            <Link to="/hire/cook" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-2/5 lg:h-full w-full lg:w-1/2'><img src={Cleaning} alt="Album" /></figure>
                    <div className="card-body h-3/5 lg:h-full w-full lg:w-1/2 p-4 lg:p-8">
                        <h2 className="card-title justify-center">Cleaner</h2>
                        <p className='text-center'>Expert house cleaners to keep your home spotless and hygienic.</p>
                        <div className="card-actions justify-center lg:justify-end">
                            <Link to="/hire/cleaner" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-2/5 lg:h-full w-full lg:w-1/2'><img src={BabyCaretaker} alt="Album" /></figure>
                    <div className="card-body h-3/5 lg:h-full w-full lg:w-1/2 p-4 lg:p-8">
                        <h2 className="card-title justify-center">Baby Caretaker</h2>
                        <p className='text-center'>Caring and qualified babycare takers to ensure the safety and well-being of your little ones.</p>
                        <div className="card-actions justify-center lg:justify-end">
                            <Link to="/hire/babycaretaker" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-2/5 lg:h-full w-full lg:w-1/2'><img src={Driver} alt="Album" /></figure>
                    <div className="card-body h-3/5 lg:h-full w-full lg:w-1/2 p-4 lg:p-8">
                        <h2 className="card-title justify-center">Driver</h2>
                        <p className='text-center'>Experienced and courteous drivers for safe and comfortable transportation.</p>
                        <div className="card-actions justify-center lg:justify-end">
                            <Link to="/hire/driver" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
                <div className="card w-3/4 h-96 lg:card-side bg-gray-800 shadow-xl mx-5 my-8">
                    <figure className='h-2/5 lg:h-full w-full lg:w-1/2'><img src={Worker} alt="Album" /></figure>
                    <div className="card-body h-3/5 lg:h-full w-full lg:w-1/2 p-4 lg:p-8">
                        <h2 className="card-title justify-center">Personal Worker</h2>
                        <p className='text-center'>Dedicated personal workers to assist you with various tasks and personal needs efficiently.</p>
                        <div className="card-actions justify-center lg:justify-end">
                            <Link to="/hire/perosnalworker" ><button className="btn btn-primary">View Profiles</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
