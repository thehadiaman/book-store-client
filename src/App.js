import React, {Component} from 'react';
import HomePage from "./components/homePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/loginPage";
import './App.css';
import {Box} from "@mui/material";
import TopNavBar from "./components/topNavBar";
import SignupPage from "./components/signupPage";

class App extends Component{

    state={
        currentLink: window.location.pathname
    }

    handleLinkChange = (link)=>{
        this.setState({currentLink: link});
    }

    render() {
        return (
            <BrowserRouter>
                <Box sx={{ flexGrow: 1 }}>
                    <TopNavBar handleLinkChange={this.handleLinkChange} currentLink={this.state.currentLink}/>
                    <Switch>
                        <Route exact path={'/login'} render={(props)=><LoginPage handleLinkChange={this.handleLinkChange} {...props}/>}/>
                        <Route exact path={'/signup'} render={(props)=><SignupPage handleLinkChange={this.handleLinkChange} {...props}/>}/>
                        <Route path={'/'} render={()=><HomePage/>}/>
                    </Switch>
                </Box>
            </BrowserRouter>
        );
    }
}

export default App;