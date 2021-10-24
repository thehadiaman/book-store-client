import React from "react";
import {Button, Card, CardContent, CardMedia, Grid, Rating, Typography} from "@mui/material";
import Form from "./form";

class CommonBook extends Form {

    state={}

    handleIncrement=(value)=>{
        const newQuantity = this.state.quantity+value;
        if(newQuantity<0){
            return {}
        }
        this.setState({quantity: newQuantity});
    }

    handleFavorite=()=>{
        this.setState({favorite: !this.state.favorite})
    }

    addCount=()=>{
        const {quantity} = this.state;
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

    addCart = ()=>{
        return <Button onClick={()=>this.handleIncrement(1)} variant={'contained'} style={{width: '100%'}} color={'warning'}>Add to cart</Button>;
    }

    renderImage = (url)=>{
        return <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="BOOK"
                image={url}
            />
        </Card>
    }

    renderBookDetails = (quantity, book, editCard)=>{
        return <Card>
            <CardContent>
                <Typography variant={'h5'} color="black">
                    {this.getTitle()}
                </Typography>

                <br/>

                <div style={{marginBottom: '10px'}}>
                    <span  style={{fontSize: '20px'}}>Rs. {book.price}</span>
                    <br/>
                    <span style={{'color': 'red'}}>-{book.discount}%</span>
                </div>

                <br/><br/>

                <div style={{marginBottom: '10px'}}>
                    <span className={'rating-text'}>Rating: </span> <Rating name="read-only" defaultValue={book.rating} precision={0.1} readOnly />
                </div>

                <div style={{marginBottom: '15px'}}>
                    Sold by: {book.seller && book.seller.name}
                </div>

                <div style={{marginBottom: '15px'}}>
                    Total sales: {book.sales}
                </div>

                <Typography variant="body1" style={{fontWeight: 'bold'}}>
                    Description
                </Typography>
                <Typography variant="body2" fontSize={20}>
                    {book.description}
                </Typography>

                <br/><br/>
                {this.renderAddCart(quantity)}

            </CardContent>
        </Card>
    }

    renderBookAdd = (inputs, extra)=>{
        return <Card>
            <CardContent>
                <h3>{this.getTitle()}</h3>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInputs(inputs, extra)}
                </form>
            </CardContent>
        </Card>
    }

    renderAddCart = (quantity)=>{
        return <div>
            {quantity>0? this.addCount(): this.addCart()}
        </div>
    }

}

export default CommonBook;