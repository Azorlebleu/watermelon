import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './login';
import user from '../Db/user';
import App from '../App.js'


class NewAccount extends React.Component {

    constructor(props) {
        super(props);
        this.setSate = this.setState.bind(this);
        this.state = {first_name: "", last_name: "", email: "", password: "" };

    }
    componentDidMount() {
        /* const state=localStorage.getItem('state')
         if (state){
             this.setState(JSON.parse(state))
         }*/
    }
    handleChangeWritting = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    checkRegister = () => {
        const exists = this.props.allUsers.find(
            (item) => {
                return item.email === this.state.email
            }
        );

        if (exists) {
            document.getElementById("error").innerHTML="This email address is already taken "
            //a faire
        }
        else {
            //creates the new user and puts it in the local storage and ram of the page
            var a= {};
            a.first_name = this.state.first_name;
            a.last_name = this.state.last_name;
            a.email = this.state.email;
            a.password = this.state.password;
          
            var LS_Users = JSON.parse(localStorage.getItem("users"));
            a.id = this.props.allUsers.length ;
            LS_Users.push(a);
            localStorage.setItem("users", JSON.stringify(LS_Users));

            //creates the wallet associated to the user 
            var b ={};
            b.id = a.id;
            b.user_id = a.id;
            b.balance = 0;
            var LS_Wallets = JSON.parse(localStorage.getItem("wallets"));
            LS_Wallets.push(b);
            localStorage.setItem("wallets", JSON.stringify(LS_Wallets));
            
            //reloads the page to save the changes
            window.location.reload();
        }
    }

    render() {


        return (
            <div className="content">

     
                    <h1>Creating a new account</h1>
                    First Name :
            < input type="text" name="first_name" onChange={this.handleChangeWritting} value={this.state.first_name} />
                    <br />
                    Last Name :
            < input type="text" name="last_name" onChange={this.handleChangeWritting} value={this.state.last_name} />
                    <br />
                    Email :
            < input type="text" name="email" onChange={this.handleChangeWritting} value={this.state.email} />
                    <br />
                    Password :
            < input type="password" name="password" onChange={this.handleChangeWritting} value={this.state.password} required />
                    <br />
                    <button onClick={this.checkRegister}>Register</button>

                    <br />
            <div id="error"></div>

                    <Link to="/login">Already have an account ?</Link>

            </div>
        );
    }
}
export default NewAccount;