import { Link } from 'react-router-dom';
import Carousel from './Carousel';
// import Cards from './Cards';
import Maid from '../Images/Maid.png';
import Cook from '../Images/cook.jpg';
import Cleaning from '../Images/Cleaning.png';
import BabyCaretaker from '../Images/BabyCaretaker.png';
import Driver from '../Images/Driver.png';
import Worker from '../Images/Worker.jpg';

export default function Home() {
    return (
        <>
            <div className='flex home'>
                <div className='w-2/5 home_info'>
                    <h1 className='text-center mt-10 text-3xl text-white'>Comfort delivered to your doorsteps</h1>
                    <p className='text-center mt-7 text-xl'>One-step solution for all your household needs</p>
                    <p className='text-center'>
                        <Link to='/hire'>
                            <button className="btn btn-outline mt-10 bg-primary text-primary-content hover:text-white">Get Started</button>
                        </Link>
                    </p>
                </div>
                <Carousel />
            </div>
            <div className='mt-10'>
                <h1 className='text-3xl text-center text-bold'>What We Do</h1>
                <div className='flex flex-row flex-wrap justify-around mt-10'>
                    <div className="card w-96 glass my-6 mx-4">
                        <figure><img src={Maid} alt="Maid" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">House Maid</h2>
                            <p>Reliable and trustworthy housemaids to manage your household chores with care and efficiency.</p>
                            <div className="card-actions justify-end">
                                <Link to='/hire/maid' ><button className="btn btn-primary">View Profiles</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 glass my-6 mx-4">
                        <figure><img src={Cook} alt="Maid" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Cook</h2>
                            <p>Professional cooks to prepare delicious and healthy meals tailored to your preferences.</p>
                            <div className="card-actions justify-end">
                                <Link to='/hire/cook' ><button className="btn btn-primary">View Profiles</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 glass my-6 mx-4">
                        <figure><img src={Cleaning} alt="Maid" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Cleaner</h2>
                            <p>Expert house cleaners to keep your home spotless and hygienic.</p>
                            <div className="card-actions justify-end">
                                <Link to='/hire/cleaner' ><button className="btn btn-primary">View Profiles</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 glass my-6 mx-4">
                        <figure><img src={BabyCaretaker} alt="Maid" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Baby Caretaker</h2>
                            <p>Caring and qualified babycare takers to ensure the safety and well-being of your little ones.</p>
                            <div className="card-actions justify-end">
                                <Link to='/hire/babycaretaker' ><button className="btn btn-primary">View Profiles</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 glass my-6 mx-4">
                        <figure><img src={Driver} alt="Maid" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Driver</h2>
                            <p>Experienced and courteous drivers for safe and comfortable transportation.</p>
                            <div className="card-actions justify-end">
                                <Link to='/hire/driver' ><button className="btn btn-primary">View Profiles</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 glass my-6 mx-4">
                        <figure><img src={Worker} alt="Maid" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Personal Worker</h2>
                            <p>Dedicated personal workers to assist you with various tasks and personal needs efficiently.</p>
                            <div className="card-actions justify-end">
                                <Link to='/hire/perosnalworker' ><button className="btn btn-primary">View Profiles</button></Link>
                            </div>
                        </div>
                    </div>
                    {/* <Cards title={"Maid"} img={Maid} descp={"Maid available"} key={1} /> */}
                </div>
            </div>
        </>
    )
}
