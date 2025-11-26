import React, {useEffect, useState} from "react";
import {
    Avatar,
    Badge,
    Breadcrumbs,
    Button,
    Divider,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@mui/material";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {logout, updateShowMenu} from "../store/user/userSlice";
import GroupsIcon from '@mui/icons-material/Groups';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GridViewIcon from '@mui/icons-material/GridView';
import ComputerIcon from '@mui/icons-material/Computer';
import HistoryIcon from '@mui/icons-material/History';
import ClassIcon from '@mui/icons-material/Class';
import TopicIcon from '@mui/icons-material/Topic';

import Axios from 'axios'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {getTitleFromCodeCategory} from "../constants/utils";
import apiNotification from "../api/notification";
import ItemNotification from "./ItemNotification";
import ItemGroupNotification from "./ItemGroupNotification";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ModalChangePassword from "./ModalChangePassword";
import FolderIcon from "@mui/icons-material/Folder";
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {API_DOMAIN, DOMAIN} from "../constants/api";
const Header = () => {
    const {pathname} = useLocation();
    const [isRefresh,setIsRefresh]=useState(true);
    const [title, setTitle] = useState()
    const [listNotification, setListNotification] = useState([])
    const [totalUnreadNotification, setTotalUnreadNotification] = useState()
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const openNotification = Boolean(anchorElNotification);
    const [openModalChangePassword,setOpenModalChangePassword] = useState(false);
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleCloseModalChangePassword = () => {
      setOpenModalChangePassword(false)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const refresh = () => {
        setIsRefresh(!isRefresh)
    }
    const touchMenu = () => {
        dispatch(updateShowMenu(!currentUser.showMenu))
    }
    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };
    const handleClickNotification = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElNotification(event.currentTarget);
    };
    useEffect(() => {
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
        getNotificationApi().then(r => {
            let list = r.data;
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
    //
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getNotificationApi().then(r => {
    //             let list = r.data;
    //             let totalUnread = 0;
    //             for (let i = 0; i < list.length; i++) {
    //                 if (list[i].isRead == false) {
    //                     totalUnread++;
    //                 }
    //             }
    //             setTotalUnreadNotification(totalUnread);
    //             const result = Object.entries(list.reduce((acc, curr) => {
    //                 const date = new Date(curr.time).toISOString().slice(0, 10);
    //                 if (!acc[date]) {
    //                     acc[date] = [];
    //                 }
    //                 acc[date].push(curr);
    //                 return acc;
    //             }, {}))
    //                 .map(([date, items]) => ({
    //                     date,
    //                     items: items.sort((a, b) => new Date(b.time) - new Date(a.time))
    //                 }))
    //                 .sort((a, b) => new Date(b.date) - new Date(a.date));
    //             setListNotification(result);
    //         })
    //     }, 2000);
    //
    //     return () => clearInterval(interval);
    // }, []);
    const getNotificationApi = () => {
        return apiNotification.getNotification();
    }


    useEffect(() => {

        switch (pathname) {
            case '/user':
                setTitle(
                    <div className={'header-breadcrumb'}><GroupsIcon style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/user'}>Quản lý người dùng </NavLink>
                    </div>
                )
                break;
            case '/user/create':
                setTitle(
                    <div className={'header-breadcrumb'}><GroupsIcon style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/user'}>Quản lý người dùng </NavLink>&ensp;/&ensp;Thêm mới
                    </div>
                )
                break;
            case '/user/update':
                setTitle(
                    <div className={'header-breadcrumb'}><GroupsIcon style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/user'}>Quản lý người dùng </NavLink>&ensp;/&ensp;Cập nhật
                    </div>
                )
                break;
            case '/role/create':
                setTitle(
                    <div className={'header-breadcrumb'}><ManageAccountsIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/role'}>Quản lý quyền </NavLink>&ensp;/&ensp;Thêm mới
                    </div>
                )
                break;
            case '/role/update':
                setTitle(
                    <div className={'header-breadcrumb'}><ManageAccountsIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/role'}>Quản lý quyền </NavLink>&ensp;/&ensp;Cập nhật
                    </div>
                )
                break;
            case '/role':
                setTitle(
                    <div className={'header-breadcrumb'}><ManageAccountsIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/role'}>Quản lý quyền </NavLink>
                    </div>
                )
                break;
            case '/role/permission':
                setTitle(
                    <div className={'header-breadcrumb'}><ManageAccountsIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/role'}>Quản lý quyền </NavLink>&ensp;/&ensp;Phân quyền
                    </div>
                )
                break;
            case '/email':
                setTitle(
                    <div className={'header-breadcrumb'}><HistoryIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/role'}>Cấu hình mail server</NavLink>
                    </div>
                )
                break;
                case '/login-history':
                setTitle(
                    <div className={'header-breadcrumb'}><HistoryIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/role'}>Nhật ký đăng nhập</NavLink>
                    </div>
                )
                break;
            case '/organization':
                setTitle(
                    <div className={'header-breadcrumb'}><CorporateFareIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>Cơ cấu tổ chức</NavLink>
                    </div>
                )
                break;
            case '/dossier':
                setTitle(
                    <div className={'header-breadcrumb'}><CorporateFareIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier'}>Quản lý hồ sơ</NavLink>
                    </div>
                )
                break;
                case '/dossier/manage':
                setTitle(
                    <div className={'header-breadcrumb'}><FolderIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier/manage'}>Hồ sơ của tôi</NavLink>
                    </div>
                )
                break;
            case '/dossier/manage/create':
                setTitle(
                    <div className={'header-breadcrumb'}><FolderIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier/manage'}>Hồ sơ của tôi</NavLink>&ensp;/&ensp;Thêm mới
                    </div>
                )
                break;
            case '/dossier/manage/update':
                setTitle(
                    <div className={'header-breadcrumb'}><FolderIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier/manage'}>Hồ sơ của tôi</NavLink>&ensp;/&ensp;Cập nhật
                    </div>
                )
                break;
            case '/document':
                setTitle(
                    <div className={'header-breadcrumb'}><TopicIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier'}>Quản lý văn bản</NavLink>
                    </div>
                )
                break;
            case '/document/create':
                setTitle(
                    <div className={'header-breadcrumb'}><TopicIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier'}>Quản lý văn bản</NavLink>&ensp;/&ensp;Thêm mới
                    </div>
                )
                break;
            case '/document/update':
                setTitle(
                    <div className={'header-breadcrumb'}><TopicIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier'}>Quản lý văn bản</NavLink>&ensp;/&ensp;Cập nhật
                    </div>
                )
                break;
            case '/expense':
                setTitle(
                    <div className={'header-breadcrumb'}><LocalAtmIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/expense'}>Chi phí</NavLink>
                    </div>
                )
                break;
            case '/expense/create':
                setTitle(
                    <div className={'header-breadcrumb'}><LocalAtmIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/expense'}>Chi phí</NavLink>&ensp;/&ensp;Thêm mới
                    </div>
                )
                break;
            case '/expense/update':
                setTitle(
                    <div className={'header-breadcrumb'}><LocalAtmIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/expense'}>Chi phí</NavLink>&ensp;/&ensp;Cập nhật
                    </div>
                )
                break;
            case '/group-dossier':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>{getTitleFromCodeCategory("GroupDossier")}</NavLink>
                    </div>
                )
                break;
            case '/storage-time':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>{getTitleFromCodeCategory("StorageTime")}</NavLink>
                    </div>
                )
                break;
            case '/security':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>{getTitleFromCodeCategory("Security")}</NavLink>
                    </div>
                )
                break;
            case '/branch':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>{getTitleFromCodeCategory("Branch")}</NavLink>
                    </div>
                )
                break;
                case '/urgency':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/urgency'}>{getTitleFromCodeCategory("Urgency")}</NavLink>
                    </div>
                )
                break;
                case '/type-document':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/type-document'}>{getTitleFromCodeCategory("TypeDocument")}</NavLink>
                    </div>
                )
                break;
                case '/form-document':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/form-document'}>{getTitleFromCodeCategory("FormDocument")}</NavLink>
                    </div>
                )
                break;
            case '/repository':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/repository'}>Quản lý kho</NavLink>
                    </div>
                )
                break;


            //    create
            case '/group-dossier/create':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/clue'}>{getTitleFromCodeCategory("GroupDossier")}</NavLink>&ensp;/&ensp;Thêm mới
                    </div>
                )
                break;
            case '/storage-time/create':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink
                            to={'/organization'}>{getTitleFromCodeCategory("StorageTime")}</NavLink>&ensp;/&ensp;Thêm
                        mới
                    </div>
                )
                break;
            case '/security/create':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>{getTitleFromCodeCategory("Security")}</NavLink>&ensp;/&ensp;Thêm
                        mới
                    </div>
                )
                break;
            case '/branch/create':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>{getTitleFromCodeCategory("Branch")}</NavLink>&ensp;/&ensp;Thêm
                        mới
                    </div>
                )
                break;
            case '/urgency/create':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/urgency'}>{getTitleFromCodeCategory("Urgency")}</NavLink>&ensp;/&ensp;Thêm
                        mới
                    </div>
                )
                break;
                case '/form-document/create':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/form-document'}>{getTitleFromCodeCategory("FormDocument")}</NavLink>&ensp;/&ensp;Thêm
                        mới
                    </div>
                )
                break;
                case '/type-document/create':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/type-document'}>{getTitleFromCodeCategory("TypeDocument")}</NavLink>&ensp;/&ensp;Thêm
                        mới
                    </div>
                )
                break;
            //    cập nhật
            case '/group-dossier/update':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/clue'}>{getTitleFromCodeCategory("GroupDossier")}</NavLink>&ensp;/&ensp;Cập nhật
                    </div>
                )
                break;
            case '/storage-time/update':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink
                            to={'/organization'}>{getTitleFromCodeCategory("StorageTime")}</NavLink>&ensp;/&ensp;Cập
                        nhật
                    </div>
                )
                break;
            case '/security/update':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>{getTitleFromCodeCategory("Security")}</NavLink>&ensp;/&ensp;Cập
                        nhật
                    </div>
                )
                break;
            case '/branch/update':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/organization'}>{getTitleFromCodeCategory("Branch")}</NavLink>&ensp;/&ensp;Cập
                        nhật
                    </div>
                )
                break;
                case '/urgency/update':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/urgency'}>{getTitleFromCodeCategory("Urgency")}</NavLink>&ensp;/&ensp;Cập
                        nhật
                    </div>
                )
                break;
                case '/form-document/update':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/form-document'}>{getTitleFromCodeCategory("FormDocument")}</NavLink>&ensp;/&ensp;Cập
                        nhật
                    </div>
                )
                break;
                case '/type-document/update':
                setTitle(
                    <div className={'header-breadcrumb'}><ClassIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/type-document'}>{getTitleFromCodeCategory("TypeDocument")}</NavLink>&ensp;/&ensp;Cập
                        nhật
                    </div>
                )
                break;
                case '/publish-document':
                setTitle(
                    <div className={'header-breadcrumb'}><InsertDriveFileIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/public-document'}>Văn bản phát hành</NavLink>
                    </div>
                )
                break;
                case '/dossier/organization':
                setTitle(
                    <div className={'header-breadcrumb'}><FolderIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier/organization'}>Hồ sơ trong đơn vị</NavLink>
                    </div>
                )
                break;
            case '/dossier/loan':
                setTitle(
                    <div className={'header-breadcrumb'}><FolderIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier/loan'}>Mượn hồ sơ</NavLink>
                    </div>
                )
                break;
                case '/dossier/transfer':
                setTitle(
                    <div className={'header-breadcrumb'}><FolderIcon
                        style={{marginRight: '5px', color: "#F16F21"}}/>
                        <NavLink to={'/dossier/transfer'}>Hồ sơ tiếp nhận</NavLink>
                    </div>
                )
                break;
            default:
                setTitle(<div></div>)
        }
    }, [pathname])
    return (
        <header className={'header'}>
            <ModalChangePassword openModal={openModalChangePassword} handleCloseModal={handleCloseModalChangePassword}></ModalChangePassword>
            <div style={{display: "flex", justifyContent: 'space-between', width: '100%'}}>
                <div className={'header-left'}>
                    <IconButton onClick={touchMenu}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    {title}


                </div>
                <div className={'header-right'}>
                    <div style={{marginRight:'20px'}}>
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
                            <NotificationsActiveOutlinedIcon id={'icon-notification'} onClick={handleClickNotification}
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
                                <div className={'table-content-title'} style={{marginBottom: '5px',paddingLeft:'5px'}}>
                                    Thông báo
                                </div>
                                <Divider/>
                                {
                                    listNotification.length == 0 ?
                                        <div className="no-notification">
                                            <div style={{textAlign: 'center'}}>
                                                <NotificationsActiveOutlinedIcon
                                                    sx={{fontSize: 35, color: '#727374'}}></NotificationsActiveOutlinedIcon>
                                                <div>
                                                    Không có thông báo
                                                </div>
                                            </div>

                                        </div> : ''
                                }
                                {
                                    listNotification.map((value, index) => (
                                        <ItemGroupNotification close={handleCloseNotification} refresh={refresh} item={value}></ItemGroupNotification>))
                                }
                            </div>

                        </Menu>
                    </div>



                    <div className={'header-right-info'}>
                        <div className={'header-right-info-fullname'}>
                            {currentUser.userInfo.fullName}
                        </div>
                        <div className={'header-right-info-job-title'}>
                            {currentUser.userInfo.jobTitle}
                        </div>
                    </div>
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
                        {/*<MenuItem >{currentUser.userInfo.fullName}</MenuItem>*/}
                        {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                        <MenuItem onClick={()=>{setOpenModalChangePassword(true)}}>Đổi mật khẩu</MenuItem>
                        <MenuItem onClick={() => dispatch(logout())}>Đăng xuất</MenuItem>
                    </Menu>
                </div>
            </div>

        </header>
    );
};

export default Header
