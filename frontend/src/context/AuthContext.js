import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Api to handle the authentication and authorization throughout the website
const authContext = createContext({
    isAuthenticated: '',
    login: () => { },
    user: null,
    update: () => { },
    logout: () => { },
});

// export function authContextProvider({ children }) {
export const AuthContextProvider = ({ children }) => {
    // isAuthenticated state to check if the user is authenticated or not
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    // user state | it will hold the details regarding the logged in user
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // extracting token and authenticated user from the localStorage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        // if both are present i am setting the state
        // it is important to do because if we refresh the website then all the state will be lost
        // that's why whenever user refresh the website gather the details from the localStorage and set it.
        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }

        // token expiration
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

        // cleanup funciton
        return () => clearInterval(intervalId);
    }, []);

    // Login funciton | as soon as the user logs in setting the details in the localStorage & state
    const login = (token, user) => {
        const tokenExpirationTime = new Date().getTime() + 60 * 60 * 1000; // 1hr  from now
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
        setUser(user);
        toast.success('Logged in successfully!');
    };

    // logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        toast.info('Logged out successfully!');
    };

    // profile update function
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