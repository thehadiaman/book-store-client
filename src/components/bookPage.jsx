import React, {Component} from "react";
import Book from "./common/Book";
import {Container} from "@mui/material";
import {getBook} from "../services/bookService";

class BookPage extends Component {

    state={
        newBook: this.props.newBook || false,
        book: {}
    }


    async componentDidMount() {
        try{
            if(!this.state.newBook){
                const book = (await getBook(this.props.match.params.id)).data;
                this.setState({book});
            }
        }catch{}
    }


    render() {
        return (
            <Container>
                <Book {...this.state}/>
            </Container>
        );
    }
}

export default BookPage;