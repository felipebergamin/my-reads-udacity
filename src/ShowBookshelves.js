import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import HeaderBar from './HeaderBar';
import SearchButton from './SearchButton';
import Bookshelf from './Bookshelf';

class ShowBookshelves extends React.Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };

  onDragEnd = result => {
    if (result.destination.droppableId === result.source.droppableId) {
      console.log('reorder isn\'t supported');
    } else {
      this.props.onUpdateBook({id: result.draggableId}, result.destination.droppableId);
    }
  }

  render() {
    return (
      <div>
        <HeaderBar />

        <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Bookshelf
              id="currentlyReading"
              title="Currently Reading"
              books={this.props.myBooks.filter(b => b.shelf === 'currentlyReading')}
              onUpdateBook={this.props.onUpdateBook}>
            </Bookshelf>

            <Bookshelf
              id="wantToRead"
              title="Want To Read"
              books={this.props.myBooks.filter(b => b.shelf === 'wantToRead')}
              onUpdateBook={this.props.onUpdateBook}>
            </Bookshelf>

            <Bookshelf
              id="read"
              title="Read"
              books={this.props.myBooks.filter(b => b.shelf === 'read')}
              onUpdateBook={this.props.onUpdateBook}>
            </Bookshelf>
          </DragDropContext>
        </div>

        <Link to="/search">
          <SearchButton />
        </Link>
      </div>
    );
  }
}

export default ShowBookshelves;
