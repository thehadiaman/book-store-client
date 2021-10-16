import React, {Component} from 'react';
import HomePage from "./components/homePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/loginPage";
import './App.css';
import {Box} from "@mui/material";
import TopNavBar from "./components/topNavBar";
import SignupPage from "./components/signupPage";

class App extends Component{
    render() {
        return (
            <BrowserRouter>
                <Box sx={{ flexGrow: 1 }}>
                    <TopNavBar {...this.props} />
                    <Switch>
                        <Route exact path={'/login'} render={()=><LoginPage/>}/>
                        <Route exact path={'/signup'} render={()=><SignupPage/>}/>
                        <Route path={'/'} render={()=><HomePage/>}/>
                    </Switch>
                </Box>
            </BrowserRouter>
        );
    }
}

export default App;