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

export default function ModalUpdateStatus(props) {
    const navigate = useNavigate();
    const [listTypeExpense, setListTypeExpense] = useState([]);
    const [existCertificateNumber, setExistCertificateNumber] = useState(false)
    const [currentCertificateNumber, setCurrentExistCertificateNumber] = useState("")
    const [listScheduleStatus, setListScheduleStatus] = useState([]);
    const {
        infoDetail,
        setInfoDetail,
        setOpenModalUpdate,
        openModalUpdate,
        handleCloseModal,
        setIsFresh
    } = useContext(ScheduleContext);

    const [loading, setLoading] = useState(false);
    const initialInfo = {
        "description": "",
        "feedback": "",
        "isPaid": false,
        "isHandOver": false,
        "feesNotary": "",
        "feesTransportation": "",
        "feesCopy": "",
        "feesCollection": "",
        "scheduleStatus": {
            id: "",
            name: "",
            code: ""
        },

    };
    const [info, setInfo] = useState(initialInfo)
    useEffect(() => {
        if (!openModalUpdate) {
            setInfoDetail(initialInfo)
            setExistCertificateNumber(false)
            // setCurrentExistCertificateNumber("")
        }
    }, [openModalUpdate])

    const validationSchema = yup.object({
        certificateNumber: yup
            .string()
            .trim()
            .required('Không được để trống'),

    });
    const backList = () => {
        window.history.back();
    }

    useEffect(() => {
        setInfo(infoDetail)
        console.log("infoDetail", infoDetail)
    }, [infoDetail])

    useEffect(() => {
        getCategoryApi({paging: false, type: "ScheduleStatus"}).then((r) => {
            console.log("convertToAutoComplete(r.data.responses, 'name')", convertToAutoComplete(r.data.responses, 'name'))
            setListScheduleStatus(convertToAutoComplete(r.data.responses, 'name'))
        })


    }, [])

    const getCarApi = (body) => {
        // return apiCar.searchCar(body)
    }
    useEffect(() => {
        console.log("currentCertificateNumber", currentCertificateNumber)
    }, [currentCertificateNumber])

    const submitForm = (value) => {
        // setExistCertificateNumber(false)
        // return
        updateScheduleStatus(value).then((r) => {
            setExistCertificateNumber(false)

            toast.success("Cập nhật thành công");
            setLoading(false)
            // back()
            setIsFresh(e => !e)
            handleCloseModal()
        }).catch(e => {
            setExistCertificateNumber(true)

            if (e.response?.data?.status?.code == "certificate_number_already_exist") {
                setCurrentExistCertificateNumber(value.certificateNumber)
                setExistCertificateNumber(true)
            }
            // setLoading(false)
            // handleCloseModal()
            // setIsFresh(e => !e)
            // toast.error("Có lỗi xảy ra")
        })
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
            }} fullWidth open={openModalUpdate} onClose={handleCloseModal} maxWidth={'md'}>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}
                    // onClick={handleClose}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <DialogTitle>
                    <div className={'vmp-tittle'}>Cập nhật trạng thái</div>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
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
                                    "certificateNumber": info.certificateNumber,
                                    "description": info.description,
                                    "scheduleStatusId": info.scheduleStatus?.id,
                                    "scheduleStatusName": info.scheduleStatus?.name,
                                    "isPaid": info.isPaid,
                                    "isHandOver": info.isHandOver,
                                    "feedback": info.feedback,
                                    "feesNotary": info.feesNotary,
                                    "feesTransportation": info.feesTransportation,
                                    "feesCopy": info.feesCopy,
                                    "feesCollection": info.feesCollection,
                                    "scheduleStatusCode": info.scheduleStatus?.code,
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
                                                <div className={'label-input'}>Trạng thái<span
                                                    className={'error-message'}>*</span></div>
                                                <div className={'row-input-field'}>
                                                    <Autocomplete
                                                        // disablePortal
                                                        id="combo-box-demo"
                                                        options={listScheduleStatus}
                                                        value={{
                                                            id: values.scheduleStatusId,
                                                            label: values.scheduleStatusName,
                                                            code: values.scheduleStatusCode,
                                                        }
                                                        }

                                                        renderInput={(params) => < TextField  {...params}
                                                                                              id='scheduleStatusId'
                                                                                              name='scheduleStatusId'
                                                                                              placeholder=""
                                                                                              error={touched.scheduleStatusId && Boolean(errors.scheduleStatusId)}
                                                                                              helperText={touched.scheduleStatusId && errors.scheduleStatusId}/>}
                                                        size={"small"}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                console.log("newValue", newValue)
                                                                setFieldValue('scheduleStatusId', newValue.id)
                                                                setFieldValue('scheduleStatusName', newValue.label)
                                                                setFieldValue('scheduleStatusCode', newValue.code)

                                                            } else {
                                                                setFieldValue('scheduleStatusId', '')
                                                                setFieldValue('scheduleStatusName', '')
                                                                setFieldValue('scheduleStatusCode', '')

                                                            }
                                                        }}
                                                    />
                                                </div>

                                            </div>
                                            {
                                                values.scheduleStatusCode == "done" ?
                                                    <>
                                                        <div className={'form-input'}>
                                                            <div className={'label-input'}>Số công chứng
                                                                <span className={'error-message'}>*</span>
                                                            </div>
                                                            <div className={'row-input-field'}>
                                                                <TextField
                                                                    size={"small"}
                                                                    id='certificateNumber'
                                                                    name='certificateNumber'
                                                                    className={'formik-input'}
                                                                    type="tel"
                                                                    InputProps={{
                                                                        inputMode: 'numeric', // hỗ trợ cho bàn phím số
                                                                        pattern: '[0-9]*', // mẫu cho số
                                                                    }}
                                                                    value={values.certificateNumber}
                                                                    onChange={(value) => {

                                                                        if(currentCertificateNumber!=""){
                                                                            if(value.target.value==currentCertificateNumber){
                                                                                setExistCertificateNumber(true)
                                                                            }else {
                                                                                setExistCertificateNumber(false)

                                                                            }
                                                                        }
                                                                        setFieldValue('certificateNumber', value.target.value)
                                                                    }}
                                                                    error={(touched.certificateNumber && Boolean(errors.certificateNumber)) || existCertificateNumber}
                                                                    helperText={
                                                                        (touched.certificateNumber && errors.certificateNumber) || (existCertificateNumber ? "Số chứng thư đã tồn tại" : "")
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={'form-input'}>
                                                            <div className={'label-input'}>Phí công chứng</div>
                                                            <div className={'row-input-field'}>
                                                                <NumericFormat
                                                                    id='feesNotary'
                                                                    name='feesNotary'
                                                                    className={'formik-input text-right'}
                                                                    size={"small"}
                                                                    value={values.feesNotary}
                                                                    customInput={TextField}
                                                                    error={touched.feesNotary && Boolean(errors.feesNotary)}
                                                                    helperText={touched.feesNotary && errors.feesNotary}
                                                                    InputProps={{
                                                                        endAdornment: <InputAdornment
                                                                            position="end">VNĐ</InputAdornment>,
                                                                    }}
                                                                    thousandSeparator={"."}
                                                                    decimalSeparator={","}
                                                                    onValueChange={(values) => {
                                                                        const {
                                                                            formattedValue,
                                                                            value,
                                                                            floatValue
                                                                        } = values;
                                                                        const re = /^[0-9\b]+$/;
                                                                        if (re.test(floatValue)) {
                                                                            setFieldValue('feesNotary', floatValue)
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={'form-input'}>
                                                            <div className={'label-input'}>Phí ký ngoài</div>
                                                            <div className={'row-input-field'}>
                                                                <NumericFormat
                                                                    id='feesTransportation'
                                                                    name='feesTransportation'
                                                                    className={'formik-input text-right'}
                                                                    size={"small"}
                                                                    value={values.feesTransportation}
                                                                    customInput={TextField}
                                                                    error={touched.feesTransportation && Boolean(errors.feesTransportation)}
                                                                    helperText={touched.feesTransportation && errors.feesTransportation}
                                                                    InputProps={{
                                                                        endAdornment: <InputAdornment
                                                                            position="end">VNĐ</InputAdornment>,

                                                                    }}
                                                                    thousandSeparator={"."}
                                                                    decimalSeparator={","}
                                                                    onValueChange={(values) => {
                                                                        const {
                                                                            formattedValue,
                                                                            value,
                                                                            floatValue
                                                                        } = values;
                                                                        const re = /^[0-9\b]+$/;
                                                                        if (re.test(floatValue)) {
                                                                            setFieldValue('feesTransportation', floatValue)
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={'form-input'}>
                                                            <div className={'label-input'}>Phí sao y</div>
                                                            <div className={'row-input-field'}>
                                                                <NumericFormat
                                                                    id='feesCopy'
                                                                    name='feesCopy'
                                                                    className={'formik-input text-right'}
                                                                    size={"small"}
                                                                    value={values.feesCopy}
                                                                    customInput={TextField}
                                                                    error={touched.feesCopy && Boolean(errors.feesCopy)}
                                                                    helperText={touched.feesCopy && errors.feesCopy}
                                                                    InputProps={{
                                                                        endAdornment: <InputAdornment
                                                                            position="end">VNĐ</InputAdornment>,

                                                                    }}
                                                                    thousandSeparator={"."}
                                                                    decimalSeparator={","}
                                                                    onValueChange={(values) => {
                                                                        const {
                                                                            formattedValue,
                                                                            value,
                                                                            floatValue
                                                                        } = values;
                                                                        const re = /^[0-9\b]+$/;
                                                                        if (re.test(floatValue)) {
                                                                            setFieldValue('feesCopy', floatValue)
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={'form-input'}>
                                                            <div className={'label-input'}>Phí thu hộ</div>
                                                            <div className={'row-input-field'}>
                                                                <NumericFormat
                                                                    id='feesCollection'
                                                                    name='feesCollection'
                                                                    className={'formik-input text-right'}
                                                                    size={"small"}
                                                                    value={values.feesCollection}
                                                                    customInput={TextField}
                                                                    error={touched.feesCollection && Boolean(errors.feesCollection)}
                                                                    helperText={touched.feesCollection && errors.feesCollection}
                                                                    InputProps={{
                                                                        endAdornment: <InputAdornment
                                                                            position="end">VNĐ</InputAdornment>,

                                                                    }}
                                                                    thousandSeparator={"."}
                                                                    decimalSeparator={","}
                                                                    onValueChange={(values) => {
                                                                        const {
                                                                            formattedValue,
                                                                            value,
                                                                            floatValue
                                                                        } = values;
                                                                        const re = /^[0-9\b]+$/;
                                                                        if (re.test(floatValue)) {
                                                                            setFieldValue('feesCollection', floatValue)
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={'form-input'}
                                                             style={{display: 'flex', alignItems: 'center'}}>
                                                            <div className={'label-input'} style={{cursor: 'pointer'}}
                                                                 onClick={() => {
                                                                     setFieldValue('isPaid', !values.isPaid)
                                                                 }
                                                                 }>Khách đã nộp
                                                            </div>
                                                            <div className={'row-input-field'}>
                                                                <Checkbox
                                                                    checked={values.isPaid}
                                                                    onChange={(event, checked) => {
                                                                        console.log(checked)
                                                                        setFieldValue('isPaid', checked)

                                                                    }
                                                                    }
                                                                    inputProps={{'aria-label': 'controlled'}}></Checkbox>
                                                            </div>
                                                        </div>
                                                        <div className={'form-input'}
                                                             style={{display: 'flex', alignItems: 'center'}}>
                                                            <div className={'label-input'} style={{cursor: 'pointer'}}
                                                                 onClick={() => {
                                                                     setFieldValue('isHandOver', !values.isHandOver)
                                                                 }
                                                                 }
                                                            >Đã bàn giao hồ sơ lưu cho văn thư
                                                            </div>
                                                            <div className={'row-input-field'}>
                                                                <Checkbox
                                                                    checked={values.isHandOver}
                                                                    onChange={(event, checked) => {
                                                                        console.log(checked)
                                                                        setFieldValue('isHandOver', checked)

                                                                    }
                                                                    }
                                                                    inputProps={{'aria-label': 'controlled'}}></Checkbox>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : ''
                                            }
                                            <div className={'form-input'}>
                                                <div className={'label-input'}>Phản hồi</div>
                                                <div className={'row-input-field'}>
                                                    <TextField
                                                        multiline
                                                        rows={3}
                                                        size={"small"}
                                                        id='feedback'
                                                        name='feedback'
                                                        className={'formik-input'}
                                                        // variant="standard"
                                                        value={values.feedback}
                                                        onChange={handleChange}
                                                        error={touched.feedback && Boolean(errors.feedback)}
                                                        helperText={touched.feedback && errors.feedback}
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
                                                    handleCloseModal()
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