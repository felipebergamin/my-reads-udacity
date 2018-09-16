import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

const render = (props) => {
  const { classes } = props;

  return (
    <Button variant="extendedFab" color="primary" className={classes.fab}>
      <Icon>search</Icon>
      Search Books
    </Button>
  );
}

render.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(render);