import React from 'react';
import {Link} from 'react-router-dom'; 

export default class Cards extends React.Component {
  render ()
  {
    if(localStorage.getItem("connected")==0)
    {
      return(
        <div className="">
          <h1>Welcome !</h1> 
          <br/>
          You can <Link to="/login">log in here</Link> or <Link to="/new-account">create a new account here</Link>.
        </div>
      );
    }


    else
    {
      return(
        <div className="">
        <h1>Welcome {localStorage.getItem("con_name")} !</h1> 
        <br/>
        You can <Link to="/login">log in here</Link> or <Link to="/new-account">create a new account here</Link>.
      </div>
      )
    }

  }
}

