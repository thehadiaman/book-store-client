import React, {Component} from "react";
import {Grid, TextField} from "@mui/material";
import Joi from 'joi-browser';

class Form extends Component {

    state={}

    handleValidation = (data)=>{
        return Joi.validate(data, this.schema, {abortEarly: false})['error'];
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const error = this.handleValidation(this.getData());
        const errors = {};
        if(error) {
            for (let item of error.details)
                errors[item.path[0]] = item.message;
            return this.setState({errors});
        }
        this.setState({errors});
        this.doSubmit();
    }

    handleChange = ({target})=>{
        const inputs = [...this.state.inputs];
        const errors = {...this.state.errors};
        delete errors[target.name];
        const input = inputs.find(i=>i.name===target.name);
        const index = inputs.indexOf(input);
        input.value = target.value;
        inputs[index] = input;
        this.setState({inputs, errors});
    }

    renderForm = (label, inputs, extra)=>{
        const {errors} = this.state;
        return (
            <form onSubmit={this.handleSubmit} method={'POST'} action={'/'}>
                <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                    <Grid item xs={12} sm={3} md={3} lg={4}/>
                    <Grid className={'special-form'} item xs={12} sm={12} md={12} lg={4}>
                        <h1>{label}</h1>
                        {inputs.map(input=><TextField
                            key={input.name}
                            required={true}
                            fullWidth={true}
                            name={input.name}
                            error={errors[input.name] !== undefined}
                            helperText={errors[input.name]? errors[input.name]: ''}
                            type={input.type}
                            label={input.placeholder}
                            style={{marginBottom: '15px'}}
                            onChange={this.handleChange}
                        />)}
                        {extra}
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default Form;