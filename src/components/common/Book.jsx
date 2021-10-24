import React from "react";
import {Button, Grid} from "@mui/material";
import CommonBook from "./commonBook";
import Joi from 'joi-browser';
import {saveBook} from "../../services/bookService";

class Book extends CommonBook {

    state={
        quantity: 0,
        newBook: this.props.newBook,
        editBook: false,
        inputs: [
            {name: 'title', type: 'text', placeholder: 'Title', value: ''},
            {name: 'image', type: 'text', placeholder: 'Image URL', value: ''},
            {name: 'author', type: 'text', placeholder: 'Author', value: ''},
            {name: 'description', type: 'multiline', placeholder: 'Description', value: ''},
            {name: 'price', type: 'number', placeholder: 'Price', value: ''},
            {name: 'discount', type: 'number', placeholder: 'Discount', value: ''},
            {name: 'stock', type: 'number', placeholder: 'Stock', value: ''},
        ],
        errors: {}
    }


    doSubmit=async()=>{
        try{
            if(this.state.newBook) await saveBook(this.getData());
            else await saveBook(this.getData());
        }catch (ex) {
            console.log(ex.response.data);
        }
    }

    getData=()=>{
        const properties = ['title', 'image', 'author', 'description', 'price', 'discount', 'stock'];
        const data = {};
        for(let a=0;a<properties.length;a++){
            if(properties[a]==='author')
                data[properties[a]] = this.state.inputs.find(input=>input.name===properties[a]).value.split(',')
            else
                data[properties[a]] = this.state.inputs.find(input=>input.name===properties[a]).value;
        }
        return data;
    }

    schema={
        title: Joi.string().min(3).max(100).required(),
        image: Joi.string().min(10).max(200).required(),
        author: Joi.array().min(1).max(100).required(),
        description: Joi.string().min(20).max(700).required(),
        price: Joi.number().min(1).max(25000).required(),
        stock: Joi.number().min(1).max(25000).required(),
        discount: Joi.number().min(0).max(99).required()
    }

    getImage = ()=>{
        const image = this.state.inputs.find(input=>input.name==='image').value;
        if(image==="") return "https://www.biotrop.org/images/default-book.png";
        return image;
    }

    getTitle = ()=>{
        const title = this.state.newBook? this.state.inputs.find(input=>input.name==='title').value: this.props.book.title;
        if(title==="" || title===undefined) {
            document.title = "New Book";
            return "New Book";
        }
        document.title = title.toUpperCase();
        return title.toUpperCase();
    }

    render() {
        const {quantity, editBook, newBook, inputs} = this.state;
        const book = this.props.book;

        const saveButton = <Button variant={'contained'} type={'submit'} color={'primary'}>Save</Button>;

        return (
            <Grid container spacing={{ xs: 2, md: 12, lg: 6}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    {this.renderImage(newBook? this.getImage(): book.image)}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                    {!newBook ? this.renderBookDetails(quantity, book, editBook): this.renderBookAdd(inputs, saveButton)}
                </Grid>
            </Grid>
        );
    }
}

export default Book;