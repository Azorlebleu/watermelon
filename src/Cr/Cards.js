import React from 'react';
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modifying: false, last_4: "", brand: "", expired_at: "" };
    }

    removeCardLS = () => {
        let index = this.props.id;
        let LS_Cards = JSON.parse(localStorage.getItem("cards"));

        //removes the corresponding key from local storage
        for (let i = 0; i < LS_Cards.length; i++) {
            if (LS_Cards[i].id == index) {
                LS_Cards.splice(i, 1);
                console.log(i);
                break;
            }
        }
        //saves in localStorage
        localStorage.setItem("cards", JSON.stringify(LS_Cards));
    }

    removeCard = () => {
        this.removeCardLS();
        //reloads the page to save the changes
        window.location.reload();
    }


    modifyCard = () => {
        this.setState({ modifying: true })
    }

    handleChangeWritting = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    cancel = () => {
        this.setState({ modifying: false });
    }

    saveChanges = () => {
        this.removeCard();
        var a = {};
        a.last_4 = this.state.last_4;
        a.brand = this.state.brand;
        a.expired_at = this.state.expired_at;
        a.user_id = this.props.connected.id;
        const ids = this.props.allCards.map((item) => {
            return item.id;
        })
        a.id = Math.max.apply(null, ids) + 1;


        var LS_Cards = JSON.parse(localStorage.getItem("cards"));
        LS_Cards.push(a);
        localStorage.setItem("cards", JSON.stringify(LS_Cards));

        //reloads the page to save the changes
        window.location.reload();
    }
    handleChangeRadio = (event) =>{
        this.setState({ [event.target.name]: event.target.value })
    }
name = () =>{
    let a = this.props.brand;
    let b ;
    if(a === 'visa')
    {
      b = "Visa";
    }
    if(a === 'master_card')
    {
      b = "Master Card";
    }
    if(a === 'american_express')
    {
      b = "American Express";
    }
    if(a === 'union_pay')
    {
      b = "Union Pay";
    }
    if(a === 'jcb')
    {
      b = "JCB";
    }
    return(b);
}
    render() {
        if (this.state.modifying == false) {
            return (
                <tr>
                    <td>
                        {this.props.last_4}
                    </td>
                    <td>
                        {this.name()}
                    </td>
                    <td>
                        {this.props.expired_at}
                    </td>
                    <td>
                        <button onClick={this.removeCard}>Remove</button>
                    </td>
                    <td>
                        <button onClick={this.modifyCard}>Modify</button>
                    </td>
                </tr>
            );
        }

        else {
            return (
                <tr>
                    <td>
                        Last 4 numbers : <input type="text" name="last_4" onChange={this.handleChangeWritting} value={this.state.last_4} />
                    </td>
                    <td>
                        Brand : 
                        <div class="radio">
        Visa :
      <input type="radio" name="brand" value={"visa"} onChange={this.handleChangeRadio}></input>
      <br/>
      Master Card :
      <input type="radio" name="brand" value={"master_card"} onChange={this.handleChangeRadio}></input>
      <br/>
      American Express :
      <input type="radio" name="brand" value={"american_express"} onChange={this.handleChangeRadio}></input>
      <br/>
      Union Pay :
      <input type="radio" name="brand" value={"union_pay"} onChange={this.handleChangeRadio}></input>
      <br/>
      JCB :
      <input type="radio" name="brand" value={"jcb"} onChange={this.handleChangeRadio}></input>
      <br/>

      </div>
                    </td>
                    <td>
                        Expired at : <input type="text" name="expired_at" onChange={this.handleChangeWritting} value={this.state.expired_at} />
                    </td>
                    <td>
                        <button className="normal" onClick={this.cancel}>Cancel</button>
                    </td>
                    <td>
                        <button className="normal" onClick={this.saveChanges}>Save changes</button>
                    </td>
                </tr>
            );
        }
    }
}