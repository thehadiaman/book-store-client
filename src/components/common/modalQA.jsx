import React, {Component} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";

class ModalQa extends Component {

    state={
        open: false
    }

    handleClose=()=>{
        this.setState({open: false});
    }

    handleOpen=()=>{
        this.setState({open: true});
    }

    handleCancel=()=>{
        this.handleClose();
    }

    handleApprove=()=>{
        this.handleClose();
        this.props.handleOrderCancel();
    }

    render() {

        const {open} = this.state;
        const {handleOpen, handleClose} = this;

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
        };

        return (
            <div style={this.props.style}>
                <Button variant={'contained'} onClick={handleOpen} color={this.props.btnColor}>{this.props.btnText}</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: "75%", padding: '10px' }}>
                        <h2 id="parent-modal-title">{this.props.modalQHead}</h2>
                        <p id="parent-modal-description">
                            {this.props.modalQBody}
                        </p>
                        <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Button onClick={this.handleCancel} variant={'contained'} color={'error'}>Cancel</Button>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <Button onClick={this.handleApprove} variant={'contained'} color={'primary'}>Approve</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default ModalQa;