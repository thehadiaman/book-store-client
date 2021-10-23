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
            { id: 1, title: 'A Brief History of Time', author: 'Stephen Hawking', price: 200, rating: 4.8, sales: 500  },
            { id: 2, title: 'Atomic Habit', author: 'James Clear', price: 150, rating: 4.2, sales: 444}
        ]
    }

    render() {
        const {headCells, data} = this.state;
        return (
            <Container>
                <h1>Seller Page</h1>
                <TableComponent headCells={headCells} data={data} />
            </Container>
        );
    }
}

export default SellerPage;
