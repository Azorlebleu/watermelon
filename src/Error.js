import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';



export default class Error extends React.Component {
    render() {
        return(
        <div id="error">
        You aren't connected. Log in <Link to="/login">here.</Link>
      </div>)
    }
}
