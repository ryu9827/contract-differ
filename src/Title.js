import React, { Component } from 'react';
import logo from './download.png';


export default class Title extends Component {
    render(){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Contract Differ - Beta version</h1>
                <h5>from <a href="#">Blockchain labs NZ</a></h5>
                <h8><a href="#">Source Code at Github</a></h8>
            </header>
        )
    }
}