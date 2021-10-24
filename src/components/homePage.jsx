import React, {Component} from "react";
import Grid from "@mui/material/Grid";
import BookCard from "./common/bookCard";
import Container from "@mui/material/Container";
import {getAllBook} from "../services/bookService";

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