import React from "react";
import Form from "./common/form";
import {Button, Container, Grid} from "@mui/material";
import Joi from 'joi-browser';
import {verifyUser} from "../services/userService";

class VerificationPage extends Form {

    state={
        inputs:[
            {name: 'verificationCode', type: 'text', placeholder: 'Verification Code', value: ''}
        ],
        errors: {}
    }

    doSubmit = async()=>{
        try{
            const data = (await verifyUser(this.getData()));
            localStorage.setItem('jwtToken', data.headers['x-auth-token']);
            this.props.handleLinkChange('/')
            this.props.history.replace('/');
        }catch(ex){
            const errors = {};
            errors.verificationCode = ex.response.data;
            this.setState({errors});
        }
    }

    schema = {
        verificationCode: Joi.string().min(5).max(6).required().label('Verification Code')
    }

    getData = ()=>{
        return {
            verificationCode: this.state.inputs.filter(input=>input.name==='verificationCode')[0].value,
        }
    }

    render() {
        document.title = 'Verification';
        const extra = <Button variant={'contained'} type={'Submit'} color={'primary'} style={{float: 'right'}}>Submit</Button>;

        return (
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                        <Grid item xs={12} sm={2} md={2} lg={4}/>
                        <Grid className={'special-form'} item xs={12} sm={8} md={8} lg={4}>
                            <h1>Verification</h1>
                            {this.renderInputs(this.state.inputs, extra)}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default VerificationPage;