import React, {Component} from "react";
import Grid from "@mui/material/Grid";
import BookCard from "./common/bookCard";
import Container from "@mui/material/Container";

class HomePage extends Component {

    state={
        books:[
            {_id: 0, image: 'https://images-na.ssl-images-amazon.com/images/I/81pQPZAFWbL.jpg', name: 'Brief history of time', quantity: 0, favorite: true},
            {_id: 1, image: 'https://images-na.ssl-images-amazon.com/images/I/81iAADNy2NL.jpg', name: 'Atomic Habits', quantity: 3, favorite: false}
        ]
    }

    render() {
        document.title = "Home";
        const {books} = this.state;
        return (
            <Container>
                <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                    {books.map(book=><BookCard key={book._id} {...book}/>)}
                </Grid>
            </Container>
        );
    }
}

export default HomePage;