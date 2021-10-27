import React, {Component} from "react";
import Grid from "@mui/material/Grid";
import BookCard from "./common/bookCard";
import Container from "@mui/material/Container";
import {getAllBook} from "../services/bookService";
import {
    BottomNavigation,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Rating,
    Skeleton,
    Typography
} from "@mui/material";
import {Favorite as FavoriteIcon, Share as ShareIcon} from "@mui/icons-material";
import _ from "lodash";

class HomePage extends Component {

    state={
        books:[]
    }


    async componentDidMount() {
        const books = (await getAllBook()).data;
        this.setState({books});
    }


    render() {
        document.title = "Home";
        const {books} = this.state;

        if(books.length===0){
            return <Container>
                <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                    {_.range(8).map(a=><Grid key={a} item xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <Skeleton variant="rectangular"height={300} animation="wave"/>
                            <CardContent>
                                <Typography sx={{height: 60}} className={'pointer'} variant="body1" color="text.primary">
                                    <Skeleton sx={{ bgcolor: 'grey' }} variant="rectangular" height={20} animation="wave" style={{marginBottom: '5px'}}/>
                                    <Skeleton variant="rectangular" height={20} animation="wave"/>
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton onClick={this.handleFavorite} aria-label="add to favorites">
                                    <FavoriteIcon color={'inherit'}/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <div style={{width: '30px'}}>
                                    0
                                </div>
                                <Rating name="read-only" defaultValue={0} precision={0.1} readOnly />
                            </CardActions>
                        </Card>
                    </Grid>)}
                </Grid>
            </Container>
        }

        return (
            <Container>
                <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                    {books.map(book=><BookCard {...this.props} key={book._id} {...book}/>)}
                </Grid>
            </Container>
        );
    }
}

export default HomePage;