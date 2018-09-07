import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class HeaderBar extends React.Component {

  render() {
    return (
      <AppBar>
        <Toolbar classes={{ root: 'center-text' }}>
          <Typography variant="title" color="inherit" >
            My Reads
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderBar;
