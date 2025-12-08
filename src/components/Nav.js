import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {updateShowMenu, updateShowSidebar} from "../store/user/userSlice";
import GridViewIcon from '@mui/icons-material/GridView';
import TopicIcon from '@mui/icons-material/Topic';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Button from "@mui/material/Button";
import TodayIcon from '@mui/icons-material/Today';

export default function Nav() {
    const location = useLocation();
    const {pathname} = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser)
    const [openPersonnel, setOpenPersonnel] = useState(true);
    const [openDossier, setOpenDossier] = useState(true);
    const [openAdministrative, setOpenAdministrative] = useState(true);
    const [openAccountant, setOpenAccountant] = useState(true);
    const [openSale, setOpenSale] = useState(true);
    const [openIT, setOpenIT] = useState(true);
    const handleClickPersonnel = () => {
        setOpenPersonnel(!openPersonnel);
    };
    const handleClickAccountant = () => {
        setOpenAccountant(!openAccountant);
    };
    const handleClickAdministrative = () => {
        setOpenAdministrative(!openAdministrative);
    };
    const handleClickSale = () => {
        setOpenSale(!openSale);
    };
    const handleClickIT = () => {
        setOpenIT(!openIT);
    };

    useEffect(() => {
        if (pathname == '/') navigate('/schedule');

    }, [pathname])

    const touchMenu = () => {
        dispatch(updateShowMenu(!currentUser.showMenu))
    }


    return (
        <nav className={`sidebar`}>
            <div className={'logo'}>
                <a href={'#'}><img style={{width: '100%'}}
                                   src={require('../assets/img/logodai.png')}/></a>

            </div>
            {currentUser.isSignIn?'':<Box sx={{display:'flex',justifyContent:'center'}}>
                <Button variant="contained"
                        onClick={() => {
                            navigate(`/login?redirect=${location.pathname+location.search}`)
                        }}
                        sx={{
                            width:'200px',
                            background: 'linear-gradient(270deg, rgb(22, 173, 91) 1.34%, rgb(32, 144, 94) 100%);',
                            ':hover': {
                                background: 'linear-gradient(270deg, rgb(22, 173, 91) 1.34%, rgb(32, 144, 94) 100%);', // theme.palette.primary.main
                                color: 'white',
                            },
                        }}>Đăng nhập</Button>
            </Box>}

            <hr/>
            <div style={{marginTop: "10px"}}>
                <ul>
                    <NavLink className={'nav-link menu-parent'} isActive={true} to={'schedule'} end
                             onClick={() => dispatch(updateShowSidebar(false))}>
                        <li>
                            <div className={'nav-item'}>
                                <div className={'nav-item-name '}><TodayIcon></TodayIcon>
                                    Lịch hẹn
                                </div>
                            </div>
                        </li>
                    </NavLink>


                    {/*{*/}
                    {/*    currentUser.roles.includes('view_document') ?*/}
                    {/*        <NavLink className={'nav-link menu-parent'} isActive={true} to={'book'} end*/}
                    {/*                 onClick={isMobile ? touchMenu : ''}>*/}
                    {/*            <li>*/}
                    {/*                <div className={'nav-item'}>*/}
                    {/*                    <div className={'nav-item-name '}><TopicIcon></TopicIcon>*/}
                    {/*                        Sách đã mượn*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </li>*/}
                    {/*        </NavLink> : ''*/}
                    {/*}*/}

                    {/*{currentUser.roles.includes('view_dossier') ?*/}
                    {/*    <NavLink className={'nav-link nolight menu-parent'}>*/}
                    {/*        <li onClick={() => {*/}
                    {/*            setOpenDossier(e => !e)*/}
                    {/*        }}>*/}
                    {/*            <div className={'nav-item'} style={{width: '100%', color: 'white'}}>*/}
                    {/*                <div className={'nav-item-name '}>*/}
                    {/*                    <FolderCopyIcon></FolderCopyIcon>*/}
                    {/*                    Tài liệu*/}
                    {/*                </div>*/}
                    {/*                {openDossier ? <ExpandLess/> : <ExpandMore/>}*/}
                    {/*            </div>*/}
                    {/*        </li>*/}
                    {/*    </NavLink> : ''*/}
                    {/*}*/}
                    {/*<Collapse in={openDossier} timeout="auto" unmountOnExit>*/}
                    {/*    <ul style={{padding: '0px 20px'}}>*/}
                    {/*        {currentUser.roles.includes('view_dossier') ?*/}
                    {/*            <NavLink className={'nav-link'} to={'dossier/manage'}*/}
                    {/*                     onClick={isMobile ? touchMenu : ''}>*/}
                    {/*                <li>*/}
                    {/*                    <div className={'nav-item li-child'}>*/}
                    {/*                        <div className={'nav-item-name'}><FolderIcon/>*/}
                    {/*                            Sách giấy*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </li>*/}
                    {/*            </NavLink> : ''*/}
                    {/*        }*/}
                    {/*    </ul>*/}
                    {/*    <ul style={{padding: '0px 20px'}}>*/}
                    {/*        {currentUser.roles.includes('view_dossier') ?*/}
                    {/*            <NavLink className={'nav-link'} to={'dossier/organization'}*/}
                    {/*                     onClick={isMobile ? touchMenu : ''}>*/}
                    {/*                <li>*/}
                    {/*                    <div className={'nav-item li-child'}>*/}
                    {/*                        <div className={'nav-item-name'}><FolderIcon/>*/}
                    {/*                            Sách điện tử*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </li>*/}
                    {/*            </NavLink> : ''*/}
                    {/*        }*/}
                    {/*    </ul>*/}
                    {/*    <ul style={{padding: '0px 20px'}}>*/}
                    {/*        {currentUser.roles.includes('loan_dossier') ?*/}
                    {/*            <NavLink className={'nav-link'} to={'dossier/loan'}*/}
                    {/*                     onClick={isMobile ? touchMenu : ''}>*/}
                    {/*                <li>*/}
                    {/*                    <div className={'nav-item li-child'}>*/}
                    {/*                        <div className={'nav-item-name'}><FolderIcon/>*/}
                    {/*                            Sách nói*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </li>*/}
                    {/*            </NavLink> : ''*/}
                    {/*        }*/}
                    {/*    </ul>*/}
                    {/*    /!*<ul style={{padding: '0px 20px'}}>*!/*/}
                    {/*    /!*    {currentUser.roles.includes('view_dossier') ?*!/*/}
                    {/*    /!*        <NavLink className={'nav-link'} to={'dossier/share'}*!/*/}
                    {/*    /!*                 onClick={isMobile ? touchMenu : ''}>*!/*/}
                    {/*    /!*            <li>*!/*/}
                    {/*    /!*                <div className={'nav-item li-child'}>*!/*/}
                    {/*    /!*                    <div className={'nav-item-name'}><FolderIcon/>*!/*/}
                    {/*    /!*                        Hồ sơ được chia sẻ*!/*/}
                    {/*    /!*                    </div>*!/*/}
                    {/*    /!*                </div>*!/*/}
                    {/*    /!*            </li>*!/*/}
                    {/*    /!*        </NavLink> : ''*!/*/}
                    {/*    /!*    }*!/*/}
                    {/*    /!*</ul>*!/*/}
                    {/*    <ul style={{padding: '0px 20px'}}>*/}
                    {/*        {currentUser.roles.includes('view_dossier') ?*/}
                    {/*            <NavLink className={'nav-link'} to={'dossier/transfer'}*/}
                    {/*                     onClick={isMobile ? touchMenu : ''}>*/}
                    {/*                <li>*/}
                    {/*                    <div className={'nav-item li-child'}>*/}
                    {/*                        <div className={'nav-item-name'}><FolderIcon/>*/}
                    {/*                            Bài giảng điện tử*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </li>*/}
                    {/*            </NavLink> : ''*/}
                    {/*        }*/}
                    {/*    </ul>*/}
                    {/*</Collapse>*/}


                </ul>
            </div>
        </nav>
    );
};