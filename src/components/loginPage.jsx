import React from "react";
import Form from "./common/form";
import {Button, Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import Joi from 'joi-browser';
import {loginUser} from "../services/authService";

class LoginPage extends Form {

    state={
        inputs:[
            {name: 'email', type: 'email', placeholder: 'Email', value: ''},
            {name: 'password', type: 'password', placeholder: 'Password', value: ''}
        ],
        errors: {}
    }

    doSubmit = async()=>{
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
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                        <Grid item xs={12} sm={2} md={2} lg={4}/>
                        <Grid className={'special-form'} item xs={12} sm={8} md={8} lg={4}>
                            <h1>Login</h1>
                            {this.renderInputs(this.state.inputs, extra)}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default LoginPage;