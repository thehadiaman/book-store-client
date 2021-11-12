import React, {Component} from "react";
import Book from "./common/Book";
import {Container} from "@mui/material";
import {getBook} from "../services/bookService";
import {getCart} from "../services/cartService";
import Review from "./common/review";

class BookPage extends Component {

    state={
        newBook: this.props.newBook || false,
        book: {},
        inputs: [
            {name: 'title', type: 'text', placeholder: 'Title', value: ''},
            {name: 'image', type: 'text', placeholder: 'Image URL', value: ''},
            {name: 'author', type: 'text', placeholder: 'Author', value: ''},
            {name: 'description', type: 'multiline', placeholder: 'Description', value: ''},
            {name: 'price', type: 'number', placeholder: 'Price', value: ''},
            {name: 'stock', type: 'number', placeholder: 'Stock', value: ''},
        ]
    }


    async componentDidMount() {
        try{
            if(!this.state.newBook){
                const book = (await getBook(this.props.match.params.id)).data;
                const {cart} = (await getCart()).data;
                const item = cart!==undefined ? cart.find(i=>i.bookId===book._id): {};
                book['quantity'] = item!==undefined? item['quantity']: 0;
                this.setState({book})
                if(this.props.edit){
                    const inputs = [...this.state.inputs];
                    for(let item of Object.keys(book)){
                        const input = inputs.find(i=>i['name']===item);
                        if(input){
                            const indexOfInput = inputs.indexOf(input);
                            if(item==='author'){
                                let authors = '';
                                for(let i of book[item]){
                                    authors+=`${i}, `;
                                }
                                book[item] = authors;
                            }
                            input['value'] = book[item];
                            inputs[indexOfInput] = input;
                        }
                    }
                    this.setState({inputs});
                }
            }
        }catch (ex){
            console.log(ex);
            this.props.history.replace('/404');
        }
    }


    render() {
        return (
            <Container>
                <Book setCartCount={this.props.setCartCount} {...this.props} {...this.state}/>
                {!this.state.newBook&&!this.props.edit && <Review {...this.props}/>}
            </Container>
        );
    }
}

export default BookPage;