import React, {Component} from "react";
import Book from "./common/Book";
import {Container} from "@mui/material";
import {getBook} from "../services/bookService";
import {getCart} from "../services/cartService";
import Review from "./common/review";

class BookPage extends Component {

    state={
        newBook: this.props.newBook || false,
        book: {}
    }


    async componentDidMount() {
        try{
            if(!this.state.newBook){
                const book = (await getBook(this.props.match.params.id)).data;
                const {cart} = (await getCart()).data;
                const item = cart!==undefined ? cart.find(i=>i.bookId===book._id): {};
                book['quantity'] = item!==undefined? item['quantity']: 0;
                this.setState({book})
            }
        }catch (ex){
            console.log(ex);
        }
    }


    render() {
        return (
            <Container>
                <Book setCartCount={this.props.setCartCount} {...this.props} {...this.state}/>
                {!this.state.newBook && <Review {...this.props}/>}
            </Container>
        );
    }
}

export default BookPage;