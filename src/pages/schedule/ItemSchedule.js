import moment from "moment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {useNavigate} from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useContext, useState} from "react";
import {Button, Collapse, Grid} from "@mui/material";
import {currencyFormatter} from "../../constants/utils";
import {ScheduleContext} from "./index";
export default function ItemSchedule(props) {
    const { setOpenModalUpdate } = useContext(ScheduleContext);

    const navigate = useNavigate();
    const {handleCloseNotification,refresh, close,item} = props;
    const [openExpand,setOpenExpand] =useState(false);
    const getAction = (type,action) => {


    }
    const submit = () => {
        setOpenModalUpdate(true)
    }
    const handleClick = (id) => {
        setOpenExpand(e=>!e)
    }

    return (
    <div className={`item-schedule ${openExpand?'item-schedule-active':''}`} >
        <div className={'item-schedule-content'} onClick={()=>{handleClick(item.id)}}>
            <div>
                <div className={'item-notification-content'}>
                    <div className={'item-notification-content'}>
                        {item.name}
                    </div>

                </div>
                <div className={'item-notification-time'}>
                    {moment(item.date).format('HH:mm DD/MM/YYYY')}
                </div>
            </div>


            <div>
                {openExpand ? <ExpandLess sx={{color:'#999'}}/> : <ExpandMore sx={{color:'#999'}}/>}
            </div>
        </div>
        <div className={'item-schedule-content-detail'}>
            <Collapse in={openExpand} timeout="auto" unmountOnExit>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <div className={'row-detail'}>
                            <div className={'row-detail-label'}>Tên khách hàng:</div>
                            <div className={'row-detail-info'}>
                                {item.customerName}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={'row-detail'}>
                            <div className={'row-detail-label'}>Loại việc:</div>
                            <div className={'row-detail-info'}>
                                {item.documentType?item.documentType.name:""}
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
                            <div className={'row-detail-label'}>Phí di chuyển:</div>
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
                    </Grid>


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
                            <div className={'row-detail-label'}>Địa chỉ:</div>
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
                            <div className={'row-detail-info'}>
                                {item.scheduleStatus?item.scheduleStatus.name:""}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <Button variant="contained"
                                    onClick={()=>{
                                        submit()
                                    }}
                                    type='button'>Cập nhật</Button>
                        </div>
                    </Grid>
                </Grid>
            </Collapse>
        </div>

    </div>
    )
}