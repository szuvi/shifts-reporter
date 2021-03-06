import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core/';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h5" component="h1">
          Shift Reporter
        </Typography>
        <Button
          component={Link}
          to={pathname === '/' ? '/instructions' : '/'}
          color="secondary"
          variant="contained"
        >
          {pathname === '/' ? 'Instrukcja' : 'Główna'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
