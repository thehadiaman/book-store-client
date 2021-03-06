import React from "react";
import {getAllCartItems, getTotalPrice} from "../services/cartService";
import CartCard from "./common/cartCard";
import {
    Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Button,
    Container,
    Grid, Typography,
} from "@mui/material";
import List from "./common/list";
import {ExpandMore} from "@mui/icons-material";
import {Link} from "react-router-dom";
import CommonCart from "./common/commonCart";

class Cart extends CommonCart {

    state={
        cartItems: [],
        totalPrice: 0
    }

    async componentDidMount() {
        const cartItems = (await getAllCartItems()).data;
        const totalPrice = (await getTotalPrice()).data.total;
        this.setState({cartItems, totalPrice});
    }

    setCartItem=async()=>{
        const cartItems = (await getAllCartItems()).data;
        const totalPrice = (await getTotalPrice()).data.total;
        await this.setState({cartItems, totalPrice});
    }

    render() {
        const {user, history} = this.props;
        if(!user.name){
            history.replace('/');
        }else if(user.name && !user.validate.valid){
            history.replace('/verification');
        }

        const {cartItems} = this.state;
        const head = ['Title', 'Price', 'Quantity', 'Total'];
        const properties = ['title', 'price', 'quantity', 'total'];
        if(cartItems.length===0){
            return <Container>
                <Alert severity="warning">
                    <AlertTitle>Empty cart</AlertTitle>
                    The cart is empty <Link to={'/'}><strong>go to Home page</strong></Link>
                </Alert>
                <div style={{textAlign: "center"}}>
                    <svg width={"50%"} style={{margin: 0}} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" x="0px" y="0px" >
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
            <Container>
                <Grid container spacing={{md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                    <Grid item xs={12} sm={7} md={7} lg={7}>
                        {
                            cartItems.map(item=>{
                                return <CartCard key={item.cartItems._id} setCartItem={this.setCartItem} setCartCount={this.props.setCartCount} item={item.cartItems}/>
                            })
                        }
                    </Grid>
                    <Grid item xs={12} sm={5} md={5} lg={5}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Total cost: <b>???{this.getTotalPrice()}</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{padding: 0}}>
                                <List rows={cartItems} head={head} properties={properties} />
                                <Grid container columns={2} padding={"10px"}>
                                    <Grid item xs={6}>
                                        <b style={{fontSize: "25px"}}>???{this.getTotalPrice()}</b> <div style={{width: "100%"}} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={()=>this.props.history.push('/placeOrder')} style={{width: "100%"}} variant={'contained'} color={'warning'} float={'right'}>Place Order</Button>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Cart;