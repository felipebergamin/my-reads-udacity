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

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(state => {
          const foundBook = state.myBooks.find(myBook => myBook.id === book.id);
          
          if (foundBook) foundBook.shelf = shelf;
          else state.myBooks.push({...book, shelf});

          return state;
        });
      })
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={ShowBookcases} />

        <Route exact path="/search" render={() => (
          <SearchPage myBooks={this.state.myBooks} onUpdateBook={this.updateBook} />
        )} />
      </div>
    );
  }
}

export default App;
