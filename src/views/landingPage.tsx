import React ,{
    useContext
}from 'react'
import { AuthContext } from '../auth/authProvider';
import {
    Link
} from "react-router-dom";

interface LandingPageProps {

}
export const LandingPage: React.FC<LandingPageProps> = () => {
    const currentUser = useContext(AuthContext)
         return (
             <>
                <Link to="/signin"> Sign in </Link>
                
                <pre>{JSON.stringify(currentUser, null, 2)}</pre>
                <pre>This is LandingPage</pre>
             </>
         );
}
