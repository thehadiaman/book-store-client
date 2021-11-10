import React, {Component} from "react";
import {Button, Container} from "@mui/material";
import {getOrders, pack} from "../services/orderService";
import Lists from "./common/list";
import Snack from "./common/snack";
import TabComponent from "./common/tabComponent";

class Orders extends Component {

    state={
        rows: [],
        snackState: false,
        snackData: {},
        value: 'ordered'
    }

    async componentDidMount() {
        await this.setOrder();
    }

    handleSnackClose = ()=>{
        this.setState({snackState: false, snackData: {}});
    }

    setOrder=async()=>{
        try{
            const rows = (await getOrders()).data;
            this.setState({rows});
        }catch (ex) {
            console.log(ex);
        }
    }

    pack=async(bookId, orderId, name)=>{
        try{
            const packed = (await pack(bookId, orderId)).data;
            console.log(packed);
            const snackData = {data: `"${name}" Packed.`}
            this.setState({snackData, snackState: true});
            await this.setOrder();
        }catch (ex) {
            console.log(ex);
            const snackData = {error: ex}
            this.setState({snackData, snackState: true});
        }
    }

    setTabValue=(event, value)=>{
        this.setState({value});
    }

    render() {
        let {rows, snackState, snackData, value} = this.state;

        for (let a=0;a<rows.length;a++){
            rows[a].action = (bookId, orderId, packed, name)=>{
                return <Button disabled={packed} onClick={()=>this.pack(bookId, orderId, name)} variant={'contained'}>Pack</Button>
            }
        }

        const props = {
            rows: rows.filter(r=>{
                if(r.status==='ordered'&&r.packed) r.status = "packed"
                return r.status===value
            }),
            head:['Title', 'Quantity', 'Delivery Partner Name', 'Delivery Partner Phone', 'Total Cost', (value==='ordered'?'Action': 'Status')],
            properties:['bookTitle', 'quantity', 'deliveryPartnerName', 'deliveryPartnerPhone', 'totalCost', (value==='ordered'?'action': 'status')]
        }
        return (
            <Container>
                <TabComponent value={value} handleChange={this.setTabValue} {...this.props}/>
                <Lists {...props}/>
                {snackState && (snackData.error || snackData.data) && <Snack severity={snackData.error? "error": "success"} handleSnackClose={this.handleSnackClose} snackState={snackState} snackMessage={snackData.error || snackData.data}/>}
            </Container>
        );
    }
}

export default Orders;