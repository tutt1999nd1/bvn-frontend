import {Box, Button, Divider, TextField} from "@mui/material";
import React, {createContext, useEffect, useState} from "react";
import apiSchedule from "../../api/schedule";
import ItemGroupNotification from "../../components/ItemGroupNotification";
import ItemGroupSchedule from "./ItemGroupSchedule";
import ModalEdit from "./ModalEdit";
const ScheduleContext = createContext();
export {ScheduleContext};
export default function SchedulePage () {
    const [listResult,setListResult] = useState([]);
    const [loading,setLoading] = useState(true);
    const [openModalUpdate,setOpenModalUpdate] = useState(false);
    useEffect(()=>{
        setLoading(true)
        searchApi({
            paging:false
        }).then(r=>{
            console.log("result",r)
            setLoading(false)
            if(r.data.responses){
                let list = r.data.responses;
                const result = Object.entries(list.reduce((acc, curr) => {
                    const date = new Date(curr.date).toISOString().slice(0, 10);
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(curr);
                    return acc;
                }, {}))
                    .map(([date, items]) => ({
                        date,
                        items: items.sort((a, b) => new Date(b.date) - new Date(a.date))
                    }))
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                setListResult(result);
            }
        }).catch(e=>{
            setLoading(false)
        })
    },[])
    useEffect(()=>{
        console.log("listResult",listResult)
    },[listResult])
    const searchApi = (body) => {
        return apiSchedule.get(body);
    }
    return(
        <ScheduleContext.Provider value={{listResult,setOpenModalUpdate}}>
            <div className={'main-content'}>
                <ModalEdit setOpenModalUpdate={setOpenModalUpdate} openModal={openModalUpdate}/>
                <div className={'organization-content'}>
                    <div style={{width:'100%'}}>
                        <div className={'children-organization'}>

                            <Box sx={{display:{xs:'block',md:'none'}}} className={'table-content'} >
                                <div className={'table-content-title'}
                                     style={{height: '40px', marginBottom: '0px'}}>
                                    Lịch hẹn
                                    {/*<div style={{*/}
                                    {/*    marginRight: '15px',*/}
                                    {/*    paddingBottom: '5px',*/}
                                    {/*    display: "flex",*/}
                                    {/*    justifyContent: 'center',*/}
                                    {/*    alignItems:'center'*/}
                                    {/*}}>*/}
                                    {/*    <AddIcon onClick={()=>{navigate("/schedule/select-car")}}/>*/}
                                    {/*</div>*/}
                                </div>
                                <div className={'table-content-search'}>
                                    {/*<TextField*/}
                                    {/*    placeholder={"Tìm kiếm"}*/}
                                    {/*    size={"small"}*/}
                                    {/*    fullWidth*/}
                                    {/*    value={nameSearch}*/}
                                    {/*    onChange={(e) => {*/}
                                    {/*        setNameSearch(e.target.value)*/}
                                    {/*    }}*/}
                                    {/*    onKeyDown={(event) => {*/}
                                    {/*        if (event.key === 'Enter') {*/}
                                    {/*            submitSearchMobile()*/}
                                    {/*        }*/}
                                    {/*    }}*/}
                                    {/*    InputProps={{ // <-- This is where the toggle button is added.*/}
                                    {/*        endAdornment: (*/}
                                    {/*            <InputAdornment position="start">*/}
                                    {/*                <SearchIcon/>*/}

                                    {/*            </InputAdornment>*/}
                                    {/*        )*/}
                                    {/*    }}*/}
                                    {/*    onBlur={(e) => {*/}
                                    {/*        submitSearchMobile()*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                </div>
                                <Divider sx={{marginTop:'10px'}}></Divider>

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
                                        {/*<Pagination*/}
                                        {/*    page={currentPage}*/}
                                        {/*    onChange={handleChangePage}*/}
                                        {/*    count={totalPage}*/}
                                        {/*    // count={Math.ceil(listResult.total/listResult.pageSize)}*/}
                                        {/*    variant="outlined" shape="rounded" />*/}
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