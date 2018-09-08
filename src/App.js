import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ShowBookcases from './ShowBookcases';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ShowBookcases} />

        <Route exact path="/search" render={() => (
          <h1>Searching</h1>
        )} />
      </div>
    );
  }
}

export default App;
