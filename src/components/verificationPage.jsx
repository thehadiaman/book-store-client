import React from "react";
import Form from "./common/form";
import {Button, Container, Grid} from "@mui/material";
import Joi from 'joi-browser';
import {getNewVerificationCode, verifyUser} from "../services/userService";
import Snack from "./common/snack";

class VerificationPage extends Form {

    state={
        inputs:[
            {name: 'verificationCode', type: 'text', placeholder: 'Verification Code', value: ''}
        ],
        errors: {},
        snackState: false,
        newCode: ''
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

    handleNewVerificationCode = async()=>{
        try {
            const data = (await getNewVerificationCode()).data
            this.setState({newCode: data, snackState: true});
        }catch (ex) {
            const errors = {newCodeError: ex.response.data};
            this.setState({errors, snackState: true})
        }
    }

    handleSnackClose = ()=>{
        this.setState({snackState: false})
    }


    render() {
        document.title = 'Verification';
        const extra = <div>
            <span className={"link-x"} onClick={this.handleNewVerificationCode} style={{textDecoration: "underline", cursor: "pointer"}}>Didn't receive email ?.</span>
            <Button variant={'contained'} type={'Submit'} color={'primary'} style={{float: 'right'}}>Submit</Button>
        </div>;

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
                {this.state.snackState && this.state.errors.newCodeError && <Snack severity={"error"} handleSnackClose={this.handleSnackClose} snackState={this.state.snackState} snackMessage={this.state.errors.newCodeError}/>}
                {this.state.snackState && !this.state.errors.newCodeError && <Snack severity={"success"} handleSnackClose={this.handleSnackClose} snackState={this.state.snackState} snackMessage={this.state.newCode}/>}
            </Container>
        );
    }
}

export default VerificationPage;