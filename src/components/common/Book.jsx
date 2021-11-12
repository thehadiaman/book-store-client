import React from "react";
import {Button, Grid} from "@mui/material";
import CommonBook from "./commonBook";
import Joi from 'joi-browser';
import {saveBook, updateBook} from "../../services/bookService";

class Book extends CommonBook {

    state={
        newBook: this.props.newBook,
        editBook: this.props.edit,
        inputs: this.props.inputs,
        errors: {}
    }

    doSubmit=async()=>{
        try{
            if(this.state.newBook) {
                await saveBook(this.getData());
                this.props.history.push('/sellercenter');
            }
            else if(this.state.editBook){
                await updateBook(this.getData(), this.props.match.params.id);
                this.setState({editBook: false});
                this.props.history.replace(`/book/${this.props.match.params.id}`);

            }
        }catch (ex) {
            console.log(ex.response.data);
        }
    }

    getData=()=>{
        const properties = ['title', 'image', 'author', 'description', 'price', 'stock'];
        const data = {};
        for(let a=0;a<properties.length;a++){
            if(properties[a]==='author') {
                data[properties[a]] = this.state.inputs.find(input => input.name === properties[a]).value.split(",");
            }
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
        stock: Joi.number().min(1).max(25000).required()
    }

    getImage = ()=>{
        const image = this.state.inputs.find(input=>input.name==='image').value;
        if(image==="") return "https://www.biotrop.org/images/default-book.png";
        return image;
    }

    getTitle = ()=>{
        const title = (this.state.newBook||this.state.editBook)? this.state.inputs.find(input=>input.name==='title').value: this.props.book.title;
        if(title==="" || title===undefined) {
            document.title = "New Book";
            return "New Book";
        }
        document.title = title.toUpperCase();
        return title.toUpperCase();
    }

    render() {
        const {editBook, newBook, inputs} = this.state;
        const {book} = this.props;
        const saveButton = <Button variant={'contained'} type={'submit'} color={'primary'}>Save</Button>;

        return (
            <Grid container spacing={{ xs: 2, md: 12, lg: 6}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    {this.renderImage((newBook||editBook)? this.getImage(): book.image)}
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    {!newBook&&!editBook? this.renderBookDetails(book): this.renderBookAdd(inputs, saveButton, editBook, book)}
                </Grid>
            </Grid>
        );
    }
}

export default Book;