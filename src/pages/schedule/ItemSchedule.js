import moment from "moment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useNavigate} from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useContext, useEffect, useState} from "react";
import {Button, Collapse, Grid} from "@mui/material";
import {currencyFormatter} from "../../constants/utils";
import {ScheduleContext} from "./index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
export default function ItemSchedule(props) {
    const {setOpenModalUpdate,setIsUpdate,setOpenModalEdit,openModalEdit, setInfoDetail,setInfoUpdate,infoUpdate,setOpenModalRemove,setIdRemove,isFresh} = useContext(ScheduleContext);

    const navigate = useNavigate();
    const {handleCloseNotification, refresh, close, item} = props;
    const [openExpand, setOpenExpand] = useState(false);
    const getAction = (type, action) => {


    }
    useEffect(()=>{
        // setOpenExpand(false)
    },[isFresh])
    useEffect(()=>{
        console.log("tutt item",item)
    },[item])
    const openDetail = () => {
        setInfoDetail(item)
        setOpenModalUpdate(true)
    }
    const openUpdate = () => {
        setIsUpdate(true)
        setInfoUpdate(item)
        setOpenModalEdit(true)
    }
    const handleClick = (id) => {
        setOpenExpand(e => !e)
    }

    return (
        <div className={`item-schedule ${openExpand ? 'item-schedule-active' : ''}`}>
            <div className={'item-schedule-content'} onClick={() => {
                handleClick(item.id)
            }}>
                <div>
                    <div className={'item-notification-content'}>
                        <div className={'item-notification-content'}>
                            {item.name}
                        </div>

                    </div>
                    <div className={'item-notification-time'} style={{color: '#656d9a'}}>
                        {moment(item.date).format('HH:mm DD/MM/YYYY')}
                    </div>
                </div>


                <div style={{textAlign: 'right'}}>
                    {openExpand ? <ExpandLess sx={{color: '#999'}}/> : <ExpandMore sx={{color: '#999'}}/>}

                </div>

            </div>
            <div className={'item-schedule-content-detail'}>

                <Collapse in={openExpand} timeout="auto" unmountOnExit>
                    <div className={'group-btn'}>
                        <div className={'item-schedule-content-detail-title'}>
                            Thông tin chi tiết
                        </div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <DriveFileRenameOutlineIcon style={{color: "#1e1e44"}}
                                                        onClick={() => {
                                                            openUpdate();
                                                        }}></DriveFileRenameOutlineIcon>
                            <DeleteForeverIcon
                                fontSize={'small'}
                                color={"error"}
                                onClick={() => {
                                    setIdRemove(item.id)
                                    setOpenModalRemove(true)
                                }}
                            ></DeleteForeverIcon>

                        </div>

                    </div>

                    <Grid container spacing={1} sx={{marginTop:'5px'}}>
                        <Grid item xs={12}>
                            <div className={'row-detail'}>
                                <div className={'row-detail-label'}>Tên khách hàng:</div>
                                <div className={'row-detail-info'}>
                                    {item.name}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={'row-detail'}>
                                <div className={'row-detail-label'}>Thư ký:</div>
                                <div className={'row-detail-info'}>
                                    {item.secretary?.fullName}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={'row-detail'}>
                                <div className={'row-detail-label'}>CCV:</div>
                                <div className={'row-detail-info'}>
                                    {item.notary?.fullName}
                                </div>
                            </div>
                        </Grid>
                        {
                            item.certificateNumber != null ? <Grid item xs={12}>
                                <div className={'row-detail'}>
                                    <div className={'row-detail-label'}>Số công chứng:</div>
                                    <div className={'row-detail-info'}>
                                        {item.certificateNumber}
                                    </div>
                                </div>
                            </Grid> : ''
                        }
                        <Grid item xs={12}>
                            <div className={'row-detail'}>
                                <div className={'row-detail-label'}>Loại việc:</div>
                                <div className={'row-detail-info'}>
                                    {item.documentType ? item.documentType.name : ""}
                                </div>
                            </div>
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <div className={'row-detail'}>*/}
                        {/*        <div className={'row-detail-label'}>Người giới thiệu:</div>*/}
                        {/*        <div className={'row-detail-info'}>*/}
                        {/*            {item.referralSource}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</Grid>*/}
                        {
                            item.scheduleStatus.code == "done" ?
                                <>
                                    <Grid item xs={12}>
                                        <div className={'row-detail'}>
                                            <div className={'row-detail-label'}>Phí công chứng:</div>
                                            <div className={'row-detail-info'}>
                                                {currencyFormatter(item.feesNotary)}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={'row-detail'}>
                                            <div className={'row-detail-label'}>Phí ký ngoài:</div>
                                            <div className={'row-detail-info'}>
                                                {currencyFormatter(item.feesTransportation)}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={'row-detail'}>
                                            <div className={'row-detail-label'}>Phí sao y:</div>
                                            <div className={'row-detail-info'}>
                                                {currencyFormatter(item.feesCopy)}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={'row-detail'}>
                                            <div className={'row-detail-label'}>Phí thu hộ:</div>
                                            <div className={'row-detail-info'}>
                                                {currencyFormatter(item.feesCollection)}
                                            </div>
                                        </div>
                                    </Grid></> : ""
                        }


                        {/*<Grid item xs={12}>*/}
                        {/*    <div className={'row-detail'}>*/}
                        {/*        <div className={'row-detail-label'}>Công chứng viên:</div>*/}
                        {/*        <div className={'row-detail-info'}>*/}
                        {/*            {item.notary?item.notary.fullname:""}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <div className={'row-detail'}>
                                <div className={'row-detail-label'}>Địa điểm ký:</div>
                                <div className={'row-detail-info'}>
                                    {item.address}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={'row-detail'}>
                                <div className={'row-detail-label'}>Liên hệ:</div>
                                <div className={'row-detail-info'}>
                                    {item.contact}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={'row-detail'}>
                                <div className={'row-detail-label'}>Ghi chú:</div>
                                <div className={'row-detail-info'}>
                                    {item.description}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={'row-detail'}>
                                <div className={'row-detail-label'}>Trạng thái:</div>
                                <div
                                    className={`row-detail-info ${item.scheduleStatus ? item.scheduleStatus.code == "done" ? 'success' : item.scheduleStatus.code == "cancel" ? 'error' : '' : ''}`}>
                                    {item.scheduleStatus ? item.scheduleStatus.name : ""}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button variant="contained"
                                        onClick={() => {
                                            openDetail()
                                        }}
                                        type='button'>Cập nhật trạng thái</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Collapse>
            </div>

        </div>
    )
}