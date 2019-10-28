import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from '../Login/login';
import user from '../Db/user';
import App from '../App.js'
import Card from './Cards'
import { once } from 'events';
import { thisTypeAnnotation } from '@babel/types';

export default class ShowCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = { first_name: "", last_name: "", email: "", password: "" };
    }

    noCard() {
        const exists = this.props.allCards.find(
            (item) => {
                return (item.user_id === this.props.connected.id)
            }
        );

        if (exists == null) {
            return (<div id="error">You have no card yet</div>)
        }
    }
    displayCards() {
        //checks if the connected user has cards
        const exists = this.props.allCards.find(
            (item) => {
                return (item.user_id === this.props.connected.id)
            }
        );
        if (exists == null) {
        }
        else {

            //takes all the cards that belong to the connected user
            let listCards = this.props.allCards.filter((item) => {
                return (item.user_id == this.props.connected.id)
            });

            var cards = [];

            console.log(this.state.listCards);
            console.log(listCards)
            for (let i = 0; i < listCards.length; i++) {
                cards.push(<Card allCards={this.props.allCards} connected={this.props.connected} key={listCards[i].id} id={listCards[i].id} last_4={listCards[i].last_4} brand={listCards[i].brand} expired_at={listCards[i].expired_at}/>);

            }

            return (cards);
        }
    }




    render() {
        if(this.props.connected.id)
        {
            return (
                <div class="content">
                    <h1>My cards</h1>
                    {this.noCard()}
                    <br/>
                    <table>
                        <tbody>
                            <tr>
                                <th>Last 4</th>
                                <th>Brand</th>
                                <th>Expired at</th>
                                <th>Remove card</th>
                                <th>Modify card</th>
                            </tr>
                            {this.displayCards()}
                            <tr key={-1}><td id="newCard" colSpan="5" ><Link to="new-card">Add new card</Link></td></tr>
                        </tbody>
                    </table>
    
                </div>
            );
        }
       
        else{
            return (
                <div id="error">
                    You aren't connected. Log in <Link to="/login">here.</Link>
                </div>
            )
        }
    }
}