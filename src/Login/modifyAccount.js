import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Error from '../Error';

export default class ModifyAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    }

    checkRegister = () =>
    {
        const exists = this.props.allUsers.find(
            (item) => {
                return   (item.email === this.state.email) 
            }
        );

        if (exists && exists.email != this.props.connected.email ) {
            document.getElementById("error").innerHTML = "This email is already used by another user.";
        }
        else {
            //creates a temporary JS object that will replace the previous user
            //this new user keeps the same id to mach with the cards thing
            var a= {};
            a.first_name = this.state.first_name;
            a.last_name = this.state.last_name;
            a.email = this.state.email;
            a.password = this.state.password;
            a.id = this.props.connected.id ;
            var LS_Users = JSON.parse(localStorage.getItem("users"));

            //replaces the user in the local storage
            for (let i =0; i<LS_Users.length; i++)
            {
                if (LS_Users[i].id == a.id)
                {
                    LS_Users[i] = a ;
                    break;
                }
               
            }
            localStorage.setItem("users", JSON.stringify(LS_Users));
            
            Object.assign(this.props.connected, a);
            localStorage.setItem("connected", JSON.stringify(this.props.connected));

            //reloads the page to apply the changes to the current allUsers array
            window.location.reload();
        }
    }

    handleChangeWritting = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {

        //checks if the user is connected
        if (this.props.connected.id) {
            return (
                <div className="content"  >


                <h1>Modifying your account</h1>

                <div id="error"></div>
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
                <button onClick={this.checkRegister}>Save changes</button>
                    <br />

                </div>
            );
        }

        else {
            return (
                <Error/>
            )
        }

    }
}
