import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography, withStyles } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';

import Book from './Book';

const styles = theme => ({
  bookshelfBody: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    justifyContent: 'center',
  },
  bookshelfTitle: {
    marginLeft: '2em'
  },
  bookshelf: {
    paddingTop: '1.5em',
  },
});

class Bookshelf extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  render() {
    const { classes, onUpdateBook, title, id } = this.props;

    return (
      <div className={classes.bookshelf}>
        <Typography variant="display1" className={classes.bookshelfTitle}>{title}</Typography>
        <Divider />

        <Droppable droppableId={id} direction="horizontal">
          {(provided, snapshot) => (
            <div className={classes.bookshelfBody} ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.books.map((book, index) => (
/*                 <Draggable key={book.id} draggableId={book.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> */
                      <Book
                        key={book.id}
                        book={book}
                        markAsWantToRead={() => onUpdateBook(book, 'wantToRead')}
                        markAsRead={() => onUpdateBook(book, 'read')}
                        markAsReading={() => onUpdateBook(book, 'currentlyReading')}
                        />
                    /* </div>
                  )}
                </Draggable> */
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default withStyles(styles)(Bookshelf);
