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

  openMenu = event => {
    console.log('handle click');
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { book, classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.bookContainer}>
        <Tooltip title="Click for options">
          <Paper className={classes.paperSheet} onClick={this.openMenu}>
            <div className={classes.cover}>
              <img alt={book.title} src={book.imageLinks.thumbnail} />
            </div>

            <Chip label={book.shelf} variant="outlined" />

            <div>
              <Typography className={classes.bookTitle}>{book.title}</Typography>
              <Typography>{book.authors.join(', ')}</Typography>
            </div>
          </Paper>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
          >
          <MenuItem onClick={this.closeMenu}>Profile</MenuItem>
          <MenuItem onClick={this.closeMenu}>My account</MenuItem>
          <MenuItem onClick={this.closeMenu}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(Book);
