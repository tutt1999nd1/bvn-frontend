import React, {useEffect, useLayoutEffect} from "react";
import {Outlet, ScrollRestoration, useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import Nav from "../components/Nav";
import Header from "../components/Header";
import {updateRole, updateUserInfo} from "../store/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import apiUser from "../api/user";
import Header2 from "../components/Header2";
import NavBar from "../components/NavBar";
import {Box} from "@mui/material";
import ScrollToTop from "../components/ScrollToTop";


export default function Main() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser)
    useEffect(()=>{
        if(currentUser.isSignIn)
        getUserInfo().then(r=>{
            let userInfo = r.data
            dispatch(updateRole(userInfo.permissions))
            dispatch(updateUserInfo(
                {
                    "id": userInfo.id,
                    "username": userInfo.username,
                    "jobTitle": userInfo.jobTitle,
                    "phoneNumber": userInfo.phoneNumber,
                    "email": userInfo.email,
                    "fullName": userInfo.fullName,
                }
            ))
        })
    },[])
    const location = useLocation();

    // scroll to top of page after a page transition.
    useLayoutEffect(() => {
        // document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
    }, [location.pathname]);
    const getUserInfo = () => {
        return apiUser.getUserInfo(null);
    }
    return (
        <div className={'main'}>
            {/*<Nav></Nav>*/}
            <div  className={'wrapper-main'} >
                <Header2></Header2>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <NavBar></NavBar>
                </Box>
                <div className={'main-body'}>
                    {/*<ScrollToTop />*/}

                    <Outlet/>

                </div>

                {/*<Footer></Footer>*/}
            </div>


        </div>
    );
};