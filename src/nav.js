import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './nav.css';

export default class Nav extends React.Component {
  render() {
    return (

      <div className="links">


        <Link className='Link' to="/login"><div>Log in</div></Link>


        <Link className='Link' to="/new-account"><div>New Account</div></Link>


        <Link className='Link' to="/modify-account"><div>Modify Account</div></Link>


        <Link className='Link' to="/cards"><div>Cards</div></Link>

        <Link className='Link' to="/check-wallet"><div>Check my Balance</div></Link>


        <Link className='Link' to="/deposit"><div>Deposit</div></Link>


        <Link className='Link' to="/payout"><div>Payout</div></Link>


        <Link className='Link' to="/money-transfer"><div>Money Transfer</div></Link>

      </div>

    );
  }

}

