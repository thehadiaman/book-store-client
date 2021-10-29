import React, {Component} from "react";
import {Card, CardContent, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {MonetizationOn} from "@mui/icons-material";

class PaymentDetails extends Component {

    state={
        type: 'cod',
        inputs: [
            {value: 'cod', label: 'Cash On Delivery'},
            {value: 'card', label: 'Online payment'},
        ]
    }

    doSubmit=()=>{
        console.log('Payment Details');
    }

    onChange=(input)=>{
        const type = input.target.value;
        this.setState({type});
    }

    render() {
        const {inputs, type} = this.state;
        return (
            <div>
                <h5>Select Payment Method</h5>
                <Card sx={{ minWidth: 275 }} className={'card-hover-outline-black'}>
                    <CardContent>
                        <RadioGroup
                            aria-label="quiz"
                            name="quiz"
                        >
                            {inputs.map(input=><FormControlLabel
                                key={input.value}
                                value={input.value}
                                onClick={this.onChange}
                                control={<Radio checkedIcon={<MonetizationOn/>} icon={<MonetizationOn/>} checked={input.value===type} color="warning"/>}
                                label={input.label}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }}
                            />)}
                        </RadioGroup>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default PaymentDetails;