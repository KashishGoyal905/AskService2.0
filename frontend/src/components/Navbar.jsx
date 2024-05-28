import { Link } from "react-router-dom";
import { useContext } from "react";
import authContext from '../context/AuthContext'

export default function Navbar() {
    const { isAuthenticated, logout, user } = useContext(authContext);
    // const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="sticky top-0 z-20">
            <div className="navbar bg-secondary-content">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" to="/">AskService</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 text-xl">
                        <li><Link to="/hire" className="mr-2 hover:bg-primary hover:text-primary-content">Hire</Link></li>
                        <li><Link to="/apply" className="mr-2 hover:bg-primary hover:text-primary-content">Apply For Job</Link></li>
                        <li><Link to="/about" className="mr-2 hover:bg-primary hover:text-primary-content">About</Link></li>
                        {isAuthenticated && <li><Link to={`/profile/${user._id}`} className="mr-2 hover:bg-primary hover:text-primary-content">
                            <div className="avatar online">
                                <div className="w-8 rounded-full">
                                    {user.image ? <img src={`http://localhost:8080/uploads/images/${user.image}`} alt={user.name} /> :
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='Profile' />}
                                </div>
                            </div>
                        </Link></li>}
                        {isAuthenticated
                            ? <li><button onClick={() => logout()} className="mr-2 hover:bg-primary hover:text-primary-content">Logout</button></li>
                            : <li><Link to="/login" className="mr-2 hover:bg-primary hover:text-primary-content">Login</Link></li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}
