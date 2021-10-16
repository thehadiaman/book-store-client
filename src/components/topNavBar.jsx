import React, {Component} from "react";
import {AppBar, Toolbar, Typography, Box, Button, IconButton, InputBase} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import {Search as SearchIcon, AccountCircle as AccountCircleIcon, Settings, OpenInBrowserOutlined as Signup} from '@mui/icons-material';
import ModalForm from "./modalLogin";
import Drawer from "./common/drawer";
import {Link} from "react-router-dom";


class TopNavBar extends Component {

    state={
        searchInput: '',
        login: false
    };

    handleSearch = (input)=>{
        console.log(input.target.value);
    }

    render() {

        const {login} = this.state;

        const StyledInputBase = styled(InputBase)(({ theme }) => ({
            color: 'inherit',
            '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                [theme.breakpoints.up('md')]: {
                    width: '100ch',
                },
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
            <Button onClick={()=>this.props.handleLinkChange('/signup')} startIcon={<Signup/>} component={Link} to={'/signup'} color="inherit">Signup</Button>
        </Box>;

        const LoginTrueNavBarMenu = <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton aria-label="delete" size="large">
                <Settings style={{color: 'white'}} />
            </IconButton>
            <IconButton aria-label="delete" size="large">
                <AccountCircleIcon style={{color: 'white'}} />
            </IconButton>
        </Box>;

        return (
            <Box sx={{ flexGrow: 1 }} style={{marginBottom: '10px'}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography onClick={()=>this.props.handleLinkChange('/')} className={'nav-head'} variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
                            <Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>BookStack</Link>
                        </Typography>

                        {!['/login', '/signup'].includes(this.props.currentLink) && <Search component={"div"} sx={{flexGrow: 1}}>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={this.handleSearch}
                                placeholder="Search…"
                                inputProps={{"aria-label": "search"}}
                            />
                        </Search>}

                        {login? LoginTrueNavBarMenu: LoginFalseNavBarMenu}

                        <Box sx={{ display: { xs: 'block', lg: 'none', md: 'none', xl: 'block' } }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <Drawer/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default TopNavBar;