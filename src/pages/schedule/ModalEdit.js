import DialogContent from "@mui/material/DialogContent";
import {Autocomplete, Backdrop, Button, CircularProgress, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
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

export default function ModalEdit(props) {
    const {openModal, handleCloseModal} = props
    const navigate = useNavigate();
    const [listTypeExpense, setListTypeExpense] = useState([]);
    const [listScheduleStatus, setListScheduleStatus] = useState([]);

    const [loading, setLoading] = useState(false);
    const initialInfo = {
        "description": "",
        "feedback": "",
        "scheduleStatus": {
            id: "",
            name: ""
        },


    };
    const [info, setInfo] = useState(initialInfo)
    useEffect(()=>{
        if(!openModal){
            setInfo(initialInfo)
        }
    },[openModal])
    const validationSchema = yup.object({


    });
    const backList = () => {
        window.history.back();
    }


    useEffect(() => {
        getCategoryApi({paging: false, type: "ScheduleStatus"}).then((r) => {
            setListScheduleStatus(convertToAutoComplete(r.data.responses, 'name'))
        })


    }, [])

    const getCarApi = (body) => {
        // return apiCar.searchCar(body)
    }

    const submitForm = (value) => {
        // updateApi({}).then((r) => {
        //     toast.success("Cập nhật thành công");
        //     setLoading(false)
        //     // back()
        //     handleCloseModal()
        // }).catch(e => {
        //     setLoading(false)
        //     handleCloseModal()
        //     toast.error("Có lỗi xảy ra")
        // })
    }

    const back = () => {
        window.history.back();
    }
    const getCategoryApi = (body) => {
        return apiCategory.getCategory(body)
    }



    return (
        <div style={{width: '400px'}}>
            <Dialog PaperProps={{
                // style: {
                //     height: '100%', // Set the height to 100% to make it full height
                // },
            }} fullWidth open={openModal} onClose={handleCloseModal} maxWidth={'md'}>
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
                                    "description": info.description,
                                    "scheduleStatusId": info.scheduleStatus?.id,
                                    "scheduleStatusName": info.scheduleStatus?.name,


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
                                                <div className={'label-input'}>Trạng thái<span className={'error-message'}>*</span></div>
                                                <div className={'row-input-field'}>
                                                    <Autocomplete
                                                        // disablePortal
                                                        id="combo-box-demo"
                                                        options={listScheduleStatus}
                                                        value={{
                                                            id: values.scheduleStatusId,
                                                            label: values.scheduleStatusName
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
                                                                setFieldValue('scheduleStatusId', newValue.id)
                                                                setFieldValue('scheduleStatusName', newValue.label)

                                                            } else {
                                                                setFieldValue('scheduleStatusId', '')
                                                                setFieldValue('scheduleStatusName', '')

                                                            }
                                                        }}
                                                    />
                                                </div>

                                            </div>
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
                                                 style={{display: "flex", justifyContent: "center", marginTop: '10px'}}>
                                                <Button style={{marginRight: '10px'}} onClick={()=>{handleCloseModal()}}
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