import { createContext, useEffect, useState } from "react";

const authContext = createContext({
    isAuthenticated: '',
    userId: '',
    login: () => { },
    logout: () => { },
});

// export function authContextProvider({ children }) {
export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
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

        const intervalId = setInterval(checkTokenExpiration, 10000); // Check every 10 second

        return () => clearInterval(intervalId);
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        const tokenExpirationTime = new Date().getTime() + 60 * 60 * 1000; // 1hr  from now
        localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <authContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </authContext.Provider>
    );
}

export default authContext;