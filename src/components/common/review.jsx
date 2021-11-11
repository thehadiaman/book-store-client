import React from "react";
import {Button, Card, CardContent, Divider, Grid, Rating, Typography} from "@mui/material";
import {getBookReviews, getMyRatings, myReviewStatus, rateBook, reviewBook} from "../../services/bookService";
import Joi from "joi-browser";
import Form from "./form";

class Review extends Form {

    state={
        myReview: false,
        reviews: [],
        inputs:[
            {name: 'heading', type: 'text', placeholder: 'Heading', value: ''},
            {name: 'review', type: 'multiline', placeholder: 'Review', value: ''}
        ],
        errors: {},
        rating: 0
    }

    doSubmit = async()=>{
        try{
            (await reviewBook(this.getData()));
            await this.setData();
            const inputs = [
                {name: 'heading', type: 'text', placeholder: 'Heading', value: ''},
                {name: 'review', type: 'multiline', placeholder: 'Review', value: ''}
            ];
            this.setState({inputs});
        }catch (ex){
            const errors = {};
            errors.email = ex
            this.setState({errors});
        }
    }

    schema = {
        bookId: Joi.string().min(1).max(50).required(),
        heading: Joi.string().min(1).max(500).required().label('Heading'),
        review: Joi.string().min(1).max(1000).required().label('Review')
    }

    getData = ()=>{
        return {
            bookId: this.props.match.params.id,
            heading: this.state.inputs.filter(input=>input.name==='heading')[0].value,
            review: this.state.inputs.filter(input=>input.name==='review')[0].value
        }
    }

    async componentDidMount() {
        await this.setData();
    }

    setData = async()=>{
        try{
            const bookId = this.props.match.params.id;
            const myReview = (await myReviewStatus(bookId)).data;
            this.setState({myReview});
            const reviews = (await getBookReviews(bookId)).data;
            this.setState({reviews});
            const rating = (await getMyRatings(bookId)).data;
            this.setState({rating});
        }catch (ex) {
            console.log(ex);
        }
    }

    handleRatingChange=async(event, value)=>{
        try{
            await rateBook(this.props.match.params.id, value)
            await this.setData()
        }catch (ex) {
            console.log(ex);
        }
    }

    render() {
        const {myReview, reviews} = this.state;

        const title = !myReview? "My Review": "You need to buy the book to add your review.";

        const submitBtn = <Button disabled={this.state.myReview} variant={'contained'} type={'Submit'} color={'primary'} style={{float: 'right'}}>Submit</Button>;

        return (
            <div style={{marginTop: '50px'}}>
                <Divider/>
                <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                    {this.props.user.name && <Grid item xs={12} md={12} lg={6}>
                        <h3>My review</h3>
                        <Rating onChange={this.handleRatingChange} size={"large"} value={this.state.rating} precision={0.5} disabled={this.state.myReview} title={title}/>
                        <form onSubmit={this.handleSubmit}>
                            {this.renderInputs(this.state.inputs, submitBtn, this.state.myReview)}
                        </form>
                    </Grid>}
                    <Grid item xs={12} lg={6} md={12}>
                        <h3>Reviews</h3>
                        {reviews.length===0&&<h5>No reviews yet</h5>}
                        {
                            reviews.map(review=><Card style={{marginTop: '10px'}} key={`${review._id}${Math.random()}`}>
                                <CardContent>
                                    <span style={{color: 'black'}}>{review.user}</span>
                                    <Rating size={"small"} value={review.rating} precision={0.5} title={title} readOnly/>
                                    <Divider/>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {review.heading}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.review}
                                    </Typography>
                                </CardContent>
                            </Card>)
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Review;