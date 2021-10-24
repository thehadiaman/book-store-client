import React from 'react';
import {Card, CardMedia, CardContent, CardActions, IconButton, Typography, Rating, Grid} from '@mui/material';
import {Favorite as FavoriteIcon, Share as ShareIcon} from '@mui/icons-material';
import CommonBook from "./commonBook";


class BookCard extends CommonBook{

    state={
        quantity: this.props.quantity,
        image: this.props.image,
        name: this.props.name,
        favorite: this.props.favorite
    }

    render() {
        const {quantity, image, name, favorite} = this.state;

        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={image}
                        alt="Book"
                    />
                    <CardContent>
                        <Typography variant="body1" color="text.primary">
                            {name}
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