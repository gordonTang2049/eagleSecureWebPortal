import React, {
    useEffect,
    useState,
    createContext,
    useMemo
} from "react";

import {
    initialAuthContext,
    AuthContextType
} from './authParamList'

import { auth } from '../api/firebase/configApi'

export const AuthContext = createContext<initialAuthContext>(null)

interface AuthProviderProps { }

// useEffect(() => {
//    try to improve performance issues

//     Firebase
//         .auth()
//         .onAuthStateChanged((user) => {
//             setCurrentUser(user)
//             setPending(false)
//         });
// }, []);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<initialAuthContext>(null)

    const userProvider = useMemo<AuthContextType>(
        () => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser]
    )

    useEffect(() => {

        const subscriber = auth
            .onAuthStateChanged((user) => {
                setCurrentUser(user)
            });

        return subscriber

    }, [])

    return (
        <AuthContext.Provider
            value={userProvider}
        >
            {children}
        </AuthContext.Provider>
    );
}
