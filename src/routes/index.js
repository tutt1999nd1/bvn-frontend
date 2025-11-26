import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation, useSearchParams} from 'react-router-dom';
import Main from "../pages/Main";

import Forbidden from "../pages/errors/forbidden";
import NotFound from "../pages/errors/notFound";
import ErrorServer from "../pages/errors/errorServer";
import Login from "../pages/authentication/login/Login";
import {useSelector} from "react-redux";
import Oauth2Success from "../pages/authentication/oauth2/OAuth2Success";
import SchedulePage from "../pages/schedule";
// import Detail from "../pages/library/detail";

// import BookLoan from "../pages/library/book-loan";


export default function RenderRoute() {
    const currentUser = useSelector(state => state.currentUser)
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (currentUser.isSignIn != null && currentUser.isSignIn !== "" && currentUser.isSignIn !== undefined) {
            isAuthenticated();
        }
    }, [currentUser])
    const isAuthenticated = () => {
        // Kiểm tra xem JWT đã được lưu trong localStorage hay không
        const isSignIn = currentUser.isSignIn;
        if (isSignIn == true) {
            return true;
        } else return false
    };
    return (
        <Routes>
            <Route
                path="/oauth2/success"
                element={<Oauth2Success></Oauth2Success>}
            />
            <Route
                path="/login"
                element={
                    isAuthenticated() ?
                        <Navigate to={searchParams.get("redirect") || "/"}/>
                        :
                    <Login/>
                }
            />
            <Route path="/" element={
                isAuthenticated() ?
                    <Main/> :
                    <Navigate to={`login?redirect=${location.pathname + location.search}`}/>
                // <Main/>
            }>
                <Route path="" element={
                    <SchedulePage></SchedulePage>
                }/>
                {/*<Route path="/home" element={*/}
                {/*    <Home></Home>*/}
                {/*}/>*/}
                <Route path="/schedule" element={
                    <SchedulePage></SchedulePage>
                }/>

                <Route path="errors/forbidden" element={<Forbidden/>}/>
                <Route path="errors/notfound" element={<NotFound/>}/>
                <Route path="errors/error-server" element={<ErrorServer/>}/>
                <Route path="*" element={<Navigate to={'/schedule'}/>}/>
            </Route>
        </Routes>
    )
}