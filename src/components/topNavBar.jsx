import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Box, Button, IconButton, InputBase, Grid, Badge} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {Search as SearchIcon, ShoppingCart, OpenInBrowserOutlined as Signup, Sell as SellIcon} from '@mui/icons-material';
import {Settings, Logout} from '@mui/icons-material';
import ModalForm from './modalLogin';
import Drawer from './common/drawer';
import {Link} from 'react-router-dom';
import DropDownMenu from './common/DropDownMenu';


class TopNavBar extends Component {

    state={
        searchInput: '',
        menu: {
            main: [{name: 'Profile'}, {name: 'My Orders'}],
            sub: [{name: 'settings', icon: <Settings fontSize="small" />}, {name: 'logout', icon: <Logout fontSize="small" />}]
        }
    };

    getCartCount=()=>{
        return this.props.cartCount;
    }

    handleSearch = (input)=>{
        console.log(input.target.value);
    }

    render() {

        const {login} = this.props;

        const StyledInputBase = styled(InputBase)(({ theme }) => ({
            color: 'inherit',
            '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width')
            }
        }));

        const Search = styled('div')(({ theme }) => ({
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 10,
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(2),
                width: '100%',
            },
        }));

        const SearchIconWrapper = styled('div')(({ theme }) => ({
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }));

        const LoginFalseNavBarMenu = <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ModalForm handleLinkChange={this.props.handleLinkChange}/>
            <Button onClick={()=>this.props.handleLinkChange('/signup')} startIcon={<Signup/>} component={Link} to={'/signup'} color='inherit'>Signup</Button>
        </Box>;

        const LoginTrueNavBarMenu = <Box>
            <Grid container columns={{xs: 12}}>
                {(this.props.user.type==='seller' && this.props.user.validate.valid) && <Grid item xs={4}>
                    <Link to={'/sellercenter'}>
                        <IconButton size='large'>
                            <Badge badgeContent={0} color='error'>
                                <SellIcon fontSize={'medium'} style={{color: 'white'}} />
                            </Badge>
                        </IconButton>
                    </Link>

                </Grid>}
                <Grid item xs={(this.props.user.type==='seller' && this.props.user.validate.valid) ? 4: 6}>
                    <Link to={'/cart'}>
                        <IconButton size='large'>
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


        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position={'fixed'}>
                    <Toolbar>
                        <Typography onClick={()=>this.props.handleLinkChange('/')} className={'nav-head'} variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}><Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>BookStack</Link></Box>
                            <Box sx={{ display: { xs: 'block', lg: 'none', xl: 'block' } }}><Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>BS</Link></Box>
                        </Typography>

                        {!['/login', '/signup', '/verification', '/forgetpassword', '/sellercenter',
                            '/sellercenter/new', '/cart'].includes(this.props.currentLink) && <Search component={'div'} sx={{flexGrow: 1}}>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={this.handleSearch}
                                placeholder='Search…'
                                inputProps={{'aria-label': 'search'}}
                            />
                        </Search>}

                        {login? LoginTrueNavBarMenu: LoginFalseNavBarMenu}

                        {!login && <Box sx={{display: {xs: 'block', lg: 'none', md: 'none', xl: 'block'}}}>
                            <IconButton
                                size='large'
                                edge='start'
                                color='inherit'
                                aria-label='menu'
                            >
                                <Drawer handleLinkChange={this.props.handleLinkChange}/>
                            </IconButton>
                        </Box>}
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default TopNavBar;