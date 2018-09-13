import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ShowBookcases from './ShowBookcases';
import SearchPage from './SearchPage';
import * as BooksAPI from './utils/BooksAPI';

class App extends Component {
  state = {
    myBooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(myBooks => this.setState({ myBooks }));
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={ShowBookcases} />

        <Route exact path="/search" render={() => (
          <SearchPage myBooks={this.state.myBooks} />
        )} />
      </div>
    );
  }
}

export default App;
