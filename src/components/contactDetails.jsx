import React from "react";
import Joi from "joi-browser";
import {updateAddress} from "../services/userService";
import LoadingButton from "@mui/lab/LoadingButton";
import {Save} from "@mui/icons-material";
import Form from "./common/form";

class ContactDetails extends Form {

    state={
        inputs:[
            {name: 'address', type: 'multiline', placeholder: 'Address', value: ''},
            {name: 'phone', type: 'text', placeholder: 'Phone Number', value: ''},
            {name: 'zip', type: 'text', placeholder: 'Zip code', value: ''}
        ],
        errors: {},
        addressButtonLoading: false
    }

    async componentDidMount() {
        const user = this.props.user;
        const inputs = [...this.state.inputs];

        const address = inputs.find(input=>input.name==='address');
        const indexOfAddress = inputs.indexOf(address);
        inputs[indexOfAddress].value = user.address;

        const phone = inputs.find(input=>input.name==='phone');
        const indexOfPhone = inputs.indexOf(phone);
        inputs[indexOfPhone].value = user.phone;

        const zip = inputs.find(input=>input.name==='zip');
        const indexOfZip = inputs.indexOf(zip);
        inputs[indexOfZip].value = user.zip !== null? user.zip: "";

        this.setState({inputs});
    }

    schema = {
        address: Joi.string().min(10).max(50).required().label('Address'),
        phone: Joi.number().min(10000000).max(9999999999999).required().label('Phone'),
        zip: Joi.number().min(100000).max(999999).required().label('Zip'),
    }

    getData = ()=>{
        return {
            address: this.state.inputs.find(input=>input.name==='address').value,
            phone: this.state.inputs.find(input => input.name === "phone").value,
            zip: this.state.inputs.find(input => input.name === "zip").value
        }
    }

    doSubmit=async()=>{
        this.setState({addressButtonLoading: true});
        try{
            await updateAddress(this.getData());
        }catch (ex) {
            console.log(ex);
            const errors = {}
            errors.address = ex.response.data;
            this.setState({errors});
        }
        setTimeout(()=>this.setState({addressButtonLoading: false}), 1000);
    }

    render() {

        const extra = <LoadingButton loading={this.state.addressButtonLoading} loadingPosition="start" style={{float: 'right'}}
                                     type={'submit'} variant={'contained'} startIcon={<Save/>} >Save</LoadingButton>

        return (
            <form onSubmit={this.handleSubmit}>
                <h5>Change address ?</h5>
                {this.renderInputs(this.state.inputs, extra)}
            </form>
        );
    }
}

export default ContactDetails;