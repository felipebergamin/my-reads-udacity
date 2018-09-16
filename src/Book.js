import React from 'react';
import { Paper, withStyles, Typography, Menu, MenuItem, Tooltip, Chip } from '@material-ui/core';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em',
    margin: '1em',
    maxWidth: '140px',
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  cover: {
    margin: '0 auto',
  },
  cardActions: {
    display: 'flex',
    flexAlign: 'end',
  },
  spacer: {
    flexGrow: '1',
  },

  bookContainer: {
    margin: 'auto 0',
  },
  paperSheet: {
    margin: '1em',
    padding: '.5em',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '180px',
  },
  bookTitle: {
    fontWeight: '900',
  }
});

class Book extends React.Component {
  state = {
    anchorEl: null,
  };
  noCoverImgURL = 'https://image.ibb.co/jqVB1e/822a5d14da9a2c8b035750e0f1838e2c186360a9.jpg';

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  whantToRead = book => () => {
    this.closeMenu();
    return this.props.markAsWantToRead(book);
  }

  currentlyReading = book => () => {
    this.closeMenu();
    return this.props.markAsReading(book);
  }

  read = book => () => {
    this.closeMenu();
    return this.props.markAsRead(book);
  }

  humanizeBookshelf = bookshelf => {
    switch (bookshelf) {
      case 'wantToRead':
        return 'Want To Read';
      case 'currentlyReading':
        return 'Currently Reading';
      case 'read':
        return 'Read';
      default:
        return 'Isn\'t in your shelves';
    }
  }

  render() {
    const { book, classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.bookContainer}>
        <Tooltip title="Click for options">
          <Paper className={classes.paperSheet} onClick={this.openMenu}>
            <div className={classes.cover}>
              <img alt={book.title} src={book.imageLinks ? book.imageLinks.thumbnail : this.noCoverImgURL} />
            </div>

            <div>
              <Chip label={this.humanizeBookshelf(book.shelf)} variant="outlined" />
            </div>

            <div>
              <Typography className={classes.bookTitle}>{book.title}</Typography>
              <Typography>{book.authors ? book.authors.join(', ') : 'No authors information'}</Typography>
            </div>
          </Paper>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
          >
          <MenuItem
            disabled={book.shelf === 'wantToRead'}
            onClick={this.whantToRead(book)}>
            Want to Read
          </MenuItem>
          <MenuItem
            disabled={book.shelf === 'currentlyReading'}
            onClick={this.currentlyReading(book)}>
            Reading
          </MenuItem>
          <MenuItem
            disabled={book.shelf === 'read'}
            onClick={this.read(book)}>
            Read
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(Book);
