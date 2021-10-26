import React, {Component} from "react";
import {getAllCartItems} from "../services/cartService";
import CartCard from "./common/cartCard";
import {
    Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle,
    Container,
    Grid, Typography,
} from "@mui/material";
import List from "./common/list";
import {ExpandMore} from "@mui/icons-material";
import {Link} from "react-router-dom";

class Cart extends Component {

    state={
        cartItems: []
    }

    async componentDidMount() {
        const cartItems = (await getAllCartItems()).data;
        this.setState({cartItems});
    }

    setCartItem=async()=>{
        const cartItems = (await getAllCartItems()).data;
        await this.setState({cartItems});
    }

    render() {
        const {cartItems} = this.state;
        const head = ['Title', 'Price', 'Quantity', 'Total'];
        const properties = ['title', 'price', 'quantity', 'total'];
        if(cartItems.length===0){
            return <Container>
                <Alert severity="warning">
                    <AlertTitle>Empty cart</AlertTitle>
                    The cart is empty <Link to={'/'}><strong>go to Home page</strong></Link>
                </Alert>
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
                                <Typography>Total cost</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{padding: 0}}>
                                <List rows={cartItems} head={head} properties={properties} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Cart;