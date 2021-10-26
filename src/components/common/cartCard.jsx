import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import Counter from "./counter";
import {Delete} from "@mui/icons-material";
import {Link} from "react-router-dom";

function CartCard({item, setCartCount, setCartItem}) {

    const quantity = item.quantity;
    return (
        <Card style={{margin: "10px"}}>
            <Grid container spacing={{md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                <Grid item xs={3} sm={2} md={2} lg={3}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={item.image}
                            alt="green iguana"
                        />
                    </CardActionArea>
                </Grid>
                <Grid item xs={9} sm={10} md={10} lg={9}>
                    <CardContent>
                        <Link to={`/${item._id}`} className={'link-title'}>
                            <Typography variant="p" component="div">
                                {item.title.toUpperCase()}
                            </Typography>
                        </Link>
                        <Typography style={{fontWeight: 'bolder'}}>
                            price: {item.price}
                        </Typography>
                        <Counter cart={true} setCartItem={setCartItem} id={item._id} quantity={quantity} setCartCount={setCartCount}/>
                        <IconButton aria-label="delete" title={'remove'} color={'error'}  size="large">
                            <Delete fontSize="inherit" />
                        </IconButton>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CartCard;