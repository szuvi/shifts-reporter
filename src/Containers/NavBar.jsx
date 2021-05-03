import * as React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
  instructionsButton: {
    marginRight: theme.spacing(10),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
}));

function NavBar({ showInstructions }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h5" component="h1">
          Shift Reporter
        </Typography>
        <Button
          onClick={showInstructions}
          className={classes.instructionsButton}
          color="inherit"
        >
          Instrukcja
        </Button>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  showInstructions: PropTypes.func.isRequired,
};

export default NavBar;
