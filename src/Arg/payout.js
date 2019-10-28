import React from 'react';
import '../App.css'; import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Error from '../Error'

export default class Deposit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user_id: "", id: "", payout: "" };
  }

  handleChangeWritting = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  removeMoney= () => {
    if (this.state.payout == "")
    {
      document.getElementById("error").innerHTML="Enter a valid amount";
      return(0);
    }

    const exists = this.props.allWallets.find(
      (item) => {
        return item.id == this.props.connected.id
      }
    );
    console.log(exists)
    if (exists) {
      console.log("retrait d'argent");

      if (exists.balance == null)
      {
        exists.balance= 0;
      }  
      if (this.state.payin == "")
      {
        this.setState({payin: 0});
      }
      exists.balance =parseInt(exists.balance)-parseInt(this.state.payout);
  
      let LS_Wallet = JSON.parse(localStorage.getItem("wallets"));
      console.log("avant changement : ",LS_Wallet);
      for (let i =0; i<LS_Wallet.length; i++)
      {
        console.log(LS_Wallet[i].id , exists.id)
        if(LS_Wallet[i].id == exists.id)
        {
          LS_Wallet[i] = exists;
          break;
        }
   
      }

      var b = {};
      b.id = this.props.connected.id;
      b.wallet_id = this.props.connected.id;
      b.amount = this.state.payout;
      var LS_Payouts = JSON.parse(localStorage.getItem("payouts"));
  LS_Payouts.push(b);
      console.log("payouts :", LS_Payouts)
      localStorage.setItem("payouts", JSON.stringify(LS_Payouts));



      console.log("apres changement : ",LS_Wallet);
      localStorage.setItem("wallets", JSON.stringify(LS_Wallet));
      window.location.reload();

    } else {
      console.log("echec");
    }
  }

  validate = (event) => {
    var theEvent = event || window.event;
    
      // Handle paste
      if (theEvent.type === 'paste') {
          key = event.clipboardData.getData('text/plain');
      } else {
      // Handle key press
          var key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
      }
      var regex = /[0-9]|\./;
      if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
      }
    }

  render() {

    //checks if the user is connected
    if (this.props.connected.id) {
      return (
        <div className="content">
          <h1> Pay out : </h1>
          Amount :
          < input type="text" name="payout" onKeyPress={this.validate} onChange={this.handleChangeWritting} value={this.state.payout} />

          <br />

          <button onClick={this.removeMoney}>Remove</button>

        <div id="error"></div>


        </div>
      );
    } else {
      return (
       <Error/>

      );
    }
  }

}