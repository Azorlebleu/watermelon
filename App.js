import React from 'react';
import './App.css';
import Login from './Login/login.js';

class App extends React.Component {


  render ()
  {
    return(
      <div className="all">
      <div className="header">WATERMELON</div>
      <div className="App">
  
      <Login/>
      </div>
      </div>
    );
  }
   
}

export default App;
