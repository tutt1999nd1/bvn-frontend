import DialogContent from "@mui/material/DialogContent";
import {Button, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useLocation, useNavigate} from "react-router-dom";


export default function ModalConfirmLogin(props) {
    const {openModal, handleCloseModal} = props
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>
                    <div className={'vmp-tittle'}>Thông báo
                    </div>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers className={"model-project"}>
                    <div className="form-input">
                        <div className="label confirm-delete-dataset">
                            <div>
                               Vui lòng đăng nhập để sử dụng tính năng này
                                </div>
                            {/*<strong className={"text-bold"}>{name}</strong>*/}
                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    {/*{*/}
                    {/*    !(valueInput.trim() ==(name?name.trim():name)) ?   <Button disabled={true} variant={'contained'} className={`vmp-btn ${!(valueInput.trim() ==(name?name.trim():name)) ? 'not-allowed' : ''}`}>Xóa</Button>*/}
                    {/*    :*/}
                    {/*        <Button  onClick={submit} variant={'contained'} className={`vmp-btn ${!(valueInput.trim() ==(name?name.trim():name)) ? 'not-allowed' : ''}`}>Xóa</Button>*/}
                    {/*}*/}
                    <Button onClick={()=>{navigate(`/login?redirect=${location.pathname+location.search}`)}}  variant={'contained'}>Đăng nhập</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}