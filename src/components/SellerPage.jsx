import React, {Component} from "react";
import {Container} from "@mui/material";
import TableComponent from "./common/table";
import {getSellerBooks} from "../services/bookService";
import {authUser} from "../services/authService";
import {Link} from "react-router-dom";

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
                id: 'stock',
                numeric: true,
                disablePadding: false,
                label: 'Stock',
            },
            {
                id: 'sales',
                numeric: true,
                disablePadding: false,
                label: 'Sales',
            },
        ],
        data: [],
        newObjectLink: '/sellercenter/new'
    }

    async componentDidMount() {
        const user = (await authUser()).data;
        const data = user && (await getSellerBooks(user._id)).data;
        this.setState({data})
    }

    render() {
        document.title = "Seller Center";

        return (
            <Container>
                <h1>Seller Page</h1>
                {this.state.data.length<=0 && <Link to={'/sellercenter/new'}>Add new Books</Link>}
                {this.state.data.length>0 && <TableComponent {...this.state} />}
            </Container>
        );
    }
}

export default SellerPage;
