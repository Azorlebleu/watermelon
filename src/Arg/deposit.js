import React from 'react';
import '../App.css'; import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Error from '../Error'

export default class Deposit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user_id: "", id: "", payin: "" };
  }

  handleChangeWritting = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addMoney = () => {

    if (this.state.payin == "")
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
   
      if (exists.balance == null) {
        exists.balance = 0;
      }

      console.log()
      exists.balance = parseInt(this.state.payin) + parseInt(exists.balance);

      let LS_Wallet = JSON.parse(localStorage.getItem("wallets"));
      console.log("avant changement : ", LS_Wallet);
      for (let i = 0; i < LS_Wallet.length; i++) {
        console.log(LS_Wallet[i].id, exists.id)
        if (LS_Wallet[i].id == exists.id) {
          LS_Wallet[i] = exists;
          break;
        }

      }


      // add this payin to the array allPayins
      var b = {};
      b.id = this.props.connected.id;
      b.wallet_id = this.props.connected.id;
      b.amount = this.state.payin;
      var LS_Payins = JSON.parse(localStorage.getItem("payins"));
  LS_Payins.push(b);
      console.log("payins :", LS_Payins)
      localStorage.setItem("payins", JSON.stringify(LS_Payins));



      console.log("apres changement : ", LS_Wallet);
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
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  render() {

    //checks if the user is connected
    if (this.props.connected.id) {
      return (
        <div className="content">
          <h1>Deposit : </h1>
          Amount :
          < input type="text" name="payin" onKeyPress={this.validate} onChange={this.handleChangeWritting} value={this.state.payin} />

          <br />

          <button onClick={this.addMoney}>Add</button>
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