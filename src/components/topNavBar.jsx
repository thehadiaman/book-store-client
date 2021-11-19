import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Box, Button, IconButton, Grid, Badge} from '@mui/material';
import {ShoppingCart, OpenInBrowserOutlined as Signup, Sell as SellIcon} from '@mui/icons-material';
import {Logout} from '@mui/icons-material';
import ModalForm from './modalLogin';
import Drawer from './common/drawer';
import {Link} from 'react-router-dom';
import DropDownMenu from './common/DropDownMenu';


class TopNavBar extends Component {

    state={
        searchInput: '',
        menu: {
            main: this.props.user.type==='seller'?[{name: 'My Orders', link: '/myOrders'}, {name: 'orders', link: '/morders'}]: [{name: 'My Orders', link: '/myOrders'}],
            sub: [{name: 'logout', link: '/logout', icon: <Logout fontSize="small" />}]
        },
        menu_delivery_partner: {
            main: [],
            sub: [{name: 'logout', link: '/logout', icon: <Logout fontSize="small" />}]
        }
    };

    getCartCount=()=>{
        return this.props.cartCount;
    }

    render() {

        const {login} = this.props;

        const LoginFalseNavBarMenu = <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ModalForm/>
            <Button startIcon={<Signup/>} component={Link} to={'/signup'} color='inherit'>Signup</Button>
        </Box>;

        const LoginTrueNavBarMenu = <Box>
            <Grid container columns={{xs: 12}}>
                {(this.props.user.type==='seller' && this.props.user.validate.valid) && <Grid item xs={4}>
                    <Link to={'/sellercenter'}>
                        <IconButton title={"Seller Center"} size='large'>
                            <Badge badgeContent={0} color='error'>
                                <SellIcon fontSize={'medium'} style={{color: 'white'}} />
                            </Badge>
                        </IconButton>
                    </Link>

                </Grid>}
                <Grid item xs={(this.props.user.type==='seller' && this.props.user.validate.valid) ? 4: 6}>
                    <Link to={'/cart'}>
                        <IconButton title={"Cart"} size='large'>
                            <Badge badgeContent={this.getCartCount()} color='error'>
                                <ShoppingCart fontSize={'medium'} style={{color: 'white'}} />
                            </Badge>
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item xs={(this.props.user.type==='seller' && this.props.user.validate.valid)? 4: 6}>
                    <DropDownMenu user={this.props.user} menu={this.state.menu}/>
                </Grid>
            </Grid>
        </Box>;

        const LoginTrueNavBarMenuDeliveryPartner = <Box>
            <Grid container columns={{xs: 12}}>
                <Grid item xs={12}>
                    <DropDownMenu user={this.props.user} menu={this.state.menu_delivery_partner}/>
                </Grid>
            </Grid>
        </Box>;


        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position={'fixed'}>
                    <Toolbar>
                        <Typography className={'nav-head'} variant={'h6'} component={'div'}>
                            <Box sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}><Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>BookStack</Link></Box>
                            <Box sx={{ display: { xs: 'block', lg: 'none', xl: 'block' } }}><Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>BS</Link></Box>
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />

                        {login? (this.props.user.type!=='delivery_partner' && LoginTrueNavBarMenu): LoginFalseNavBarMenu}

                        {this.props.user.type==='delivery_partner' && LoginTrueNavBarMenuDeliveryPartner}

                        {!login && <Box sx={{display: {xs: 'block', lg: 'none', md: 'none', xl: 'block'}}}>
                            <IconButton
                                size='large'
                                edge='start'
                                color='inherit'
                                aria-label='menu'
                            >
                                <Drawer/>
                            </IconButton>
                        </Box>}
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default TopNavBar;