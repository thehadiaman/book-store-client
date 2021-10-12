import React, {Component} from 'react';
import {Card, CardMedia, CardContent, CardActions, IconButton, Typography, Button, Rating, Grid} from '@mui/material';
import {Favorite as FavoriteIcon, Share as ShareIcon} from '@mui/icons-material';


class BookCard extends Component{

    state={
        addCountBtn: true,
        quantity: 5
    }

    render() {

        const {addCountBtn, quantity} = this.state;

        const addCount = <div>
            <Grid container columns={{ xs: 12 }}>
                <Grid item xs={3}>
                    <Button className={'btn'} variant={'contained'} color={'warning'} fullWidth={true}>-</Button>
                </Grid>
                <Grid item xs={6}>
                    <div className={'line-top'} style={{textAlign: 'center', fontSize: '30px'}}>{quantity}</div>
                </Grid>
                <Grid item xs={3}>
                    <Button className={'btn'} variant={'contained'} color={'warning'} fullWidth={true}>+</Button>
                </Grid>
            </Grid>
        </div>;

        const addCart = <Button variant={'contained'} style={{width: '100%'}} color={'warning'}>Add to cart</Button>;

        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image="https://images-na.ssl-images-amazon.com/images/I/81pQPZAFWbL.jpg"
                        alt="Book"
                    />
                    <CardContent>
                        <Typography variant="body1" color="text.primary">
                            Brief history of time
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <div style={{width: '30px'}}>
                            4.7
                        </div>
                        <Rating name="read-only" defaultValue={4.7} precision={0.1} readOnly />
                    </CardActions>
                    {addCountBtn? addCount: addCart}
                </Card>
            </Grid>
        );
    }
}

export default BookCard;