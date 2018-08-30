import React, { Component } from 'react';
import Title from './Title';
import Body from './Body';
import Summary from './Summary';


class App extends Component {
  render() {
    return (
        <div className="App">
          <Title />
          <Body />
          {/* <Summary /> */}
        </div>
    );
  }
}

export default App;
