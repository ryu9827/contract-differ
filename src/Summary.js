import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Summary extends Component {
    render(){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Blockchain labs NZ</h1>
            </header>
        )
    }
}

export default Summary;