import React, {Component} from "react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Joi from 'joi-browser';

class Form extends Component{

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
            console.log(errors);
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

    renderInputs = (inputs, extra, disabled=false)=>{
        const {errors} = this.state;
        return (
            <React.Fragment>
                {inputs.map(input=>{
                    if(input.type === 'select'){
                        return <FormControl style={{marginBottom: '15px'}} fullWidth key={input.name} error={errors[input.name] !== undefined}>
                            <InputLabel id="type">Type</InputLabel>
                            <Select
                                fullWidth
                                labelId="type"
                                name={input.name}
                                value={this.state.inputs.find(i=>i.name===input.name).value}
                                label="Type"
                                disabled={disabled}
                                onChange={this.handleChange}
                                renderValue={value=>value}
                            >
                                <MenuItem value={'buyer'}>Buyer</MenuItem>
                                <MenuItem value={'seller'}>Seller</MenuItem>
                                <MenuItem value={'delivery_partner'}>Delivery Partner</MenuItem>
                            </Select>
                            {(errors[input.name] !== undefined) && (
                                <FormHelperText>{errors[input.name]? errors[input.name]: ''}</FormHelperText>
                            )}
                        </FormControl>
                    }

                    return <TextField
                        key={input.name}
                        required={true}
                        fullWidth={true}
                        name={input.name}
                        error={errors[input.name] !== undefined}
                        helperText={errors[input.name]? errors[input.name]: ''}
                        multiline={input.type==="multiline"}
                        rows={input.type==="multiline"? 5: 0}
                        type={input.type==="multiline"? 'text': input.type}
                        value={this.state.inputs.find(i=>i.name===input.name).value}
                        label={input.placeholder}
                        title={input.placeholder}
                        disabled={disabled}
                        style={{marginBottom: '15px'}}
                        onChange={this.handleChange}
                    />})}
                {extra}
            </React.Fragment>
        );
    }
}

export default Form;