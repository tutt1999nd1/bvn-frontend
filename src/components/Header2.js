import React, {useEffect, useState} from "react";
import {Badge, Box, Divider, Tab, Tabs} from "@mui/material";
import {a11yProps, TabPanel} from "../constants/utils";
import {Link, useLocation, useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useDispatch, useSelector} from "react-redux";
import {logout, updateShowSidebar} from "../store/user/userSlice";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ItemGroupNotification from "./ItemGroupNotification";
import SockJS from "sockjs-client";
import {API_DOMAIN} from "../constants/api";
import {Stomp} from "@stomp/stompjs";
import ModalChangePassword from "./ModalChangePassword";
import apiNotification from "../api/notification";
import PropTypes from "prop-types";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}


export default function Header2() {
    const navigate = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState(0);
    useEffect(() => {
        const currentPath = location.pathname;
        console.log("currentPath",currentPath)

        if (currentPath.includes('/schedule')){
            setTab(0);
        }
        else if (currentPath.includes('/expense')){
            setTab(1);
        }
        else if (currentPath.includes('/crash-report')){
            setTab(2);
        }
        else setTab(0);
    }, [location]);

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);

    };
    const dispatch = useDispatch();
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const openNotification = Boolean(anchorElNotification);
    const [listNotification, setListNotification] = useState([])
    const [totalUnreadNotification, setTotalUnreadNotification] = useState()
    const [anchorEl, setAnchorEl] = React.useState();
    const [isRefresh, setIsRefresh] = useState(true);
    const open = Boolean(anchorEl);
    const currentUser = useSelector(state => state.currentUser)
    const [openModalChangePassword,setOpenModalChangePassword] = useState(false);
    const refresh = () => {
        setIsRefresh(!isRefresh)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // const handleChangeTab = (event, newValue) => {
    //     setTab(newValue);
    //     if (newValue == 0) {
    //         navigate("/home")
    //     } else {
    //         navigate("/book")
    //     }
    // };


    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };
    const handleClickNotification = (event) => {
        setAnchorElNotification(event.currentTarget);
    };
    useEffect(() => {
        if(!currentUser.isSignIn)return
        const socket = new SockJS(API_DOMAIN+'ws?token='+localStorage.getItem('accessToken')+"&topic="+currentUser.userInfo.username);
        const stompClient = Stomp.over(socket);
        stompClient.connect({ Authorization: `Bearer ${localStorage.getItem('accessToken')}`}, (frame) => {
            stompClient.subscribe(`/topic/${currentUser.userInfo.username}`, (message) => {
                setIsRefresh(pr=>!pr)
            });
        });

        const handleBeforeUnload = () => {
            stompClient.disconnect();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up
        return () => {
            stompClient.disconnect();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    useEffect(() => {
        if(!currentUser.isSignIn)return
        getNotificationApi().then(r => {
            let list = r.data.filter(item=>(item.type=="loan_book" && (item.content=="accept"||item.content=="reject"||item.content=="accept_return")));
            let totalUnread = 0;
            for (let i = 0; i < list.length; i++) {
                if (list[i].isRead == false) {
                    totalUnread++;
                }
            }
            setTotalUnreadNotification(totalUnread);
            const result = Object.entries(list.reduce((acc, curr) => {
                const date = new Date(curr.time).toISOString().slice(0, 10);
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(curr);
                return acc;
            }, {}))
                .map(([date, items]) => ({
                    date,
                    items: items.sort((a, b) => new Date(b.time) - new Date(a.time))
                }))
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            setListNotification(result);
        })
    }, [isRefresh])
    const handleCloseModalChangePassword = () => {
        setOpenModalChangePassword(false)
    }
    const getNotificationApi = () => {
        return apiNotification.getNotification();
    }

    return (
        <header className={'header'}>
            <ModalChangePassword openModal={openModalChangePassword} handleCloseModal={handleCloseModalChangePassword}></ModalChangePassword>

            <AppBar position="static"
                    sx={{backgroundColor: "#1F2251",padding:{md:'0 0 0 50px',xs:'0'}}}>
                <Container maxWidth={"xxl"}>
                    <Toolbar disableGutters>
                        <Box sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}>
                            <div className={'header-logo'} sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}>
                                <a href={'/schedule'}>
                                    <img style={{width: '100%'}}
                                         src={require('../assets/img/logo-white.png')}/></a>
                            </div>
                        </Box>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                // aria-label="account of current user"
                                // aria-controls="menu-appbar"
                                // aria-haspopup="true"
                                color="inherit"
                                onClick={() => {
                                    dispatch(updateShowSidebar(true))
                                }}

                            >
                                <MenuIcon
                                />
                            </IconButton>
                            {/*<Menu*/}
                            {/*    id="menu-appbar"*/}
                            {/*    anchorEl={anchorElNav}*/}
                            {/*    anchorOrigin={{*/}
                            {/*        vertical: 'bottom',*/}
                            {/*        horizontal: 'left',*/}
                            {/*    }}*/}
                            {/*    keepMounted*/}
                            {/*    transformOrigin={{*/}
                            {/*        vertical: 'top',*/}
                            {/*        horizontal: 'left',*/}
                            {/*    }}*/}
                            {/*    open={Boolean(anchorElNav)}*/}
                            {/*    onClose={handleCloseNavMenu}*/}
                            {/*    sx={{ display: { xs: 'block', md: 'none' } }}*/}
                            {/*>*/}
                            {/*    {pages.map((page) => (*/}
                            {/*        <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
                            {/*            <Typography sx={{ textAlign: 'center' }}>{page}</Typography>*/}
                            {/*        </MenuItem>*/}
                            {/*    ))}*/}
                            {/*</Menu>*/}
                        </Box>
                        <Box sx={{display: {xs: 'flex', md: 'none'}, flexGrow: 1, mr: 2}}>
                            <div className={'header-logo'} sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}>
                                <a href={'/schedule'}>
                                    <img style={{width: '100%'}}
                                         src={require('../assets/img/logo-white.png')}/></a>
                            </div>
                        </Box>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Tabs
                                value={tab}
                                onChange={handleChangeTab}
                                aria-label="nav tabs example"
                                role="navigation"
                                sx={{
                                      '& .MuiTab-root': {
                                          color: 'white', // Màu chữ cho tất cả các tab
                                      },
                                      '& .MuiTab-root.Mui-selected': {
                                          color: '#F37021', // Màu chữ cho tab được chọn
                                      },
                                      '& .MuiTabs-indicator': {
                                          backgroundColor: '#F37021', // Màu cho đoạn gạch dưới (indicator)
                                      },
                                  }}

                            >
                                <Tab component={Link} label="Lịch hẹn" to="/schedule" />
                                {/*<Tab component={Link} label="Chi phí" to="/expense" />*/}
                                {/*<Tab component={Link} label="Báo cáo sự cố" to="/crash-report" />*/}

                            </Tabs>
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <div className={'header-right'}>
                                <div style={{marginRight: '20px',display:currentUser.isSignIn?"block":"none"}}>
                                    <Badge badgeContent={totalUnreadNotification} color={'primary'}
                                           anchorOrigin={{
                                               vertical: 'top',
                                               horizontal: 'right',
                                           }}
                                           sx={{
                                               "& .MuiBadge-badge": {
                                                   color: "white",
                                                   backgroundColor: "#D14343"
                                               }
                                           }}
                                    >
                                        <NotificationsActiveOutlinedIcon id={'icon-notification'}
                                                                         onClick={handleClickNotification}
                                            // style={{color: "white"}}
                                        ></NotificationsActiveOutlinedIcon>
                                    </Badge>
                                    <Menu
                                        id="icon-notification"
                                        anchorEl={anchorElNotification}
                                        open={openNotification}
                                        onClose={handleCloseNotification}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        // PaperProps={{
                                        //     style: {
                                        //         width: 400, // Thiết lập chiều rộng của menu ở đây
                                        //     },
                                        // }}
                                    >
                                        {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                                        {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}

                                        {/*{*/}
                                        {/*    listNotification.map((value, index) => (*/}
                                        {/*        <MenuItem><ItemNotification item={value}></ItemNotification></MenuItem>))*/}
                                        {/*}*/}
                                        <div className={'wrapper-notification'}>
                                            <div className={'table-content-title'}
                                                 style={{marginBottom: '5px', paddingLeft: '5px'}}>
                                                Thông báo
                                            </div>
                                            <Divider/>
                                            {
                                                listNotification.length == 0 ?
                                                    <div className="no-notification">
                                                        <div style={{textAlign: 'center'}}>
                                                            <NotificationsActiveOutlinedIcon
                                                                sx={{
                                                                    fontSize: 35,
                                                                    color: '#727374'
                                                                }}></NotificationsActiveOutlinedIcon>
                                                            <div>
                                                                Không có thông báo
                                                            </div>
                                                        </div>

                                                    </div> : ''
                                            }
                                            {
                                                listNotification.map((value, index) => (
                                                    <ItemGroupNotification close={handleCloseNotification}
                                                                           refresh={refresh}
                                                                           item={value}></ItemGroupNotification>))
                                            }
                                        </div>

                                    </Menu>
                                </div>
                                {
                                    currentUser.isSignIn?"":<Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                        <Button variant="contained"
                                            onClick={()=>{navigate(`/login?redirect=${location.pathname+location.search}`)}}
                                                sx={{
                                                    background: 'linear-gradient(270deg, rgb(22, 173, 91) 1.34%, rgb(32, 144, 94) 100%);',
                                                    ':hover': {
                                                        background: 'linear-gradient(270deg, rgb(22, 173, 91) 1.34%, rgb(32, 144, 94) 100%);', // theme.palette.primary.main
                                                        color: 'white',
                                                    },
                                                }}>Đăng nhập</Button>
                                    </Box>
                                }

                                {/*<div className={'header-right-info'}>*/}
                                {/*    <div className={'header-right-info-fullname'}>*/}
                                {/*        {currentUser.userInfo.fullName}*/}
                                {/*    </div>*/}
                                {/*    <div className={'header-right-info-job-title'}>*/}
                                {/*        {currentUser.userInfo.jobTitle}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {
                                    currentUser.isSignIn?
                                        <>
                                            <Avatar
                                                id={"basic-menu"}
                                                alt="Avatar"
                                                // src={require('../assets/img/avatar.jpg')}
                                                // src={imageUrl}
                                                sx={{width: 29, height: 29}}
                                                style={{cursor: 'pointer'}}
                                                onClick={handleClick}
                                            />
                                            <Menu
                                                sx={{
                                                    "& .MuiPaper-root": {
                                                        left: 'unset !important',
                                                        right: '20px'
                                                    }

                                                }}
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                                                {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                                <MenuItem >{currentUser.userInfo.fullName}</MenuItem>
                                                {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                                {/*<MenuItem onClick={() => {*/}
                                                {/*    setOpenModalChangePassword(true)*/}
                                                {/*}}>Đổi mật khẩu</MenuItem>*/}
                                                <MenuItem onClick={() => {
                                                    dispatch(logout());
                                                    navigate("/")
                                                }
                                                }>Đăng xuất</MenuItem>
                                            </Menu>
                                        </>
                                        :""
                                }



                            </div>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

        </header>
    );
}