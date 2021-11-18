import {Component} from "react";

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('jwtToken');
        this.props.logout();
        this.props.history.replace('/');
    }
    render(){
        return null;
    }
}

export default Logout;