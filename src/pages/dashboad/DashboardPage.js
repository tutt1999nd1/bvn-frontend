import {Divider, FormControl, Grid, MenuItem, Select} from "@mui/material";
import React, {useEffect, useState} from "react";
import {buildInputTree, buildTreeAsset, currencyFormatter, getListYear, sortTreeData} from "../../constants/utils";
import {TreeSelect} from "primereact/treeselect";
import ItemPie from "../../components/ItemPie";
import ItemDashBoardSumRow from "../../components/ItemDashBoardSumRow";
import ItemBar from "../../components/ItemBar";
import {useSelector} from "react-redux";
import apiOrganization from "../../api/organization";
import apiDashboard from "../../api/dashboard";
import ItemDashBoardSum from "./ItemDashBoardSum";
import ItemDashBoardCurrent from "./ItemDashBoardCurrent";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

export default function DashboardPage() {
    const currentUser = useSelector(state => state.currentUser)
    const [filterValue, setFilterValue] = useState('');
    const [selectedNodeKeysOrganization, setSelectedNodeKeysOrganization] = useState(null);
    const [expandedKeysOrganization, setExpandedKeysOrganization] = useState({0: true});
    const [listOrganizationTree, setListOrganizationTree] = useState([])
    const [listPublishDocumentByMonth, setListPublishDocumentByMonth] = useState([])
    const [listPublishDocumentByTypeDocument, setListPublishDocumentByTypeDocument] = useState([])
    const [listDocumentByTypeDocument, setListDocumentByTypeDocument] = useState([])
    const [listDossierByGroupDossier, seListDossierByGroupDossier] = useState([])
    const [timeSearch, setTimeSearch] = useState(null);
    const [publishDocumentByOrganization, setPublishDocumentByOrganization] = useState({})
    const [publishDocumentByTime,setPublishDocumentByTime] = useState({total:0,current:0,previous:0})
    const [dossierLoanByTime,setDossierLoanByTime] = useState({total:0,current:0,previous:0})
    const [lateDossierLoan,setLateDossierLoan] = useState({total:0,current:0,previous:0})
    const filterOptions = {
        filter: true,
        filterBy: 'label',
        filterPlaceholder: 'Tìm kiếm',
        filterMode: "strict",
        filterValue: filterValue,

    };
    useEffect(() => {
        getOrganization().then(r => {
            let inputTree = buildInputTree(buildInputTree(r.data))
            for (let i = 0; i < inputTree.length; i++) {
                if (inputTree[i].parentId == null) {
                    setSelectedNodeKeysOrganization(inputTree[i].id)
                    setExpandedKeysOrganization(
                        {
                            [inputTree[i].id]: true
                        }
                    )
                }
            }
            let convert = buildTreeAsset(buildInputTree(r.data))
            setListOrganizationTree(convert)
        })
    }, [])
    useEffect(() => {
        if (selectedNodeKeysOrganization != null) {
            console.log("selectedNodeKeysOrganization", selectedNodeKeysOrganization)
            getPublishDocumentByOrganization({
                id: selectedNodeKeysOrganization,
                startDate: timeSearch?.split('/')[0],
                endDate: timeSearch?.split('/')[1],
            }).then(r => {
                let result = {
                    total: 0,
                    listItem: []
                }
                for (let i = 0; i < r.data.length; i++) {
                    result.total = result.total + r.data[i].value;
                }
                result.listItem = r.data
                setPublishDocumentByOrganization(result)
                console.log("getPublishDocumentByOrganization", r)
            }).catch(e => {

            })
        }

    }, [timeSearch, selectedNodeKeysOrganization])
    useEffect(()=>{
        if(selectedNodeKeysOrganization!=null){
            getPublishDocumentByTime({
                startDate:(new dayjs()).startOf("month"),
                startDatePre:(new dayjs()).subtract(1,'month').startOf("month"),
                endDate:(new dayjs()).endOf("month"),
                endDatePre:(new dayjs()).subtract(1,"month").endOf("month"),
                id:selectedNodeKeysOrganization,
            }).then(r=>{
                let result = {total:0,current:0,previous:0}
                for (let i=0;i<r.data.length;i++){
                    result.total=result.total+r.data[i].value
                    if(r.data[i].name=="current"){
                        result.current=r.data[i].value
                    }
                    else if(r.data[i].name=="previous"){
                        result.previous=r.data[i].value
                    }
                }
                setPublishDocumentByTime(result)
            }).catch(e=>{

            })
            getDossierLoanByTime({
                startDate:(new dayjs()).startOf("month"),
                startDatePre:(new dayjs()).subtract(1,'month').startOf("month"),
                endDate:(new dayjs()).endOf("month"),
                endDatePre:(new dayjs()).subtract(1,"month").endOf("month"),
                id:selectedNodeKeysOrganization,
            }).then(r=>{
                let result = {total:0,current:0,previous:0}
                for (let i=0;i<r.data.length;i++){
                    result.total=result.total+r.data[i].value
                    if(r.data[i].name=="current"){
                        result.current=r.data[i].value
                    }
                    else if(r.data[i].name=="previous"){
                        result.previous=r.data[i].value
                    }
                }
                setDossierLoanByTime(result)
            }).catch(e=>{

            })
            getLateDossierLoan({
                startDate:(new dayjs()).startOf("month"),
                startDatePre:(new dayjs()).subtract(1,'month').startOf("month"),
                endDate:(new dayjs()).endOf("month"),
                endDatePre:(new dayjs()).subtract(1,"month").endOf("month"),
                id:selectedNodeKeysOrganization,
            }).then(r=>{
                let result = {total:0,current:0,previous:0}
                for (let i=0;i<r.data.length;i++){
                    result.total=result.total+r.data[i].value
                    if(r.data[i].name=="current"){
                        result.current=r.data[i].value
                    }
                    else if(r.data[i].name=="previous"){
                        result.previous=r.data[i].value
                    }
                }
                setLateDossierLoan(result)
            }).catch(e=>{

            })

        }
    },[selectedNodeKeysOrganization])
    useEffect(()=>{
        if(selectedNodeKeysOrganization!=null){
            getPublishDocumentByMonth({
                startDate: timeSearch?timeSearch.split('/')[0]:(new dayjs()).startOf("year"),
                endDate: timeSearch?timeSearch.split('/')[1]:(new dayjs()).endOf("year"),
                id:selectedNodeKeysOrganization,
            }).then(r=>{
                setListPublishDocumentByMonth(r.data)
            }).catch(e=>{

            })
            getPublishDocumentByTypeDocument({
                startDate: timeSearch?.split('/')[0],
                endDate: timeSearch?.split('/')[1],
                id:selectedNodeKeysOrganization,
            }).then(r=>{
                // setListPublishDocumentByMonth(r.data)
                setListPublishDocumentByTypeDocument(r.data)
            }).catch(e=>{

            })
            getDossierDashboardByGroupDossier({
                startDate: timeSearch?.split('/')[0],
                endDate: timeSearch?.split('/')[1],
                id:selectedNodeKeysOrganization,
            }).then(r=>{
                seListDossierByGroupDossier(r.data)
                console.log("groupDossier",r.data)
            }).catch(e=>{

            })
            getDocumentDashboardByTypeDocument({
                startDate: timeSearch?.split('/')[0],
                endDate: timeSearch?.split('/')[1],
                id:selectedNodeKeysOrganization,
            }).then(r=>{
                setListDocumentByTypeDocument(r.data)
                console.log("typeDocument",r.data)
            }).catch(e=>{

            })
        }
    },[timeSearch,selectedNodeKeysOrganization])
    const getOrganization = () => {
        return apiOrganization.getOrganizationByUser()
    }
    const getPublishDocumentByOrganization = (body) => {
        return apiDashboard.getPublishDocumentByOrganization(body)
    }
    const getPublishDocumentByTime = (body) => {
        return apiDashboard.getPublishDocumentByTime(body)
    }
    const getPublishDocumentByMonth = (body) => {
        return apiDashboard.getPublishDocumentByMonth(body)
    }
    const getPublishDocumentByTypeDocument = (body) => {
        return apiDashboard.getPublishDocumentByTypeDocument(body)
    }
    const getDossierLoanByTime = (body) => {
        return apiDashboard.getDossierLoanByTime(body)
    }
    const getLateDossierLoan = (body) => {
        return apiDashboard.getLateDossierLoan(body)
    }
    const getDossierDashboardByGroupDossier = (body) => {
        return apiDashboard.getDossierDashboardByGroupDossier(body)
    }
    const getDocumentDashboardByTypeDocument = (body) => {
        return apiDashboard.getDocumentDashboardByTypeDocument(body)
    }
    return (
        <div className={'main-content'} style={
            {background: "#eeeff1",
                padding: '5px',
                // lineHeight: "1.5",
                // letterSpacing: "0.00938em"
            }}>
            <div className={'organization-select'}>
                <TreeSelect
                    {...filterOptions} filterMode="strict"
                    // filterMode="strict"
                    value={selectedNodeKeysOrganization}
                    onChange={(e) => {
                        setSelectedNodeKeysOrganization(e.value)
                    }}
                    options={sortTreeData(listOrganizationTree)}
                    expandedKeys={expandedKeysOrganization}
                    onToggle={(e) => setExpandedKeysOrganization(e.value)}
                    style={{width: '250px', zIndex: '1000000 !important', overflow: 'auto'}}
                    className="md:w-20rem w-full"
                    placeholder="Đơn vị chi"></TreeSelect>
                <div style={{width: '100px', marginLeft: '5px'}}>
                    <FormControl placeholder={"Thời gian"} fullWidth style={{position:'relative'}}>
                        <Select
                            value={timeSearch}
                            onChange={(event) => {
                                setTimeSearch(event.target.value);
                            }}
                            displayEmpty
                            size={"small"}>
                            <MenuItem value={null} disabled>
                                Thời gian
                            </MenuItem>
                            {
                                getListYear().map((value) => (
                                    <MenuItem value={value.value}>{value.name}</MenuItem>

                                ))
                            }
                        </Select>
                        {
                            timeSearch ? <div
                                onClick={() => {
                                    setTimeSearch(null)
                                }} className={'clear-select'} >
                                <CloseIcon style={{color: "#6c757d",fontSize:'1rem'}}/>
                            </div> : ""
                        }
                    </FormControl>
                </div>
            </div>
            <div className={'wrapper-dashboard'} style={
                {
                    // background: "#eeeff1",
                    // padding: '5px',
                    lineHeight: "1.5",
                    letterSpacing: "0.00938em"
                }}>
                <Grid container spacing={4}>
                    <Grid container item spacing={1.5}>
                        <Grid item xs={9} container spacing={1.5}>
                            <Grid item xs={12}>
                                <div className={'item-dashboard-wellcome'}>
                                    <div style={{marginRight: '10px'}}>
                                        <img style={{width: '200px'}}
                                             src={require('../../assets/img/logo-white.png')}/>
                                    </div>
                                    <div>
                                        <div className={'item-dashboard-tittle'}>Xin chào {currentUser.userInfo.fullName},</div>
                                        <div className={'item-dashboard-span'}>Bạn đang xem dữ liệu tổng quan về dữ liệu hồ sơ, văn bản tại Amberholdings
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={'item-dashboard new-employee'}>
                                    <ItemDashBoardCurrent item={publishDocumentByTime} title={'Văn bản ban hành '} ></ItemDashBoardCurrent>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={'item-dashboard probationary-employee'}>
                                    <ItemDashBoardCurrent item={dossierLoanByTime} title={'Mượn hồ sơ'} ></ItemDashBoardCurrent>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={'item-dashboard leave-work'}>
                                    <ItemDashBoardCurrent item={lateDossierLoan} type={"disablePre"} title={'Hồ sơ quá hạn trả'} ></ItemDashBoardCurrent>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <ItemDashBoardSum item={publishDocumentByOrganization}/>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={1.5}>
                        <Grid item container xs={12} spacing={1.5}>
                            <Grid item xs={6}>
                                <div style={{overflowY: 'auto'}}>
                                    <ItemBar list={listPublishDocumentByMonth} title={'Văn bản ban hành theo tháng'}/>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{overflowY: 'auto'}}>
                                    <div className={'item-dashboard-pie-chart'}>
                                        <div className={'item-dashboard-header'}>
                                            <div className={'item-dashboard-tittle'}>Văn bản ban hành theo loại văn bản</div>
                                        </div>
                                        <ItemPie optimal={false}  list={listPublishDocumentByTypeDocument} title={'Văn bản ban hành theo loại văn bản'} />

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{overflowY: 'auto'}}>
                                    <div className={'item-dashboard-pie-chart'}>
                                        <div className={'item-dashboard-header'}>
                                            <div className={'item-dashboard-tittle'}>Hồ sơ trong đơn vị</div>
                                        </div>
                                        <ItemPie optimal={false}  list={listDossierByGroupDossier} title={'Hồ sơ'} />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{overflowY: 'auto'}}>
                                    <div className={'item-dashboard-pie-chart'}>
                                        <div className={'item-dashboard-header'}>
                                            <div className={'item-dashboard-tittle'}>Văn bản trong đơn vị</div>
                                        </div>
                                        <ItemPie optimal={false}  list={listDocumentByTypeDocument} title={'Hồ sơ'} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={1.5}>
                        <Grid item xs={6}>
                            {/*<ItemDashBoardChangesEmployee listStringOrganization={listStringOrganization}/>*/}
                        </Grid>
                        <Grid item xs={6}>
                            {/*<ItemDashBoardNumberOfEmployee listStringOrganization={listStringOrganization}></ItemDashBoardNumberOfEmployee>*/}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}