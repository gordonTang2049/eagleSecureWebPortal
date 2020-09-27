import React, {
    useContext
} from 'react'

import { AuthContext } from '../auth/authProvider';
import {
    Link
} from "react-router-dom";

interface DashboardPageProps {}

export const DashboardPage: React.FC<DashboardPageProps> = () => {
    const currentUser = useContext(AuthContext)
    return (
        <>
            <div style={{ margin: 10, }}>
                Temporary Menu List ---
                <Link to="/dashboard"> Dashboard </Link>
                <Link to="/clockIn"> Records of Clock-In </Link>
                <Link to="/registerTags"> List of Register Tags </Link>
            </div>
        
            <pre>{JSON.stringify(currentUser, null, 2)}</pre>
            

        </>
    );
}
