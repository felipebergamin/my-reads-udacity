import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { Snackbar } from '@material-ui/core';

import HeaderBar from './HeaderBar';
import SearchButton from './SearchButton';
import Bookshelf from './Bookshelf';

class ShowBookshelves extends React.Component {
  state = {
    snackbarMessage: null,
  };
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };

  onCloseSnackbar = (event, reason) => {
    // don't close snackbar when user clicks somewhere on screen
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarMessage: null });
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === result.source.droppableId) {
      this.setState({ snackbarMessage: 'Sorry, reordering isn\'t supported' });
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

        <Snackbar
          anchorOrigin = {{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={!!this.state.snackbarMessage}
          autoHideDuration={6000}
          onClose={this.onCloseSnackbar}
          message={this.state.snackbarMessage}
          />
      </div>
    );
  }
}

export default ShowBookshelves;
