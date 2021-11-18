import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, Rating, Grid} from '@mui/material';
import CommonBook from "./commonBook";

class BookCard extends CommonBook{

    state={
        _id: this.props._id,
        image: this.props.image,
        title: this.props.title,
        rating: this.props.rating
    }

    handleBookClick = (id)=>{
        this.props.history.push(`/book/${id}`)
    }

    render() {
        const {_id, image, title, rating} = this.state;
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        className={'media-zoom pointer'}
                        onClick={()=>{this.handleBookClick(_id)}}
                        component="img"
                        height="300"
                        image={image}
                        alt="Book"
                    />
                    <CardContent>
                        <Typography sx={{height: 60}} className={'pointer'} variant="body1" color="text.primary" onClick={()=>{this.handleBookClick(_id)}}>
                            {title.toUpperCase()}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <div style={{width: '30px'}}>
                            {rating}
                        </div>
                        <Rating name="read-only" defaultValue={rating} precision={0.5} readOnly />
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default BookCard;