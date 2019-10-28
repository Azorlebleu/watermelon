import React from 'react';
import '../App.css'; import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Error from '../Error'
import { exists } from 'fs';

export default class Transfer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { id:"", credite: "", debite:this.props.connected.email, amount: ""  };
  }

  handleChangeWritting = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  Trade = () => {
    if (this.state.amount== "")
    {
      document.getElementById("error").innerHTML="Enter a valid amount";
      return(0);
    }
      const exists2=this.props.allUsers.find(
          (item)=>{
              return item.email== this.state.credite
          }
          
      );
      const exists1= this.props.allUsers.find(
          (item)=> {
              return item.email==this.state.debite
          }
      );

      if (exists2&&exists1){
          if (exists2.balance==null){
              exists2.balance=0;
          }
          if (exists1.balance==null){
            exists1.balance=0;
        }

        exists1.balance =parseInt(exists1.balance)-parseInt(this.state.amount);

        let LS_Wallet = JSON.parse(localStorage.getItem("wallets"));
        for (let i =0; i<LS_Wallet.length; i++)
        {
          console.log(LS_Wallet[i].id , exists1.id)
          if(LS_Wallet[i].id == exists1.id)
          {
            exists1.user_id = exists1.id;
            LS_Wallet[i] = exists1;
            break;
          }
     
        }
        localStorage.setItem("wallets", JSON.stringify(LS_Wallet));

        exists2.balance = parseInt(this.state.amount) + parseInt(exists2.balance);
  
        LS_Wallet = JSON.parse(localStorage.getItem("wallets"));
        for (let i =0; i<LS_Wallet.length; i++)
        {
          console.log(LS_Wallet[i].id , exists2.id)
          if(LS_Wallet[i].id == exists2.id)
          {     
            exists2.user_id = exists2.id;
            LS_Wallet[i] = exists2;
            break;
          }
          
        }
        localStorage.setItem("wallets", JSON.stringify(LS_Wallet));
        window.location.reload();



      }else{
          document.getElementById("error").innerHTML="The targetted wallet doesn't exist.";
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
          <h1> Money transfer :</h1>
          <br />
          Credited account's mail :
          < input type="text" name="credite"  onChange={this.handleChangeWritting}   value={this.state.credite} />
          <br />
          How much :
          < input type="text" name="amount" onKeyPress={this.validate} onChange={this.handleChangeWritting} value={this.state.amount} />
<br/>
          <button onClick={this.Trade}>Transfer</button>
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