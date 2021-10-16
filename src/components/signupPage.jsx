import React from "react";
import {Button, Step, StepLabel, Stepper, Grid, Container, LinearProgress, Stack} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";

class SignupPage extends Form{

    state={
        activeStep: 0,
        inputs: [
            {name: 'name', type: 'text', placeholder: 'Name', value: ''},
            {name: 'email', type: 'email', placeholder: 'Email', value: ''},
            {name: 'address', type: 'text', placeholder: 'Address', value: ''},
            {name: 'phone', type: 'text', placeholder: 'Phone Number', value: ''},
            {name: 'type', type: 'select', placeholder: 'Type', value: ''},
            {name: 'password', type: 'password', placeholder: 'Password', value: ''}
        ],
        errors: {}
    }

    inputSelector = (inputs, beginning, ending)=>{
        const data = [];
        for(let a=0;a<inputs.length;a++){
            if(a>=beginning && a<=ending){
                data.push(inputs[a])
            }
        }
        return data;
    }

    schema = ()=>{
        return [
            {
                name: Joi.string().min(3).max(50).required().label('Name'),
                email: Joi.string().email().min(8).max(50).required().label('Email')
            },
            {
                address: Joi.string().min(6).max(60).required().label('Address'),
                phone: Joi.string().min(8).max(13).required()
            },
            {
                type: Joi.string().min(5).max(6).required().valid('seller', 'buyer'),
                password: Joi.string().min(8).max(50).required().label('Password')
            }
        ][this.state.activeStep]
    }

    getData = ()=>{
        return [
            {
                name: this.state.inputs.filter(input => input.name === "name")[0].value,
                email: this.state.inputs.filter(input => input.name === "email")[0].value
            },
            {
                address: this.state.inputs.filter(input => input.name === "address")[0].value,
                phone: this.state.inputs.filter(input => input.name === "phone")[0].value
            },
            {
                type: this.state.inputs.filter(input => input.name === "type")[0].value,
                password: this.state.inputs.filter(input => input.name === "password")[0].value
            }
        ][this.state.activeStep];
    }

    handleValidation = (data)=>{
        return Joi.validate(data, this.schema(), {abortEarly: false})['error'];
    }

    handleNext = ()=>{
        const prevStep = this.state.activeStep;
        const error = this.handleValidation(this.getData());
        const errors = {};
        if(error) {
            for (let item of error.details)
                errors[item.path[0]] = item.message;
            return this.setState({errors});
        }else{
            this.setState({activeStep: prevStep+1})
        }
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

    handleSubmit = (e)=>{
        e.preventDefault();
        this.handleNext();
        console.log('Submitting');
    }

    render() {
        const {activeStep, inputs} = this.state;
        const {handleNext, handleReset, handleBack, doSubmit} = this;

        const steps = ['Basic', 'Contact', 'Security'];

        const stepComponents = [
            this.renderInputs(this.inputSelector(inputs, 0, 1), ""),
            this.renderInputs(this.inputSelector(inputs, 2, 3), ""),
            this.renderInputs(this.inputSelector(inputs, 4, 5), ""),
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={3}>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
            </Stack>
        ];

        return (
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                        <Grid item xs={12} sm={3} md={3} lg={4}/>
                        <Grid className={'special-form'} item xs={12} sm={12} md={12} lg={4}>
                            <h1>Signup</h1>
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

                                    <Button type={(steps.length-1)===activeStep? "submit":"button"} variant={'contained'} color={'success'} disabled={activeStep === 3} onClick={(steps.length-1)===activeStep? doSubmit:handleNext}>
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

export default SignupPage;
