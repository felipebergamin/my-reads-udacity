import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ShowBookshelves from './ShowBookshelves';
import SearchPage from './SearchPage';
import * as BooksAPI from './utils/BooksAPI';

class App extends Component {
  state = {
    myBooks: [],
  };
  _mounted;

  componentDidMount() {
    this._mounted = true;
    BooksAPI.getAll()
      .then(myBooks => this._mounted && this.setState({ myBooks }));
  }

  componentWillUnmount() {
    this._mounted = false;
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
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => (
            <ShowBookshelves myBooks={this.state.myBooks} onUpdateBook={this.updateBook} />
          )} />

          <Route exact path="/search" render={() => (
            <SearchPage myBooks={this.state.myBooks} onUpdateBook={this.updateBook} />
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
