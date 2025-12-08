import {Box, Button, Divider, InputAdornment, Pagination, TextField} from "@mui/material";
import React, {createContext, useEffect, useState} from "react";
import apiSchedule from "../../api/schedule";
import ItemGroupNotification from "../../components/ItemGroupNotification";
import AddIcon from '@mui/icons-material/Add';
import ItemGroupSchedule from "./ItemGroupSchedule";
import ModalUpdateStatus from "./ModalUpdateStatus";
import ModalEdit from "./ModalEdit";
import {toast} from "react-toastify";
import ModalConfirmDel from "../../components/ModalConfirmDelete";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";

const ScheduleContext = createContext();
export {ScheduleContext};

export default function SchedulePage () {
    const [listResult,setListResult] = useState([]);
    const [loading,setLoading] = useState(true);
    const [isUpdate,setIsUpdate] = useState(false);
    const [idUpdate,setIdUpdate] = useState(null);
    const [openModalUpdate,setOpenModalUpdate] = useState(false);
    const [openModalEdit,setOpenModalEdit] = useState(false);
    const [openModalRemove,setOpenModalRemove] = useState(false);
    const [idRemove, setIdRemove] = useState(-1)
    const [nameSearch,setNameSearch] = useState("");
    const [infoDetail,setInfoDetail] = useState({})
    const [infoUpdate,setInfoUpdate] = useState({})
    const [isFresh,setIsFresh] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [limitOfPage, setLimitOfPage] = useState(20)
    const [isInitialRender, setIsInitialRender] = useState(true);

    const handleCloseModalRemove = () => {
        setOpenModalRemove(false)
    }
    useEffect(() => {
        if (!isInitialRender) {
            submitSearch();
        } else {
            setIsInitialRender(false);
        }
    }, [currentPage, limitOfPage])
    const submitSearch = () => {
        searchApi({
            name:nameSearch,
            pageSize: limitOfPage,
            pageIndex: currentPage ,
            paging: true,
        }).then(r=>{
            console.log("result",r)
            setLoading(false)
            if(r.data.responses){
                setTotalPage(r.data.page.total_pages)

                let list = r.data.responses;
                // const result = Object.entries(list.reduce((acc, curr) => {
                //     const date = new Date(curr.date).toISOString().slice(0, 10);
                //     if (!acc[date]) {
                //         acc[date] = [];
                //     }
                //     acc[date].push(curr);
                //     return acc;
                // }, {}))
                //     .map(([date, items]) => ({
                //         date,
                //         items: items.sort((a, b) => new Date(b.date) - new Date(a.date))
                //     }))
                //     .sort((a, b) => new Date(b.date) - new Date(a.date));
                const result = Object.entries(
                    list.reduce((acc, curr) => {
                        const date = moment(curr.date).format('YYYY-MM-DD'); // Lấy ngày theo định dạng YYYY-MM-DD

                        // Khởi tạo mảng nếu ngày chưa tồn tại
                        if (!acc[date]) {
                            acc[date] = [];
                        }

                        // Đẩy đối tượng vào mảng tương ứng
                        acc[date].push(curr);
                        return acc;
                    }, {})
                ).map(([date, items]) => ({
                    date,
                    items: items.sort((a, b) => moment(b.date) - moment(a.date)) // Sắp xếp các mục theo ngày
                })).sort((a, b) => moment(b.date) - moment(a.date)); // Sắp xếp các nhóm theo ngày
                setListResult(result);
            }else {
                setListResult([]);
                setTotalPage(0)

            }
        }).catch(e=>{
            setLoading(false)
        })
    }
    useEffect(()=>{
        setLoading(true)
        submitSearch()
    },[isFresh])
    const handleCloseModal = () => {
      setOpenModalUpdate(false)
    }
    const submitRemove = () => {
        if (idRemove != -1)
            removeApi({
                id: idRemove
            }).then(r => {
                handleCloseModalRemove();
                setIsFresh(e=>!e)
                toast.success("Xóa thành công")
            }).catch(e => {
                handleCloseModalRemove()
                toast.error("Có lỗi xảy ra")
            })
    }


    const handleCloseModalEdit = () => {
      setOpenModalEdit(false)
    }
    const handleChangePage = (event, value) => {
        console.log(value)
        setCurrentPage(value);
    };
    const removeApi = (body) => {
        return apiSchedule.delete(body)
    }
    const searchApi = (body) => {
        return apiSchedule.get(body);
    }
    return(
        <ScheduleContext.Provider value={{setOpenModalRemove,setIdRemove,infoUpdate,setInfoUpdate,isUpdate,setIsUpdate,idUpdate,listResult,setOpenModalUpdate,openModalUpdate,handleCloseModal,handleCloseModalEdit,openModalEdit,setOpenModalEdit,infoDetail,setInfoDetail,setIsFresh,isFresh}}>
            <div className={'main-content'}>
                <ModalUpdateStatus/>
                <ModalEdit/>
                <ModalConfirmDel submitDelete={submitRemove} openModalDel={openModalRemove}
                                 handleCloseModalDel={handleCloseModalRemove}></ModalConfirmDel>
                <div className={'organization-content'}>
                    <div style={{width:'100%'}}>
                        <div className={'children-organization'}>

                            <Box sx={{display:{xs:'block',md:'none'}}} className={'table-content'} >
                                <div className={'table-content-title'}
                                     style={{height: '40px', marginBottom: '0px'}}>
                                    Lịch hẹn
                                    <div style={{
                                        marginRight: '15px',
                                        paddingBottom: '5px',
                                        display: "flex",
                                        justifyContent: 'center',
                                        alignItems:'center',
                                        color:'#1976d2'
                                    }}>
                                        <AddIcon onClick={()=>{setIsUpdate(false);setOpenModalEdit(true)}}/>
                                    </div>
                                </div>
                                <Divider sx={{marginTop:'10px'}}></Divider>
                                <div  style={{width:'100%', display: "flex",justifyContent:'flex-end',marginTop:'10px',marginBottom:'10px'}}>
                                    <div  style={{
                                        width:'200px',
                                        marginRight:'10px'
                                    }}>
                                        <TextField
                                            size={"small"}
                                            fullWidth
                                            placeholder={'Tên hồ sơ'}
                                            InputProps={{ // <-- This is where the toggle button is added.
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />

                                                    </InputAdornment>
                                                )
                                            }}

                                            value={nameSearch}
                                            onChange={(e) => {
                                                setNameSearch(e.target.value)
                                            }}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    submitSearch()
                                                }
                                            }}
                                            onBlur={(e) => {
                                                submitSearch()
                                            }}
                                        />
                                    </div>


                                </div>

                                <div style={{position: 'relative'}}>
                                    <div
                                        className={`message-table-empty ${!loading&&listResult.length === 0 ? '' : 'hidden'}`}>Không
                                        có dữ liệu
                                    </div>
                                    {/*<div className={"list-item-response"}>*/}
                                    {/*    {listResult.map((value, index)=>(*/}
                                    {/*        <ItemGroupSchedule handleClick={handleClickItem} value={value}></ItemGroupSchedule>*/}
                                    {/*    ))}*/}
                                    {/*</div>*/}
                                    {
                                        listResult.map((value, index) => (
                                            <ItemGroupSchedule close={null}
                                                               refresh={true}
                                                               item={value}></ItemGroupSchedule>))
                                    }
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: 'end',
                                        marginTop: "10px",
                                        marginBottom:"10px"
                                    }}>
                                        <Pagination
                                            page={currentPage}
                                            onChange={handleChangePage}
                                            count={totalPage}
                                            // count={Math.ceil(listResult.total/listResult.pageSize)}
                                            variant="outlined" shape="rounded" />
                                    </div>
                                </div>

                            </Box>

                        </div>
                    </div>
                </div>
            </div>

        </ScheduleContext.Provider>
    )
}