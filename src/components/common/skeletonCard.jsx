import React, {Component} from "react";
import {Card, CardActions, CardContent, Rating, Skeleton, Typography} from "@mui/material";

class SkeletonCard extends Component {
    render() {
        return (
            <Card sx={{ maxWidth: 345 }}>
                <Skeleton variant="rectangular" height={300} animation="wave"/>
                <CardContent>
                    <Typography sx={{height: 60}} className={'pointer'} variant="body1" color="text.primary">
                        <Skeleton sx={{ bgcolor: 'grey' }} variant="rectangular" height={20} animation="wave" style={{marginBottom: '5px'}}/>
                        <Skeleton variant="rectangular" height={20} animation="wave"/>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <div style={{width: '30px'}}>
                        0
                    </div>
                    <Rating name="read-only" defaultValue={0} precision={0.1} readOnly />
                </CardActions>
            </Card>
        );
    }
}

export default SkeletonCard;