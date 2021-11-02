import React from "react";
import {Button, Step, StepLabel, Stepper, Grid, Container, LinearProgress, Stack} from "@mui/material";
import Form from "./common/form";
import Joi from "joi-browser";
import {checkDeliveryPartner, checkEmail, saveUser} from "../services/userService";

class SignupPage extends Form{

    state={
        activeStep: 0,
        inputs: [
            {name: 'name', type: 'text', placeholder: 'Name', value: ''},
            {name: 'email', type: 'email', placeholder: 'Email', value: ''},
            {name: 'address', type: 'text', placeholder: 'Address', value: ''},
            {name: 'phone', type: 'text', placeholder: 'Phone Number', value: ''},
            {name: 'zip', type: 'text', placeholder: 'Zip code', value: ''},
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
                phone: Joi.number().min(10000000).max(9999999999999).required(),
                zip: Joi.number().min(100000).max(999999).required().label('Zip')
            },
            {
                type: Joi.string().min(5).max(18).required().valid('seller', 'buyer', 'delivery_partner').label('Type'),
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
                phone: this.state.inputs.filter(input => input.name === "phone")[0].value,
                zip: this.state.inputs.find(input => input.name === "zip").value
            },
            {
                type: this.state.inputs.filter(input => input.name === "type")[0].value,
                password: this.state.inputs.filter(input => input.name === "password")[0].value
            }
        ];
    }

    handleValidation = (data)=>{
        return Joi.validate(data, this.schema(), {abortEarly: false})['error'];
    }

    getAllValues = ()=>{
        const properties = ['name', 'email', 'address', 'phone', 'zip', 'type', 'password'];
        const values = {};
        for(let a=0;a<properties.length;a++) {
            values[properties[a]] = this.state.inputs.filter(input => input.name === properties[a])[0].value;
        }
        return values
    }

    handleNext = async()=>{
        const prevStep = this.state.activeStep;
        const error = this.handleValidation(this.getData()[this.state.activeStep]);
        const errors = {};
        if(error) {
            console.log(errors);
            for (let item of error.details)
                errors[item.path[0]] = item.message;
            this.setState({errors});
        }else{
            if(this.getData()[this.state.activeStep].email){
                const emailCheck = (await checkEmail(this.getData()[this.state.activeStep].email)).data;
                if(!emailCheck){
                    errors.email = 'This email is already in use.';
                    return this.setState({errors});
                }else{
                    this.setState({activeStep: prevStep+1})
                }
            }else{
                this.setState({activeStep: prevStep+1})
            }
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

    handleSubmit = async(e)=>{
        e.preventDefault();

        const type = this.getData()[this.state.activeStep].type;
        const prevStep = this.state.activeStep;
        const errors = {};
        if(type==='delivery_partner'){
            try{
                const zip = await checkDeliveryPartner(this.getData()[1].zip);
                console.log(zip);
            }catch(ex){
                console.log(ex.response.data);
                errors.zip = ex.response.data;
                this.setState({errors});
                const inputs = [...this.state.inputs];
                for (let input of ['type', 'password'])
                    inputs.find(i=>i.name===input).value = "";
                this.setState({activeStep: prevStep-1, inputs});
                return;
            }
        }

        await this.handleNext();
        try{
            const data = (await saveUser(this.getAllValues()));
            localStorage.setItem('jwtToken', data.headers['x-auth-token']);
            window.location = '/verification';
        }catch (ex){
            console.log(ex)
        }
    }

    render() {
        const {activeStep, inputs} = this.state;
        const {handleNext, handleReset, handleBack, doSubmit} = this;

        const steps = ['Basic', 'Contact', 'Security'];

        const stepComponents = [
            this.renderInputs(this.inputSelector(inputs, 0, 1), ""),
            this.renderInputs(this.inputSelector(inputs, 2, 4), ""),
            this.renderInputs(this.inputSelector(inputs, 5, 6), ""),
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={3}>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
                <LinearProgress color="inherit"/>
            </Stack>
        ];

        document.title = "Signup";

        return (
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                        <Grid item xs={12} sm={2} md={2} lg={4}/>
                        <Grid className={'special-form'} item xs={12} sm={8} md={8} lg={4}>
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
