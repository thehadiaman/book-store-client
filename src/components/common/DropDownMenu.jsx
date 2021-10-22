import React, {Component} from 'react';
import {Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip} from '@mui/material';
import {Link} from "react-router-dom";


class DropDownMenu extends Component {

    state={
        anchorEl: null,
        open: false
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget, open: !this.state.open});
    };
    handleClose = () => {
        this.setState({anchorEl: null, open: false});
    };

    render() {
        return (
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title={this.props.user.name}>
                        <IconButton onClick={this.handleClick} size={"medium"}>
                            <Avatar sx={{ width: 32, height: 32 }}>{this.props.user.name && this.props.user.name[0]}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleClose}
                    onClick={this.handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {this.props.menu.main.map(m=><Link key={m.name} to={'/'} style={{textDecoration: 'none', color: 'black'}}>
                        <MenuItem>
                        <Avatar /> <span>{m.name}</span>
                    </MenuItem>
                        </Link>
                        )}

                    {this.props.menu.sub && <Divider/>}

                    {this.props.menu.sub && this.props.menu.sub.map(m=><Link  key={m.name} to={'/'} style={{textDecoration: 'none', color: 'black'}}>
                        <MenuItem>
                            <ListItemIcon>
                                {m.icon}
                            </ListItemIcon>
                            <span>{m.name}</span>
                        </MenuItem>
                    </Link>)}
                </Menu>
            </React.Fragment>
        );
    }
}

export default DropDownMenu;

