import React, {
    PropsWithChildren,
    useContext,
    useState

} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { AuthContext } from './auth/authProvider';


import { DashboardPage } from './views/dashboardPage'
import { LandingPage } from './views/landingPage'
import { SignInPage } from './auth/signInPage'
import { ClockInPage } from './views/clockInPage'
import { RegisterTagsPage } from './views/registerTagsPage'


interface MainRoutingProps {}

// Props ================================================================
const PrivateRoute = ({ component, ...rest }: any) => {

    const currentUser = useContext(AuthContext)

    const routeComponent = (props: any) => (

        //******* Need to fix  *******
        Object.values(currentUser)[0]
            ? React.createElement(component, props)
            : <Redirect to="/signin" />

    );

    return <Route {...rest} render={routeComponent} />;
};
// Props ================================================================

export const MainRouting: React.FC<MainRoutingProps> = () => {
    return (

        <Router>

            <Switch>
                <Route component={LandingPage} path="/" exact />
                <Route component={SignInPage} path="/signin" exact />
                <PrivateRoute component={DashboardPage} path="/dashboard" exact />
                <PrivateRoute component={ClockInPage} path="/clockIn" exact />
                <PrivateRoute component={RegisterTagsPage} path="/registerTags" exact />
            </Switch>

        </Router>
    );
}



// const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {


//     return (

//         <Route {...rest} render={props => (
//             { currentUser }
//                 ? <Component {...props} />
//                 : <Redirect to="/signin" />
//         )} />
//     )
// }

// (JSX attribute) path: string
// Type '{ component: FC<DashboardPageProps>;
// path: string; exact: true; }' is not assignable 
// to type 'IntrinsicAttributes & MainRoutingProps & { children?: ReactNode; }'.
// Property 'path' does not exist on 
// type 'IntrinsicAttributes & MainRoutingProps & { children?: ReactNode; }'.ts(2322)