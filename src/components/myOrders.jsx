import React, {Component} from "react";
import {getMyOrders} from "../services/orderService";
import MyOrder from "./common/myOrder";
import {Alert, AlertTitle, Container} from "@mui/material";
import {Link} from "react-router-dom";

class MyOrders extends Component {

    state={
        orders: []
    }

    async componentDidMount() {
        await this.setOrders();
    }

    setOrders=async()=>{
        try{
            const orders = (await getMyOrders()).data
            this.setState({orders})
        }catch(ex){
            console.log(ex);
        }
    }

    render() {
        const {orders} = this.state;
        document.title = "My Orders";

        if(!orders.length || orders.length<=0){
            return <Container>
                <Alert severity="warning">
                    <AlertTitle>Empty Orders</AlertTitle>
                    The orders list is empty <Link to={'/'}><strong>go to Home page</strong></Link>
                </Alert>
                <div style={{textAlign: "center"}}>
                    <svg width={"50%"} style={{margin: 0}} fill="#000000" viewBox="0 0 36 36" x="0px" y="0px" >
                        <g>
                            <path d="M28,25H9a1,1,0,0,1-1-.84L5.15,6H2V4H6a1,1,0,0,1,1,.84L9.85,23H27.29l4.29-12H26V9h7a1,1,0,0,1,.82.42,1,1,0,0,1,.12.92l-5,14A1,1,0,0,1,28,25Z"/>
                            <path d="M13,32a3,3,0,1,1,3-3A3,3,0,0,1,13,32Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,13,28Z"/>
                            <path d="M23,32a3,3,0,1,1,3-3A3,3,0,0,1,23,32Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,23,28Z"/>
                            <path d="M15,12a1,1,0,0,1-.71-.29,1.15,1.15,0,0,1-.21-.33.94.94,0,0,1,0-.76,1.15,1.15,0,0,1,.21-.33,1,1,0,0,1,1.42,0,1,1,0,0,1,.21.33A.84.84,0,0,1,16,11a1,1,0,0,1-.29.71,1.15,1.15,0,0,1-.33.21A.84.84,0,0,1,15,12Z"/>
                            <path d="M21,12a.84.84,0,0,1-.38-.08,1.15,1.15,0,0,1-.33-.21,1,1,0,0,1-.21-1.09,1.15,1.15,0,0,1,.21-.33,1,1,0,0,1,1.42,0,1.15,1.15,0,0,1,.21.33,1,1,0,0,1-.21,1.09,1.15,1.15,0,0,1-.33.21A.84.84,0,0,1,21,12Z"/>
                            <path d="M18,15a5,5,0,0,0-4.33,2.5,1,1,0,0,0,1.73,1,3,3,0,0,1,5.2,0,1,1,0,0,0,1.73-1A5,5,0,0,0,18,15Z"/>
                        </g>
                    </svg>
                </div>
            </Container>
        }

        return (
            <MyOrder setOrders={this.setOrders} {...this.props} orders={orders}/>
        );
    }
}

export default MyOrders;