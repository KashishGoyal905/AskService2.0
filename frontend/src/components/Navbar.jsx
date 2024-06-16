import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import authContext from '../context/AuthContext';
import user1 from '../Images/user1.avif';

export default function Navbar() {
    const { isAuthenticated, logout, user } = useContext(authContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="navbar bg-gray-800 sticky top-0 z-20">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" to="/">AskService</Link>
            </div>
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-2 border rounded text-primary border-primary hover:text-primary-content hover:bg-primary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </button>
            </div>
            <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'} absolute lg:static top-16 right-0 bg-gray-800 w-full lg:w-auto z-30`}>
                <ul className="menu menu-vertical lg:menu-horizontal px-1 text-xl w-full lg:w-auto lg:flex lg:justify-end">
                    <li><Link to="/hire" className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Hire</Link></li>
                    <li><Link to="/apply" className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Apply For Job</Link></li>
                    <li><Link to="/about" className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>About</Link></li>
                    {isAuthenticated && user && (
                        <li>
                            <Link to={`/profile/${user._id}`} className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>
                                <div className="avatar online">
                                    <div className="w-8 rounded-full">
                                        {user.image ? <img src={user.image} alt={user.name} /> : <img src={user1} alt='Profile' />}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )}
                    {isAuthenticated ? (
                        <li><button onClick={() => { logout(); handleMenuClick(); }} className="mr-2 hover:bg-primary hover:text-primary-content">Logout</button></li>
                    ) : (
                        <li><Link to="/login" className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Login</Link></li>
                    )}
                </ul>
            </div>
        </div>
    );
}
