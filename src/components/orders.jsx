import React, {Component} from "react";
import {Button, Container} from "@mui/material";
import {getOrders, pack} from "../services/orderService";
import Lists from "./common/list";
import Snack from "./common/snack";

class Orders extends Component {

    state={
        rows: [],
        snackState: false,
        snackData: {}
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

    render() {
        let {rows, snackState, snackData} = this.state;

        for (let a=0;a<rows.length;a++){
            rows[a].action = (bookId, orderId, packed, name)=>{
                return <Button disabled={packed} onClick={()=>this.pack(bookId, orderId, name)} variant={'contained'}>Pack</Button>
            }
        }

        const props = {
            rows: rows,
            head:['Title', 'Quantity', 'Delivery Partner Name', 'Delivery Partner Phone', 'Total Cost', 'Action'],
            properties:['bookTitle', 'quantity', 'deliveryPartnerName', 'deliveryPartnerPhone', 'totalCost', 'action']
        }
        return (
            <Container>
                <Lists {...props}/>
                {snackState && (snackData.error || snackData.data) && <Snack severity={snackData.error? "error": "primary"} handleSnackClose={this.handleSnackClose} snackState={snackState} snackMessage={snackData.error || snackData.data}/>}
            </Container>
        );
    }
}

export default Orders;