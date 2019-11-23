import React from 'react';
import logo from './logo.svg';
import { Keyboard } from './Keyboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Keyboard/>
      </header>
    </div>
  );
}

export default App;
