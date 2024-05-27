import { createContext, useEffect, useState } from "react";

const authContext = createContext({
    isAuthenticated: '',
    login: () => { },
    logout: () => { },
});

// export function authContextProvider({ children }) {
export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

        const intervalId = setInterval(checkTokenExpiration, 1000); // Check every second

        return () => clearInterval(intervalId);
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        const tokenExpirationTime = new Date().getTime() + 60 * 60 * 1000; // 1hr  from now
        localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <authContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </authContext.Provider>
    );
}

export default authContext;