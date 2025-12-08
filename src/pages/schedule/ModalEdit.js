import DialogContent from "@mui/material/DialogContent";
import {Autocomplete, Backdrop, Button, CircularProgress, InputAdornment, TextField} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Form, Formik} from "formik";
import apiCategory from "../../api/category";
import * as yup from "yup";
import {convertToAutoComplete} from "../../constants/common";
import {ScheduleContext} from "./index";
import {NumericFormat} from "react-number-format";
import Checkbox from '@mui/material/Checkbox';
import apiSchedule from "../../api/schedule";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import apiUser from "../../api/user";

export default function ModalEdit(props) {
    const navigate = useNavigate();
    const [listScheduleStatus, setListScheduleStatus] = useState([]);
    const {
        idUpdate,
        isUpdate,
        setInfoDetail,
        openModalEdit,
        handleCloseModalEdit,
        setIsFresh,infoUpdate,setInfoUpdate
    } = useContext(ScheduleContext);
    const [listUser, setListUser] = useState([]);
    const [listDocumentType, setListDocumentType] = useState([]);
    const [listReferralSource, setListReferralSource] = useState([]);

    const [loading, setLoading] = useState(false);
    const initialInfo = {
        "name": "",
        "date": new dayjs(),
        "address":"",
        "description":"",
        "certificateNumber":"",
        "contact":"",
        "notary": {
            id: "",
            name: ""
        },
        "secretary": {
            id: "",
            name: ""
        },
        "documentType": {
            id: "",
            code: ""
        },
        "referralSource": {
            id: "",
            name: ""
        },

    };
    const [info, setInfo] = useState(initialInfo)
    useEffect(() => {
        if (!openModalEdit) {
            setInfoUpdate(initialInfo)
        }
    }, [openModalEdit])
    useEffect(() => {
        setInfo(infoUpdate)
    }, [infoUpdate])
    const validationSchema = yup.object({
        name: yup
            .string()
            .trim()
            .required('Không được để trống'),
        secretaryId: yup
            .string()
            .trim()
            .required('Không được để trống'),
        notaryId: yup
            .string()
            .trim()
            .required('Không được để trống'),

    });
    const backList = () => {
        window.history.back();
    }



    useEffect(() => {
        getCategoryApi({paging: false, type: "ScheduleStatus"}).then((r) => {
            setListScheduleStatus(convertToAutoComplete(r.data.responses, 'name'))
        })
        getCategoryApi({paging: false, type: "DocumentType"}).then((r) => {
            setListDocumentType(convertToAutoComplete(r.data.responses, 'name'))
        })
        getListUserApi({paging: false}).then((r) => {
            setListUser(convertToAutoComplete(r.data.responses, 'fullName'))
        })
        getCategoryApi({paging: false, type: "ReferralSource"}).then((r) => {
            setListReferralSource(convertToAutoComplete(r.data.responses, 'name'))
        })


    }, [])

    const getListUserApi = (body) => {
        return apiUser.getListUser(body);
    }

    const submitForm = (value) => {
        alert("tutt")
        if (isUpdate) {
            updateApi(value).then((r) => {
                toast.success("Cập nhật thành công");
                setIsFresh(e=>!e)
                handleCloseModalEdit()
            }).catch(e => {
                toast("Có lỗi xảy ra")
                handleCloseModalEdit()
                console.log(e)
            })
        } else {
            createApi(value).then((r) => {
                toast.success("Thêm mới thành công");
                handleCloseModalEdit()
                setIsFresh(e=>!e)
            }).catch(e => {
                toast("Có lỗi xảy ra")
                handleCloseModalEdit()
                console.log(e)
            })
        }

    }
    const createApi = (body) => {
        return apiSchedule.create(body)
    }
    const updateApi = (body) => {
        return apiSchedule.update(body)
    }

    const back = () => {
        window.history.back();
    }
    const getCategoryApi = (body) => {
        return apiCategory.getCategory(body)
    }
    const updateScheduleStatus = (body) => {
        return apiSchedule.updateStatus(body)
    }


    return (
        <div style={{width: '400px'}}>
            <Dialog PaperProps={{
                // style: {
                //     height: '100%', // Set the height to 100% to make it full height
                // },
            }} fullWidth open={openModalEdit} onClose={handleCloseModalEdit} maxWidth={'md'}>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}
                    // onClick={handleClose}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <DialogTitle>
                    <div className={'vmp-tittle'}>{!isUpdate?'Thêm mới lịch hẹn':'Cập nhật lịch hẹn'}</div>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModalEdit}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers className={"model-project"}>
                    <div className={'main-content'}>
                        <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={loading}
                            // onClick={handleClose}
                        >
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        <div className={'main-content-body'}>
                            <Formik

                                enableReinitialize
                                initialValues={{
                                    "id": info.id,
                                    "name": info.name,
                                    "customerName": info.customerName||"",
                                    "feesNotary": info.feesNotary,
                                    "feesTransportation": info.feesTransportation,
                                    "feesCopy": info.feesCopy,
                                    "feesCollection": info.feesCollection,
                                    "description": info.description,
                                    "address":info.address,
                                    "contact":info.contact,
                                    "date": isUpdate ? dayjs(info.date) : info.date,
                                    "scheduleStatusId": info.scheduleStatus?.id||"",
                                    "scheduleStatusName": info.scheduleStatus?.name||"",
                                    "documentTypeId": info.documentType?.id||"",
                                    "documentTypeName": info.documentType?.name||"",
                                    "notaryId": info.notary?.id||"",
                                    "notaryName": info.notary?.fullName||"",
                                    "secretaryId": info.secretary?.id||"",
                                    "secretaryName": info.secretary?.fullName||"",
                                    "referralSourceId": info.referralSource?.id||"",
                                    "referralSourceName": info.referralSource?.name||"",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={
                                    (values, actions) => {
                                        submitForm(values)
                                    }
                                }
                            >
                                {props => {
                                    const {
                                        values,
                                        touched,
                                        errors,
                                        handleChange,
                                        setFieldValue,
                                        handleSubmit
                                    } = props;
                                    return (
                                        <Form onSubmit={handleSubmit}>

                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Tên khách hàng
                                                    <span className={'error-message'}>*</span>
                                                </div>
                                                <div className={'row-input-field'}>
                                                    <TextField
                                                        size={"small"}
                                                        id='name'
                                                        name='name'
                                                        className={'formik-input'}

                                                        // variant="standard"
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        error={touched.name && Boolean(errors.name)}
                                                        helperText={touched.name && errors.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Nguồn việc</div>
                                                <div className={'row-input-field'}>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={listReferralSource}
                                                        value={{
                                                            id: values.referralSourceId,
                                                            label: values.referralSourceName
                                                        }
                                                        }

                                                        renderInput={(params) => < TextField  {...params}
                                                                                              id='referralSourceId'
                                                                                              name='referralSourceId'
                                                                                              placeholder=""
                                                                                              error={touched.referralSourceId && Boolean(errors.referralSourceId)}
                                                                                              helperText={touched.referralSourceId && errors.referralSourceId}/>}
                                                        size={"small"}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                setFieldValue('referralSourceId', newValue.id)
                                                                setFieldValue('referralSourceName', newValue.label)

                                                            } else {
                                                                setFieldValue('referralSourceId', '')
                                                                setFieldValue('referralSourceName', '')

                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Loại việc</div>
                                                <div className={'row-input-field'}>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={listDocumentType}
                                                        value={{
                                                            id: values.documentTypeId,
                                                            label: values.documentTypeName
                                                        }
                                                        }

                                                        renderInput={(params) => < TextField  {...params}
                                                                                              id='documentTypeId'
                                                                                              name='documentTypeId'
                                                                                              placeholder=""
                                                                                              error={touched.documentTypeId && Boolean(errors.documentTypeId)}
                                                                                              helperText={touched.documentTypeId && errors.documentTypeId}/>}
                                                        size={"small"}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                setFieldValue('documentTypeId', newValue.id)
                                                                setFieldValue('documentTypeName', newValue.label)

                                                            } else {
                                                                setFieldValue('documentTypeId', '')
                                                                setFieldValue('documentTypeName', '')

                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Công chứng viên
                                                    <span className={'error-message'}>*</span>
                                                </div>
                                                <div className={'row-input-field'}>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={listUser}
                                                        value={{
                                                            id: values.notaryId,
                                                            label: values.notaryName
                                                        }
                                                        }

                                                        renderInput={(params) => < TextField  {...params}
                                                                                              id='notaryId'
                                                                                              name='notaryId'
                                                                                              placeholder=""
                                                                                              error={touched.notaryId && Boolean(errors.notaryId)}
                                                                                              helperText={touched.notaryId && errors.notaryId}/>}
                                                        size={"small"}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                setFieldValue('notaryId', newValue.id)
                                                                setFieldValue('notaryName', newValue.label)

                                                            } else {
                                                                setFieldValue('notaryId', '')
                                                                setFieldValue('notaryName', '')

                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Thư ký
                                                    <span className={'error-message'}>*</span>
                                                </div>
                                                <div className={'row-input-field'}>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={listUser}
                                                        value={{
                                                            id: values.secretaryId,
                                                            label: values.secretaryName
                                                        }
                                                        }

                                                        renderInput={(params) => < TextField  {...params}
                                                                                              id='secretaryId'
                                                                                              name='secretaryId'
                                                                                              placeholder=""
                                                                                              error={touched.secretaryId && Boolean(errors.secretaryId)}
                                                                                              helperText={touched.secretaryId && errors.secretaryId}/>}
                                                        size={"small"}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                setFieldValue('secretaryId', newValue.id)
                                                                setFieldValue('secretaryName', newValue.label)

                                                            } else {
                                                                setFieldValue('secretaryId', '')
                                                                setFieldValue('secretaryName', '')

                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Thời gian</div>
                                                <div className={'row-input-field'}>
                                                    <LocalizationProvider style={{width: '100%'}}
                                                                          dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker
                                                            className={'new-date-apply'}
                                                            style={{width: '100% !important', height: '30px'}}
                                                            inputFormat="HH:mm:ss DD-MM-YYYY"
                                                            referenceDate={dayjs('2022-04-17T15:30')}

                                                            value={values.date}
                                                            onChange={value => props.setFieldValue("date", value)}
                                                            error={touched.date && Boolean(errors.date)}
                                                            // error={touchSubmit && dayjs(values.founding_date).format('DD-MM-YYYY') == "Invalid Date"}
                                                            helperText={touched.date && errors.date}
                                                            renderInput={(params) => <TextField size={"small"}
                                                                                                fullWidth {...params} />}
                                                        />
                                                        {/*<DateTimePicker*/}
                                                        {/*    label="Responsive"*/}
                                                        {/*    renderInput={(params) => <TextField {...params} />}*/}
                                                        {/*    value={value}*/}
                                                        {/*    onChange={(newValue) => {*/}
                                                        {/*        setValue(newValue);*/}
                                                        {/*    }}*/}
                                                        {/*/>*/}
                                                        {/*<DesktopDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />*/}
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Ghi chú</div>
                                                <div className={'row-input-field'}>
                                                    <TextField
                                                        multiline
                                                        rows={2}
                                                        size={"small"}
                                                        id='description'
                                                        name='description'
                                                        className={'formik-input'}
                                                        // variant="standard"
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        error={touched.description && Boolean(errors.description)}
                                                        helperText={touched.description && errors.description}
                                                    />
                                                </div>
                                            </div>
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Địa điểm ký</div>
                                                <div className={'row-input-field'}>
                                                    <TextField
                                                        multiline
                                                        rows={2}
                                                        size={"small"}
                                                        id='address'
                                                        name='address'
                                                        className={'formik-input'}
                                                        // variant="standard"
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        error={touched.address && Boolean(errors.address)}
                                                        helperText={touched.address && errors.address}
                                                    />
                                                </div>
                                            </div>
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Thông tin liên hệ</div>
                                                <div className={'row-input-field'}>
                                                    <TextField
                                                        multiline
                                                        rows={2}
                                                        size={"small"}
                                                        id='contact'
                                                        name='contact'
                                                        className={'formik-input'}
                                                        // variant="standard"
                                                        value={values.contact}
                                                        onChange={handleChange}
                                                        error={touched.contact && Boolean(errors.contact)}
                                                        helperText={touched.contact && errors.contact}
                                                    />
                                                </div>
                                            </div>
                                            <div className={''}
                                                 style={{
                                                     display: "flex",
                                                     justifyContent: "center",
                                                     marginTop: '10px'
                                                 }}>
                                                <Button style={{marginRight: '10px'}} onClick={() => {
                                                    handleCloseModalEdit()
                                                }}
                                                        variant="outlined">Hủy</Button>

                                                <Button variant="contained"
                                                        type='submit'>Lưu</Button>

                                            </div>


                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}