import React, {Component} from "react";
import Book from "./common/Book";
import {Container} from "@mui/material";

class BookPage extends Component {

    state={
        newBook: true
    }

    render() {
        return (
            <Container>
                <Book setTitle={this.setTitle}/>
            </Container>
        );
    }
}

export default BookPage;