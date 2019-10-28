import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../Error'

export default class NewCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { last_4: "", brand: "", expired_at: "" };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeRadio = (event) =>
  {
    this.setState({ [event.target.name]: event.target.value });  
  } 
  
  addCard = () => {
    console.log(this.props.allCards)
    var a = {};
    a.last_4 = this.state.last_4;
    a.brand = this.state.brand;
    a.expired_at = this.state.expired_at;
    a.user_id = this.props.connected.id;

    if (this.props.allCards == []) {
      a.id = 0;
    }
    else {
      const ids = this.props.allCards.map((item) => {
        return item.id;
      })
      a.id = Math.max.apply(null, ids) + 1;
    }

    var LS_Cards = JSON.parse(localStorage.getItem("cards"));
    LS_Cards.push(a);
    localStorage.setItem("cards", JSON.stringify(LS_Cards));

    //reloads the page to save the changes
    window.location.reload();

  }
  render() {
    if (this.props.connected.id) {


      return (<div className="content">

        <h1>Add new card</h1>
        Last 4 numbers :
      <input type="text" name="last_4" value={this.state.last_4} onChange={this.handleChange}></input>
        <br />
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

        <br />
        Expired at :
      <input type="text" name="expired_at" value={this.state.expired_at} onChange={this.handleChange}></input>
        <br />

        <span onClick={this.addCard}><Link to="cards"> <button >Confirm</button></Link></span>

      </div>);
    }

    else{
      return(<Error/>);
    }
    }
  }
