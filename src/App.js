import React from 'react';
import './App.css';
import Login from './Login/login.js';
import NewAccount from './Login/newAccount';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Nav from './nav.js'
import ModifyAccount from './Login/modifyAccount'
import NewCards from './Cr/NewCards'
import ShowCards from './Cr/showCards'
import Deposit from './Arg/deposit';
import CheckWallet from './Arg/checkWallet';
import Payout from './Arg/payout';
import Header from './header.js';
import Connected from './Connected.js'
import Transfer from './Arg/Transfer'
import Error from './Error';
export default class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="all">
         <Header />
         
        <div className="App">
       
          <BrowserRouter>
            <Connected connected={this.props.connected}/>
            <Nav />

            <Switch>

              <Route path="/check-wallet" render={() => <CheckWallet connected={this.props.connected} allWallets={this.props.allWallets} />} />

              <Route path="/deposit" render={() => <Deposit connected={this.props.connected} allWallets={this.props.allWallets} />} />


              <Route path="/payout" render={() => <Payout connected={this.props.connected} allWallets={this.props.allWallets} />} />

              <Route path="/money-transfer" render={() => <Transfer connected={this.props.connected} allWallets={this.props.allWallets} allUsers={this.props.allUsers}/>} />


              <Route path="/login" render={() => <Login connected={this.props.connected} allWallets={this.props.allWallets} allUsers={this.props.allUsers} />} />

              <Route exact path="/new-account" render={() => <NewAccount allUsers={this.props.allUsers} allWallet={this.props.allWallet} />} />

              <Route exact path="/modify-account" render={() => <ModifyAccount connected={this.props.connected} allUsers={this.props.allUsers} />} />

              <Route exact path="/cards" render={() => <ShowCards connected={this.props.connected} allCards={this.props.allCards} />} />

              <Route exact path="/new-card" render={() => <NewCards connected={this.props.connected} allCards={this.props.allCards} />} />

            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }

}