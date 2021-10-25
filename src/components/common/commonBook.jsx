import React from "react";
import {Card, CardContent, CardMedia, Rating, Typography} from "@mui/material";
import Form from "./form";
import Counter from "./counter";

class CommonBook extends Form {

    state={}

    handleFavorite=()=>{
        this.setState({favorite: !this.state.favorite})
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

    renderBookDetails = (book)=>{
        const quantity = book.quantity;
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
                {book._id!==undefined && <Counter setCartCount={this.props.setCartCount} id={book._id} quantity={quantity} />}
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
}

export default CommonBook;