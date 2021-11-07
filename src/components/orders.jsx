import React, {Component} from "react";
import {Button, Container} from "@mui/material";
import {getOrders} from "../services/orderService";
import Lists from "./common/list";

class Orders extends Component {

    state={
        rows: []
    }

    async componentDidMount() {
        const rows = (await getOrders()).data;
        this.setState({rows});
    }

    render() {
        let {rows} = this.state;

        for (let a=0;a<rows.length;a++){
            rows[a].action = ()=>{
                return <Button variant={'contained'}>Pack</Button>
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
            </Container>
        );
    }
}

export default Orders;