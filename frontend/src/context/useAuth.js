import { useContext } from 'react';
import { authContext } from './AuthContext';

export const useAuth = () => {
    return useContext(authContext);
};