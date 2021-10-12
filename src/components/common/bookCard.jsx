import React, {Component} from 'react';
import {Card, CardMedia, CardContent, CardActions, IconButton, Typography, Button, Rating, Grid} from '@mui/material';
import {Favorite as FavoriteIcon, Share as ShareIcon} from '@mui/icons-material';


class BookCard extends Component{

    state={
        quantity: this.props.quantity,
        image: this.props.image,
        name: this.props.name,
        favorite: this.props.favorite
    }

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

    render() {
        const {quantity, image, name, favorite} = this.state;
        const addCount = <div>
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

        const addCart = <Button onClick={()=>this.handleIncrement(1)} variant={'contained'} style={{width: '100%'}} color={'warning'}>Add to cart</Button>;

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
                    {quantity>0? addCount: addCart}
                </Card>
            </Grid>
        );
    }
}

export default BookCard;