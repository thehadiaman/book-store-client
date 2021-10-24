import React, {Component} from "react";
import {Container} from "@mui/material";
import TableComponent from "./common/table";

class SellerPage extends Component {

    state={
        headCells: [
            {
                id: 'title',
                numeric: false,
                disablePadding: true,
                label: 'Title',
            },
            {
                id: 'author',
                numeric: false,
                disablePadding: false,
                label: 'Author',
            },
            {
                id: 'price',
                numeric: true,
                disablePadding: false,
                label: 'Price',
            },
            {
                id: 'rating',
                numeric: true,
                disablePadding: false,
                label: 'Ratings',
            },
            {
                id: 'sales',
                numeric: true,
                disablePadding: false,
                label: 'Sales',
            },
        ],
        data: [
            { id: 1, title: 'A Brief History of Time', authors: ['Stephen Hawking'], price: 200, rating: 4.8, sales: 500  },
            { id: 2, title: 'Atomic Habit', authors: ['James Clear'], price: 150, rating: 4.2, sales: 444},
            {id: 3, authors: ['George Paul Sutton', 'Oscar Biblarz'],title: 'Rocket Propulsion Elements', price: 10000, rating: 3.7, sales: 10}
        ],
        newObjectLink: '/sellercenter/new'
    }

    render() {
        return (
            <Container>
                <h1>Seller Page</h1>
                <TableComponent {...this.state} />
            </Container>
        );
    }
}

export default SellerPage;
