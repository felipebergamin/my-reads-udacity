import React from 'react';
import { Link } from 'react-router-dom';

import HeaderBar from './HeaderBar';
import SearchButton from './SearchButton';

class ShowBookshelves extends React.Component {

  render() {
    return (
      <div>
        <HeaderBar />

        <Link to="/search">
          <SearchButton />
        </Link>
      </div>
    );
  }
}

export default ShowBookshelves;
