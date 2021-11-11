import React, {Component} from "react";
import {addToCart} from "../../services/cartService";
import {Button, Grid} from "@mui/material";

class Counter extends Component {

    state={
        id: this.props.id,
        quantity: this.props.quantity || 0,
        cart: this.props.cart || false
    }

    handleIncrement=async(value)=>{
        const {id, quantity} = this.state;
        const newQuantity = quantity+value;
        if(newQuantity<0){
            return {}
        }
        this.setState({quantity: newQuantity});
        this.props.setCartCount(value);
        try {
            await addToCart(id, value);
            this.state.cart && await this.props.setCartItem()
        }catch (ex) {
            console.log(ex);
            this.setState({quantity: (newQuantity-value)});
            this.props.setCartCount(-value);
        }
    }

    render() {
        const {quantity} = this.state;
        const addCount=()=>{
            return <div>
                <Grid container columns={{ xs: 12 }}>
                    <Grid item xs={3}>
                        <Button onClick={()=>this.handleIncrement(-1)} className={'btn'} variant={'contained'} color={'warning'} fullWidth={true}>-</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'line-top'} style={{textAlign: 'center', fontSize: '30px'}}>{quantity}</div>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={()=>this.handleIncrement(1)} className={'btn'} variant={'contained'} color={'warning'} fullWidth={true}>+</Button>
                    </Grid>
                </Grid>
            </div>;
        }

        const addCart = ()=>{
            return <Button disabled={!this.props.login} title={this.props.login?"Login to add to cart.": "Add to cart"} onClick={()=>this.handleIncrement(1)} variant={'contained'} style={{width: '100%'}} color={'warning'}>Add to cart</Button>;
        }

        return (quantity>0? addCount(): addCart());
    }
}

export default Counter;