import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyDrawer from './routes/Configuration'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MyDrawer/>
    );
  }
}

export default App;
