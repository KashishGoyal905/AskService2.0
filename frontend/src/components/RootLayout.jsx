import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <main className='overflow-hidden min-h-screen flex flex-col'>
            <div className="flex-grow">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}
