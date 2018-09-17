import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import HeaderBar from './HeaderBar';
import SearchButton from './SearchButton';
import Bookshelf from './Bookshelf';

class ShowBookshelves extends React.Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <HeaderBar />

        <div>
          <Bookshelf
            title="Currently Reading"
            books={this.props.myBooks.filter(b => b.shelf === 'currentlyReading')}
            onUpdateBook={this.props.onUpdateBook}>
          </Bookshelf>

          <Bookshelf
            title="Want To Read"
            books={this.props.myBooks.filter(b => b.shelf === 'wantToRead')}
            onUpdateBook={this.props.onUpdateBook}>
          </Bookshelf>

          <Bookshelf
            title="Read"
            books={this.props.myBooks.filter(b => b.shelf === 'read')}
            onUpdateBook={this.props.onUpdateBook}>
          </Bookshelf>

        </div>

        <Link to="/search">
          <SearchButton />
        </Link>
      </div>
    );
  }
}

export default ShowBookshelves;
