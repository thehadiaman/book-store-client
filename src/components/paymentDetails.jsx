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

    onChange=(input)=>{
        // const type = input.target.value;
        const type = 'cod';
        this.setState({type});
        this.props.setMetod(type);
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
                                disabled={input.value!=='cod'}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 35,
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