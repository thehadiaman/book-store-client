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
import MyOrders from "./components/myOrders";
import Delivery from "./components/delivery";
import Orders from "./components/orders";
import Logout from "./components/logout";

class App extends Component {

    state = {
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

    handleLogin = () => {
        this.setState({login: true})
    }

    setCartCount = (count) => {
        const cartCount = this.state.cartCount + (count==='clear'?-this.state.cartCount: count);
        this.setState({cartCount});
    }

    logout=()=>{
        this.setState({user: {}, login: false});
    }

    render() {
        const {user} = this.state;
        if (user.type === 'delivery_partner') {
            return (
                <BrowserRouter>
                    <Box sx={{flexGrow: 1}}>
                        <TopNavBar {...this.state}/>
                        <div style={{marginBottom: '80px'}}/>
                        <Switch>
                            <Route exact path={'/verification'} render={(props) => <VerificationPage user={user} {...props}/>}/>
                            <Route exact path={'/logout'} render={(props)=> <Logout logout={this.logout} {...props}/>} />
                            <Route exact path={'/'} render={(props) => <Delivery user={this.state.user} {...props} />}/>
                            <Route render={()=><h1>404</h1>}/>
                        </Switch>
                    </Box>
                    <Footer/>
                </BrowserRouter>
            )
        }

        return (
            <BrowserRouter>
                <Box sx={{flexGrow: 1}}>
                    <TopNavBar {...this.state}/>
                    <div style={{marginBottom: '80px'}}/>
                    <Switch>
                        <Route exact path={'/login'} render={(props) => <LoginPage
                            user={user}
                            {...props}/>}/>
                        <Route exact path={'/signup'} render={(props) => <SignupPage user={user} {...props}/>}/>
                        <Route exact path={'/forgetpassword'}
                               render={(props) => <ForgetPasswordPage user={user} handleLogin={this.handleLogin}
                                                                      {...props}/>}/>
                        <Route exact path={'/verification'} render={(props) => <VerificationPage user={user} {...props}/>}/>
                        <Route exact path={'/sellercenter/new'}
                               render={(props) => <BookPage user={user} newBook={true} {...props}/>}/>
                        <Route exact path={'/book/edit/:id'}
                               render={(props) => <BookPage edit={true} user={user} login={this.state.login} setCartCount={this.setCartCount} {...props}/>}/>
                        <Route exact path={'/book/:id'}
                               render={(props) => <BookPage user={user} login={this.state.login} setCartCount={this.setCartCount} {...props}/>}/>
                        <Route exact path={'/sellercenter'} render={(props) => <SellerPage user={user} {...props}/>}/>
                        <Route exact path={'/cart'}
                               render={(props) => <Cart user={user} setCartCount={this.setCartCount} {...props}/>}/>
                        <Route exact path={'/placeorder'}
                               render={(props) => <PlaceOrder setCartCount={this.setCartCount} user={user} {...props}/>}/>
                        <Route exact path={'/myOrders'} render={(props) => <MyOrders user={user} setCartCount={this.setCartCount} {...props} />}/>
                        <Route exact path={'/orders'} render={(props) => <Orders user={user} setCartCount={this.setCartCount} {...props} />}/>
                        <Route exact path={'/logout'} render={(props)=> <Logout logout={this.logout} {...props}/>} />
                        <Route exact path={'/'} render={(props) => <HomePage user={user} login={this.state.login} {...props} />}/>
                        <Route render={()=><h1>404</h1>}/>
                    </Switch>
                    <Footer {...this.state}/>
                </Box>
            </BrowserRouter>
        );
    }
}
export default App;