import React, {Component} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button,
    Chip,
    Container,
    Grid,
    Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import _ from "lodash";
import TabComponent from "./common/tabComponent";
import {changeStatus, getDeliveries} from "../services/orderService";
import Svgs from "./common/svgs";

class Delivery extends Component {

    state={
        value: 'ordered',
        deliveries: []
    }

    async componentDidMount() {
        await this.setDeliveries();
    }

    setDeliveries=async()=>{
        try{
            const deliveries = (await getDeliveries()).data;
            this.setState({deliveries});
        }catch (ex) {
            console.log(ex);
        }
    }

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

    setTabValue=(event, value)=>{
        this.setState({value});
    }

    getStatusButtonName=(status)=>{
        return (status==='packed'&&'Ship')||(status==='shipped'&&'Deliver');
    }

    setStatus=async(orderId)=>{
        try{
            const status = (await changeStatus(orderId)).data;
            console.log(status);
            await this.setDeliveries();
        }catch (ex) {
            console.log(ex);
        }
    }

    render() {
        const head=['Packed', 'Title', 'Quantity', 'Seller', 'Seller Address', 'Seller ContactNumber'];
        let {value, deliveries} = this.state;
        deliveries = deliveries.reverse() || [];
        document.title = "Delivery Page";
        const {user, history} = this.props;
        if(!user.name){
            history.replace('/');
        }else if(user.name && !user.validate.valid){
            history.replace('/verification');
        }

        return (
            <Container style={{marginBottom: '150px'}}>
                <TabComponent value={this.state.value} handleChange={this.setTabValue} {...this.props}/>
                {deliveries.filter(delivery=>delivery.orders.status===value).map(delivery=>{
                    return <Accordion style={{marginTop: '20px'}} key={`${delivery.orders.OrderId}`}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{padding: "20px"}}
                        >
                            <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                                <Grid item xs={6} sm={6} md={4} lg={2}>
                                    {delivery.user && delivery.user.name}
                                </Grid>
                                <Grid item xs={6} sm={6} md={4} lg={3}>
                                    {delivery.orders.address}, {delivery.orders.zip}
                                </Grid>
                                <Grid item xs={6} sm={6} md={4} lg={3}>
                                    {delivery.orders.contactNumber}
                                </Grid>
                                <Grid item xs={6} sm={6} md={4} lg={2}>
                                    <Chip label={this.capitalize(delivery.orders.status)} style={{fontSize: 15}} color={delivery.orders.status? this.getStatusColor(delivery.orders.status): 'default'} />
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="orders">
                                            <TableHead>
                                                <TableRow style={{fontSize: 30, fontWeight: 'bolder'}}>
                                                    {head.map(h=><TableCell key={h}>{h}</TableCell>)}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {_.range(delivery.books? delivery.books.length: 0).map((a) => {
                                                    const seller = delivery.sellers.find(s => s._id === delivery.books[a].seller._id);
                                                    const {packed} = delivery.orders.items[a];
                                                    return <TableRow
                                                        key={delivery.books[a]._id}
                                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                    >
                                                        <TableCell align={'center'} className={'no-space'}>{(new Svgs()).renderPacked(packed)}</TableCell>
                                                        <TableCell className={'no-space-left'} component="th" scope="row">
                                                            {delivery.books[a].title.toUpperCase()}
                                                        </TableCell>
                                                        <TableCell>{delivery.orders.items[a].quantity}</TableCell>

                                                        <TableCell>{seller.name}</TableCell>
                                                        <TableCell>{seller.address}</TableCell>
                                                        <TableCell>{seller.phone}</TableCell>
                                                    </TableRow>
                                                })}
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0, fontSize: 20 } }}
                                                >
                                                    <TableCell><b>Total</b></TableCell>
                                                    <TableCell/>
                                                    <TableCell/>
                                                    <TableCell/>
                                                    <TableCell/>
                                                    <TableCell><b>₹{this.getTotalPrice(delivery.orders.cost)}</b></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            {(delivery.orders && (delivery.orders.status==='packed'||delivery.orders.status==='shipped')) &&
                            <Button style={{margin: "10px 0 10px 10px", float: "right"}} variant={"contained"} onClick={()=>this.setStatus(delivery.orders.OrderId)}
                                    color={this.getStatusColor(delivery.orders.status)}>{this.getStatusButtonName(delivery.orders.status)}</Button>}
                        </AccordionDetails>
                    </Accordion>
                })}
            </Container>
        );
    }
}

export default Delivery;