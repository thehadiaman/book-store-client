import React, {Component} from "react";
import Grid from "@mui/material/Grid";
import BookCard from "./common/bookCard";
import Container from "@mui/material/Container";
import {getAllBook} from "../services/bookService";
import _ from "lodash";
import SkeletonCard from "./common/skeletonCard";

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
                        <SkeletonCard/>
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