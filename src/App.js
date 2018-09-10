import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ShowBookcases from './ShowBookcases';
import SearchPage from './SearchPage';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ShowBookcases} />

        <Route exact path="/search" render={() => (
          <SearchPage />
        )} />
      </div>
    );
  }
}

export default App;
