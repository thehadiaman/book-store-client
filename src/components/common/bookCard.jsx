import React from 'react';
import {Card, CardMedia, CardContent, CardActions, IconButton, Typography, Rating, Grid} from '@mui/material';
import {Favorite as FavoriteIcon, Share as ShareIcon} from '@mui/icons-material';
import CommonBook from "./commonBook";


class BookCard extends CommonBook{

    state={
        _id: this.props._id,
        quantity: 0,
        image: this.props.image,
        title: this.props.title,
        favorite: this.props.favorite
    }

    handleBookClick = (id)=>{
        this.props.history.push(`/book/${id}`)
    }

    render() {
        const {_id, quantity, image, title, favorite} = this.state;

        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        className={'pointer'}
                        onClick={()=>{this.handleBookClick(_id)}}
                        component="img"
                        height="300"
                        image={image}
                        alt="Book"
                    />
                    <CardContent>
                        <Typography sx={{height: 40}} className={'pointer'} variant="body1" color="text.primary" onClick={()=>{this.handleBookClick(_id)}}>
                            {title.toUpperCase()}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton onClick={this.handleFavorite} aria-label="add to favorites">
                            <FavoriteIcon color={favorite? 'error': 'inherit'}/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <div style={{width: '30px'}}>
                            4.7
                        </div>
                        <Rating name="read-only" defaultValue={4.7} precision={0.1} readOnly />
                    </CardActions>
                    {quantity>0? this.addCount(): this.addCart()}
                </Card>
            </Grid>
        );
    }
}

export default BookCard;