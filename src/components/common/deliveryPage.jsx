import React, {Component} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Container,
    Grid,
    Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import _ from "lodash";
import {Link} from "react-router-dom";

class DeliveryPage extends Component {


    capitalize=(string)=>{
        let lowerCase = string.toLowerCase();
        const first = lowerCase.charAt(0).toUpperCase();
        const remain = lowerCase.slice(1);

        return first+remain
    }

    getTotalPrice = (price)=>{
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getStatusColor=(status)=>{
        return ((status==='ordered'&&'default') || (status==='packed'&&'primary') || (status==='shipped'&&'secondary') || (status==='delivered'&&'success') || (status==='cancelled'&&'error'))
    }

    render() {
        const head=['Title', 'Price', 'Quantity', 'Total'];
        const orders = this.props.orders || [];

        return (
            <Container style={{marginBottom: '150px'}}>
                {orders.map(order=>{
                    console.log(order);
                    return <Accordion style={{marginTop: '20px'}} key={`${order._id}${Date.now()}`}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{padding: "20px"}}
                        >
                            <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                                <Grid item xs={6} sm={6} md={4} lg={2}>
                                    {order.user && order.user[0].name}
                                </Grid>
                                <Grid item xs={6} sm={6} md={4} lg={3}>
                                    {order.address}
                                </Grid>
                                <Grid item xs={6} sm={6} md={4} lg={2}>
                                    {order.zip}
                                </Grid>
                                <Grid item xs={6} sm={6} md={4} lg={2}>
                                    <Chip label={this.capitalize(order.status)} style={{fontSize: 15}} color={order.status? this.getStatusColor(order.status): 'default'} />
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="orders">
                                            <TableHead>
                                                <TableRow style={{fontSize: 20}}>
                                                    {head.map(h=><TableCell>{h}</TableCell>)}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {_.range(order.books? order.books.length: 0).map((a) => (
                                                    <TableRow
                                                        key={order.books[a]._id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <Link to={`book/${order.books[a]._id}`} className={'link-title'}>{order.books[a].title.toUpperCase()}</Link>
                                                        </TableCell>
                                                        <TableCell>₹ {this.getTotalPrice(order.books[a].price)}</TableCell>
                                                        <TableCell>{order.order[a].quantity}</TableCell>
                                                        <TableCell>₹ {this.getTotalPrice(order.order[a].quantity*order.books[a].price)}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0, fontSize: 20 } }}
                                                >
                                                    <TableCell><b>Total</b></TableCell>
                                                    <TableCell/>
                                                    <TableCell/>
                                                    <TableCell><b>₹ {this.getTotalPrice(order.cost)}</b></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                })}
            </Container>
        );
    }
}

export default DeliveryPage;