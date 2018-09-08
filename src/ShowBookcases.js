import React from 'react';
import { Link } from 'react-router-dom';

import HeaderBar from './HeaderBar';
import SearchButton from './SearchButton';

class ShowBookcases extends React.Component {

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

export default ShowBookcases;
