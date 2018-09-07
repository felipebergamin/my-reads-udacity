import React, { Component } from 'react';
import HeaderBar from './HeaderBar';
import SearchButton from './SearchButton';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderBar />

        <SearchButton />
      </div>
    );
  }
}

export default App;
