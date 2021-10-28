import React from "react";
import {Link} from "react-router-dom";
import {Grid} from "@mui/material";

function Footer () {
    const style = {
        backgroundColor: '#1976d2',
        marginTop: '115px',
        textAlign: 'center',
        bottom: '0px',
        padding: '60px 0 60px 0'
    }
    return (
        <footer style={style} >
            <Grid container columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <h4><Link className={'link-title white-text'} to={'/'}>Book Stack</Link></h4>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <h6><Link className={'link-title white-text'} to={'/'}>Home</Link></h6>
                    <h6><Link className={'link-title white-text'} to={'/cart'}>Cart</Link></h6>
                    <h6><Link className={'link-title white-text'} to={'/orders'}>Orders</Link></h6>
                </Grid>
            </Grid>
        </footer>
    );
}

export default Footer;