import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Upload from './components/upload/upload.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Upload />
      </div>
    );
  }
}

export default App;
