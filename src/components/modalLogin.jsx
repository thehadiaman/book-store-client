import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Form from "./common/form";
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import Joi from 'joi-browser';
import {loginUser} from "../services/authService";

class ModalLogin extends Form {

    state={
        open: false,
        inputs:[
            {name: 'email', type: 'email', placeholder: 'Email', value: ''},
            {name: 'password', type: 'password', placeholder: 'Password', value: ''}
        ],
        errors: {}
    }

    handleOpen=()=>{
        this.setState({open: true})
    }

    getData = ()=>{
        const inputs = this.state.inputs;
        const data = {};
        const properties = ['email', 'password'];

        for(let a=0;a<properties.length;a++){
            data[properties[a]] = inputs.find(input=>input.name===properties[a]).value;
        }
        return data
    }

    handleClose=()=>{
        this.setState({open: false})
    }

    schema = {
        email: Joi.string().min(8).max(50).email().required(),
        password: Joi.string().min(8).max(50).required()
    }

    doSubmit = async(e)=>{
        try{
            const data = (await loginUser(this.getData()));
            localStorage.setItem('jwtToken', data.headers['x-auth-token']);
            window.location = '/';
        }catch (ex){
            const errors = {};
            errors.email = ex.response.data
            this.setState({errors});
        }
    }

    render() {

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
        };

        const extra = <div>
            <span onClick={()=>{
                this.setState({open: false});
            }}>
                <Link className={'link-x'} to={'/signup'}>Don't have an account? Sign Up</Link>
            </span>
            <Button variant={'contained'} type={'Submit'} color={'primary'} style={{float: 'right'}}>Login</Button>
            <br/>
            <br/>
            <span onClick={()=>{
                this.setState({open: false});
            }}><Link className={'link-x'} to={'/forgetpassword'}>Forgot password?</Link></span>
        </div>

        return (
            <div>
                <Button startIcon={<LoginOutlinedIcon/>} onClick={this.handleOpen} color="inherit">Login</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={this.state.open}>
                        <Box sx={style}>
                            <form onSubmit={this.handleSubmit}>
                                <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                                    <Grid className={'special-form'} item xs={12} sm={12} md={12} lg={12}>
                                        <h1>Login</h1>
                                        {this.renderInputs(this.state.inputs, extra)}
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default ModalLogin;