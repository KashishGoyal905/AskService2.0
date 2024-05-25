import { Link } from "react-router-dom";

export default function Navbar() {
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
                        <li><Link to="/login" className="mr-2 hover:bg-primary hover:text-primary-content">Login</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
