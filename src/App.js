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
import SellerPage from "./components/SellerPage";
import BookPage from "./components/bookPage";
import {getCartCount} from "./services/cartService";
import Cart from "./components/cart";
import Footer from "./components/footer";
import PlaceOrder from "./components/placeOrder";
import DeliveryPage from "./components/common/deliveryPage";
import MyOrders from "./components/myOrders";

class App extends Component {

    state = {
        currentLink: window.location.pathname,
        login: false,
        user: {},
        cartCount: 0
    }


    async componentDidMount() {
        await this.setUser();
        const cartCount = (await getCartCount()).data['count'] || 0;
        this.setState({cartCount})
    }

    setUser = async () => {
        try {
            const jwt = localStorage.getItem('jwtToken');
            const user = (await authUser()).data;
            if (jwt !== null) return this.setState({login: true, user});
        } catch {
            localStorage.removeItem('jwtToken');
        }
    }


    handleLinkChange = (link) => {
        this.setState({currentLink: link});
    }

    handleLogin = () => {
        this.setState({login: true})
    }

    setCartCount = (count) => {
        const cartCount = this.state.cartCount + (count==='clear'?-this.state.cartCount: count);
        this.setState({cartCount});
    }


    render() {
        const {user} = this.state;

        if (user.type === 'delivery_partner') {
            return (
                <BrowserRouter>
                    <Box sx={{flexGrow: 1}}>
                        <TopNavBar handleLinkChange={this.handleLinkChange} {...this.state}/>
                        <div style={{marginBottom: '80px'}}/>
                        <Switch>
                            <Route exact path={'/verification'} render={(props) => <VerificationPage {...props}/>}/>
                            <Route path={'/'} render={(props) => <DeliveryPage {...props} />}/>
                        </Switch>
                    </Box>
                    <Footer style={{marginTop: "150px"}}/>
                </BrowserRouter>
            )
        }

        return (
            <BrowserRouter>
                <Box sx={{flexGrow: 1}}>
                    <TopNavBar handleLinkChange={this.handleLinkChange} {...this.state}/>
                    <div style={{marginBottom: '80px'}}/>
                    <Switch>
                        <Route exact path={'/login'} render={(props) => <LoginPage
                            handleLinkChange={this.handleLinkChange} {...props}/>}/>
                        <Route exact path={'/signup'} render={(props) => <SignupPage {...props}/>}/>
                        <Route exact path={'/forgetpassword'}
                               render={(props) => <ForgetPasswordPage handleLogin={this.handleLogin}
                                                                      handleLinkChange={this.handleLinkChange} {...props}/>}/>
                        <Route exact path={'/verification'} render={(props) => <VerificationPage {...props}/>}/>
                        <Route exact path={'/sellercenter/new'}
                               render={(props) => <BookPage newBook={true} {...props}/>}/>
                        <Route exact path={'/book/:id'}
                               render={(props) => <BookPage setCartCount={this.setCartCount} {...props}/>}/>
                        <Route exact path={'/sellercenter'} render={(props) => <SellerPage {...props}/>}/>
                        <Route exact path={'/cart'}
                               render={(props) => <Cart setCartCount={this.setCartCount} {...props}/>}/>
                        <Route exact path={'/placeorder'}
                               render={(props) => <PlaceOrder setCartCount={this.setCartCount} user={this.state.user} {...props}/>}/>
                        <Route path={'/myOrders'} render={(props) => <MyOrders {...props} />}/>
                        <Route path={'/'} render={(props) => <HomePage {...props} />}/>
                    </Switch>
                </Box>
                <Footer/>
            </BrowserRouter>
        );
    }
}
export default App;