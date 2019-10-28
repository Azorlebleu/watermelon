import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


//declares variables here that will contain all the values we need afterwards
import allUsers from './Db/user';
import allCards from './Db/card';
import allWallets from './Db/wallet';
import allPayins from './Db/payin';
import allPayouts from './Db/payout';

var connected = JSON.parse(localStorage.getItem("connected"));
if (connected == null)
{
    connected = {};
}

console.log("connected = ", connected);

//updates the static arrays with the values of localStorage
var LS_Users = JSON.parse(localStorage.getItem("users"));
var LS_Cards = JSON.parse(localStorage.getItem("cards"));
var LS_Wallets = JSON.parse(localStorage.getItem("wallets"));
var LS_Payins = JSON.parse(localStorage.getItem("payins"));
var LS_Payouts = JSON.parse(localStorage.getItem("payouts"));


//Users
if (LS_Users == null) {
    //sets up the local storage to our standards if not already done
    localStorage.setItem("users", JSON.stringify([]));
}

else {
    //if some users are on the localStorage, we add it to the allUsers "static" array that will now be full with everything 
    for (let i = 0; i < LS_Users.length; i++) {
        allUsers.push(LS_Users[i]);
    }
}
//at this point, we have an array called allUsers that contains all the data about all the users that have been created in the creation of the page, or in the localStorage (= our database)

//Cards 

if (LS_Cards == null) {
    //sets up the local storage to our standards if not already done
    localStorage.setItem("cards", JSON.stringify([]));
}
else {
    for (let i = 0; i < LS_Cards.length; i++) {
        allCards.push(LS_Cards[i]);
    }
}

//Wallets

if (LS_Wallets == null) {
    //sets up the local storage to our standards if not already done
    localStorage.setItem("wallets", JSON.stringify([]));
}
else {
    for (let i = 0; i < LS_Wallets.length; i++) {
        allWallets.push(LS_Wallets[i]);
    }
}

  
    let a = allWallets.find(
        (item) =>
        {
            return( item.user_id == connected.id || item.id == connected.id)
        }
    )

    if (a){
        connected.balance = a.balance;
}
//Payins

if (LS_Payins == null) {
    //sets up the local storage to our standards if not already done
    localStorage.setItem("payins", JSON.stringify([]));
}
else {
    for (let i = 0; i < LS_Payins.length; i++) {
        allPayins.push(LS_Payins[i]);
    }
}

//Payouts
if (LS_Payouts == null) {
    //sets up the local storage to our standards if not already done
    localStorage.setItem("payouts", JSON.stringify([]));
}
else {
    for (let i = 0; i < LS_Payouts.length; i++) {
        allPayouts.push(LS_Payouts[i]);
    }
}
//ReactDOM.render(<BasicExample/>, document.getElementById('root'));
ReactDOM.render(<App allUsers={allUsers} allCards={allCards} allWallets={allWallets} allPayins={allPayins} allPayouts={allPayouts} connected={connected} />, document.getElementById('root'));

//ReactDOM.render(<Nav/>, document.getElementById('links'));
//ReactDOM.render(, document.getElementById('footer'));
// If you want your pp to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
