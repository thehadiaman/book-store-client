import * as React from 'react';
import Box from '@mui/material/Box';
import Drawers from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export default function Drawer() {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>
                    <Button style={{width: "100%", fontSize: '30px'}} component={Link} to={'/'} color="inherit">BookStack</Button>
                </ListItem>
                <ListItem>
                <Button  style={{width: "100%"}} component={Link} to={'/login'} startIcon={<LoginOutlinedIcon/>} color="inherit">Login</Button>
            </ListItem>
                <ListItem>
                    <Button  style={{width: "100%"}} component={Link} to={'/signup'} startIcon={<LoginOutlinedIcon/>} color="inherit">Signup</Button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <MenuIcon onClick={toggleDrawer('left', true)}/>
                <Drawers
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawers>
            </React.Fragment>
        </div>
    );
}
