import React, {Component} from 'react';
import HomePage from "./components/homePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/loginPage";
import './App.css';
import {Box} from "@mui/material";
import TopNavBar from "./components/topNavBar";
import SignupPage from "./components/signupPage";
import VerificationPage from "./components/verificationPage";
import {authUser} from "./services/authService";
import ForgetPasswordPage from "./components/forgetPasswordPage";

class App extends Component{

    state={
        currentLink: window.location.pathname,
        login: false,
        user: {}
    }


    async componentDidMount() {
        try{
            const jwt = localStorage.getItem('jwtToken');
            const user = (await authUser()).data;
            if(jwt !== null) return this.setState({login: true, user});
        }catch {}
    }


    handleLinkChange = (link)=>{
        this.setState({currentLink: link});
    }

    handleLogin = ()=>{
        this.setState({login: true})
    }


    render() {
        return (
            <BrowserRouter>
                <Box sx={{ flexGrow: 1 }}>
                    <TopNavBar handleLinkChange={this.handleLinkChange} {...this.state}/>
                    <Switch>
                        <Route exact path={'/login'} render={(props)=><LoginPage  handleLinkChange={this.handleLinkChange} {...props}/>}/>
                        <Route exact path={'/signup'} render={(props)=><SignupPage handleLogin={this.handleLogin} handleLinkChange={this.handleLinkChange} {...props}/>}/>
                        <Route exact path={'/forgetpassword'} render={(props)=><ForgetPasswordPage handleLinkChange={this.handleLinkChange} {...props}/>}/>
                        <Route exact path={'/verification'} render={(props)=><VerificationPage handleLinkChange={this.handleLinkChange} {...props}/>}/>
                        <Route path={'/'} render={(props)=><HomePage {...props} />}/>
                    </Switch>
                </Box>
            </BrowserRouter>
        );
    }
}

export default App;