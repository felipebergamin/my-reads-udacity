import React from 'react';
import { withStyles, AppBar, Toolbar, TextField } from '@material-ui/core';
import { debounce } from 'debounce';

import * as BooksAPI from './utils/BooksAPI';
import Book from './Book';

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
});

class SearchPage extends React.Component {
  state = {
    searchResult: [],
    debounceSearch: null,
  };
  debouncedSearch = null;

  onSearchChange = (event) => {
    const searchValue = event.target.value;

    if (this.debouncedSearch) {
      this.debouncedSearch.clear();
    }

    this.debouncedSearch = debounce(() => {
      BooksAPI.search(searchValue)
        .then(searchResult => {
          if (searchResult.error) {
            alert(searchResult.error);
            return;
          }
          const { myBooks } = this.props;

          for(const searchBook of searchResult) {
            for (const myBook of myBooks) {
              // console.log('comparando', myBook.id, searchBook.id);
              if (myBook.id === searchBook.id) {
                // console.log('match');
                searchBook.shelf = myBook.shelf;
                break; // para a iteração, não é necessário iterar o resto do array
              }
            }
          }

          this.setState({ searchResult });
        });
    }, 600);
    this.debouncedSearch();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>

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

        <div className={classes.searchResults}>
          {this.state.searchResult.map(book => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);
