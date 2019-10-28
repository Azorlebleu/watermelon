import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { first_name: this.props.connected.first_name, last_name: this.props.connected.last_name,balance: this.props.connected.balance };
        console.log(this.props.connected)
    }

    disconnect = () => {
        Object.assign(this.props.connected, {});
        this.setState({first_name: null, last_name:""})
        localStorage.setItem("connected", JSON.stringify({}));
        window.location.reload();

    }
    render() {
        if (this.state.first_name != null ) {
            return (
                <div id="connected">Welcome,
                <br />
                    {this.state.first_name} {this.state.last_name} !
                    <br />
                    Balance : {this.state.balance} €
                    <br/>
                    <Link onClick={this.disconnect} to='/login'>Disconnect</Link>
                </div>
            )
        }
        else {
            return (
                <div id="connected"><Link to='/login'>Log in</Link></div>


            );
        }
    }
}
