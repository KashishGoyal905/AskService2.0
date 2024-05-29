import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const authContext = createContext({
    isAuthenticated: '',
    login: () => { },
    user: null,
    update: () => { },
    logout: () => { },
});

// export function authContextProvider({ children }) {
export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }

        const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
        if (tokenExpirationTime && new Date().getTime() > tokenExpirationTime) {
            logout();
        }

        const checkTokenExpiration = () => {
            const expirationTime = localStorage.getItem('tokenExpirationTime');
            if (expirationTime && new Date().getTime() > expirationTime) {
                logout();
            }
        };

        const intervalId = setInterval(checkTokenExpiration, 1000); // Check every second

        return () => clearInterval(intervalId);
    }, []);

    const login = (token, user) => {
        const tokenExpirationTime = new Date().getTime() + 60 * 60 * 1000; // 1hr  from now
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
        setUser(user);
        toast.success('Logged in successfully!');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        toast.info('Logged out successfully!');
    };

    const updateFun = (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile updated successfully!');
    }

    return (
        <authContext.Provider value={{ isAuthenticated, login, logout, updateFun, user }}>
            {children}
        </authContext.Provider>
    );
}

export default authContext;