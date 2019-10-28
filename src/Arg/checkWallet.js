import React from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';
import Error from '../Error'

export default class CheckWallet extends React.Component {

    constructor(props) {
        super(props);
    }

    checkAccount = () => {
        const exists = this.props.allWallets.find(
            (item) => {
                return item.user_id == this.props.connected.id
            }
        );
        let balance;
        if (exists) {
            balance = exists.balance;
        } else {
            balance = 0;
        }

        return(<div>You have {balance} € on your bank account.</div>)
    }


    render() {
        //checks if the user is connected
        if (this.props.connected.id) {
            return (
                <div className="content">
                    <h1>Balance </h1>
                    <br />
                    {this.checkAccount()}
               <br />
                <Link to="/deposit"> Deposit ? </Link>
                <br/>
                <Link to="/payout"> Withdraw ? </Link>
                </div>
            );
        }

        else {
            return (
                <Error/>

            )
        }
    }

}