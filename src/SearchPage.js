import React from 'react';
import { withStyles, AppBar, Snackbar, Toolbar, TextField, IconButton, Icon } from '@material-ui/core';
import { debounce } from 'debounce';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import * as BooksAPI from './utils/BooksAPI';
import Bookshelf from './Bookshelf';

const styles = theme => ({
  searchResults: {
    display: 'flex',
    // maxWidth: '940px',
    flexWrap: 'wrap',
    margin: '0 auto',
    justifyContent: 'center',
  },
  textfield: {
    margin: '0 auto',
    width: '25%',
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '2px 12px',
    transition: theme.transitions.create(['box-shadow']),
  },
  linkStyle: {
    color: 'inherit',
  }
});

class SearchPage extends React.Component {
  state = {
    searchResult: [],
    snackbarMessage: null,
  };
  debouncedSearch = null;

  onSearchChange = (event) => {
    const searchValue = event.target.value.trim();

    if (!searchValue) {
      this.setState({ searchResult: [] });
      return;
    }

    // if exists a debounced search
    if (this.debouncedSearch) {
      // clear it
      this.debouncedSearch.clear();
    }

    // create a debounced search that will be executed 600ms after user stop typing
    this.debouncedSearch = debounce(() => {
      BooksAPI.search(searchValue)
        .then(searchResult => {
          if (searchResult.error) {
            this.setState({searchResult: [], snackbarMessage: searchResult.error});
            return;
          }

          this.setState({ searchResult });
        });
    }, 600);
    // start debounce timer
    this.debouncedSearch();
  };

  onCloseSnackbar = (event, reason) => {
    // don't close snackbar when user clicks somewhere on screen
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarMessage: null });
  }

  render() {
    const { classes } = this.props;

    return (
        <div>
          <AppBar position="static">
            <Toolbar>

              <Link to="/" className={classes.linkStyle}>
                <IconButton className={classes.button} aria-label="Home" color="inherit">
                  <Icon color="inherit">home</Icon>
                </IconButton>
              </Link>

              <TextField
                onChange={this.onSearchChange}
                placeholder="Book Name"
                margin="normal"
                color="inherit"
                className={classes.textfield}
                InputProps={{ disableUnderline: true }}
                />

            </Toolbar>
          </AppBar>

          <DragDropContext onDragEnd={() => null}>
            <Bookshelf
              id="searchResults"
              books={this.state.searchResult.map(book => (
                this.props.myBooks.find(myBook => myBook.id === book.id) || book
              ))}
              onUpdateBook={this.props.onUpdateBook}
              title="Search Result"
              />
          </DragDropContext>

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

export default withStyles(styles)(SearchPage);
