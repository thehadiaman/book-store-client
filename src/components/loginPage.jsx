import React from "react";
import Form from "./common/form";
import {Button, Container} from "@mui/material";
import {Link} from "react-router-dom";
import Joi from 'joi-browser';

class LoginPage extends Form {

    state={
        inputs:[
            {name: 'email', type: 'email', placeholder: 'Email', value: ''},
            {name: 'password', type: 'password', placeholder: 'Password', value: ''}
        ],
        errors: {}
    }

    doSubmit = ()=>{
        console.log('Submitting');
    }

    schema = {
        email: Joi.string().email().min(8).max(50).required().label('Email'),
        password: Joi.string().min(8).max(50).required().label('Password')
    }

    getData = ()=>{
        return {
            email: this.state.inputs.filter(input=>input.name==='email')[0].value,
            password: this.state.inputs.filter(input=>input.name==='password')[0].value
        }
    }

    render() {
        document.title = 'Login';
        const {errors} = this.state;
        const disableCondition = errors.hasOwnProperty('email') || errors.hasOwnProperty('password');
        const extra = <div>
            <Link className={'link-x'} to={'/signup'}>Don't have an account? Sign Up</Link>
            <Button variant={'contained'} type={'Submit'} disabled={disableCondition} color={'primary'} style={{float: 'right'}}>Login</Button>
            <br/>
            <br/>
            <Link className={'link-x'} to={'/forgetpassword'}>Forgot password?
            </Link>
        </div>

        return (
            <Container>
                {this.renderForm('Login', this.state.inputs, extra)}
            </Container>
        );
    }
}

export default LoginPage;