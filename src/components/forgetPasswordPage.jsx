import React from "react";
import {Button, Step, StepLabel, Stepper, Grid, Container, LinearProgress, Stack} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";
import {forgetPassword, resetPassword} from "../services/userService";


class ForgetPasswordPage extends Form{

    state={
        activeStep: 0,
        inputs: [
            {name: 'email', type: 'email', placeholder: 'Email', value: ''},
            {name: 'code', type: 'text', placeholder: 'Verification Code', value: ''},
            {name: 'password', type: 'password', placeholder: 'Password', value: ''}
        ],
        errors: {},
        nextDisabled: false
    }

    schema = ()=>{
        return [
            {
                email: Joi.string().email().min(8).max(50).required().label('Email')
            },
            {
                code: Joi.string().min(5).max(6).required().label('Verification Code'),
            },
            {
                password: Joi.string().min(8).max(50).required().label('Password')
            }
        ][this.state.activeStep]
    }

    getData = ()=>{
        return [
            {
                email: this.state.inputs.filter(input => input.name === "email")[0].value
            },
            {
                code: this.state.inputs.filter(input => input.name === "code")[0].value,
            },
            {
                password: this.state.inputs.filter(input => input.name === "password")[0].value
            }
        ];
    }

    handleValidation = (data)=>{
        return Joi.validate(data, this.schema(), {abortEarly: false})['error'];
    }

    getAllValues = ()=>{
        const properties = ['email', 'code', 'password'];
        const values = {};
        for(let a=0;a<properties.length;a++) {
            values[properties[a]] = this.state.inputs.filter(input => input.name === properties[a])[0].value;
        }
        return values
    }

    handleNext = async()=>{
        const {activeStep} = this.state;
        this.setState({nextDisabled: true});
        try{
            if(activeStep===0){
                await forgetPassword(this.getData()[0].email);
            }
            if(activeStep!==2){
                this.setState({activeStep: activeStep+1});
            }
        }catch (ex) {
            const errors = {};
            errors.email = ex.response.data;
            this.setState({errors});
        }
        this.setState({nextDisabled: false});
    }

    handleReset = ()=>{
        const inputs = [...this.state.inputs];
        for(let item of inputs)
            item.value = ''
        this.setState({activeStep: 0});
    }

    handleBack = ()=>{
        const prevStep = this.state.activeStep;
        this.setState({activeStep: prevStep-1});
    }

    handleSubmit = async(e)=>{
        e.preventDefault();
        await this.handleNext();
        try{
            await resetPassword({code: this.getAllValues().code, email: this.getAllValues().email, password: this.getAllValues().password});
            this.props.handleLinkChange('/login');
            this.props.history.replace('/login');
        }catch (ex) {
            console.log(ex.response.data);
            const errors = {};
            errors['code'] = ex.response.data;
            const inputs = [...this.state.inputs];
            inputs[2].value = '';
            this.setState({activeStep: 1, errors, inputs});
        }
    }

    render() {
        const {activeStep, nextDisabled} = this.state;
        const {handleNext, handleReset, handleBack} = this;

        const steps = ['Email', 'Verification code', 'Password'];

        const stepComponents = [
            this.renderInputs([this.state.inputs[0]], ""),
            this.renderInputs([this.state.inputs[1]], ""),
            this.renderInputs([this.state.inputs[2]], ""),
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={3}>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
            </Stack>
        ];

        document.title = "Reset Password";

        return (
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                        <Grid item xs={12} sm={2} md={2} lg={4}/>
                        <Grid className={'special-form'} item xs={12} sm={8} md={8} lg={4}>
                            <h1>Reset Password</h1>
                            <Stepper activeStep={activeStep} style={{marginBottom: "10px"}}>
                                {steps.map(step=> {
                                    return <Step key={step}>
                                        <StepLabel>{step}</StepLabel>
                                    </Step>
                                })}
                            </Stepper>

                            {stepComponents[activeStep]}

                            <div style={{marginTop: "10px"}}>
                                <Button disabled={activeStep === 0 || activeStep === 3}  variant={'contained'} color={'warning'} onClick={handleBack}>
                                    Back
                                </Button>

                                <div style={{float: 'right'}}>
                                    {((steps.length-1)===activeStep) && (
                                        <Button style={{marginRight: '10px'}} variant={'contained'} color={'error'} onClick={handleReset}>
                                            Reset
                                        </Button>
                                    )}

                                    <Button type={(steps.length-1)===activeStep? "submit":"button"} variant={'contained'} color={'success'}
                                            disabled={(activeStep === 3) || nextDisabled} onClick={(steps.length-1)===activeStep? null:handleNext}>
                                        {(steps.length-1)===activeStep? "Signup":"Next"}
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default ForgetPasswordPage;
