import React, {Component} from 'react';
import HomePage from "./components/homePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/loginPage";
import './App.css';
import {Box} from "@mui/material";
import TopNavBar from "./components/topNavBar";

class App extends Component{
    render() {
        return (
            <BrowserRouter>
                <Box sx={{ flexGrow: 1 }}>
                    <TopNavBar {...this} />
                    <Switch>
                        <Route path={'/login'} render={()=><LoginPage/>}/>
                        <Route path={'/'} render={()=><HomePage/>}/>
                    </Switch>
                </Box>
            </BrowserRouter>
        );
    }
}

export default App;