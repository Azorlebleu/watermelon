import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  componentDidMount() {

    //à quoi ça sert ? je crois pas qu'on en a besoin
    /*
      const state=localStorage.getItem('state')
      if (state){
          this.setState(JSON.parse(state))
      }
      */
  }

  checkLogin = () => {
    //if the user is registered in the database, will connect him, otherwise will deny him.

    //checks that the according email is in the database
    const exists = this.props.allUsers.find(
      (item) => {
        return item.email === this.state.email
      }
    );


    //if there is a match, and that password also matches, connects the user
    if (exists && (exists.password === this.state.password)) {
      let bal = this.props.allWallets.find(
        (item) => {
          return item.id == exists.id
        }
      );
      exists.balance = bal.balance;
    
      console.log(exists);
      Object.assign(this.props.connected, exists);
      
      localStorage.setItem("connected", JSON.stringify(exists));

      //reloads the page to save the changes
      //window.location.reload();
    }
    else {
      document.getElementById("error").innerHTML= "Connection error.";
    }

    window.location.reload();
  }

  handleChangeWritting = (event) => {
    //Modifies the value of the state to match what is written in the inputs
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <div className="content">
        <h1>Connect</h1>
       
        E-mail:
            < input type="text" name="email" onChange={this.handleChangeWritting} value={this.state.email} />
        <br />
        Password :
            < input type="password" name="password" onChange={this.handleChangeWritting} value={this.state.password} />
        <br />
        <button onClick={this.checkLogin}>Log in</button>
        <br />
        <br /> 
        <div id="error"></div>
        <Link to="/new-account">No account yet ?</Link>
        <br />

      </div>



    );
  }
}
export default Login;