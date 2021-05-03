import * as React from 'react';
import {
  Card,
  makeStyles,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShiftsInput from '../Components/ShiftsInput';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 375,
    paddingBottom: theme.spacing(2),
  },
  pasteButton: {
    marginTop: theme.spacing(1),
  },
  generateButton: {
    marginLeft: theme.spacing(2),
  },
}));

function InputCard() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          action={
            <Button
              className={classes.pasteButton}
              variant="outlined"
              color="secondary"
              startIcon={<FileCopyIcon />}
            >
              Przykład
            </Button>
          }
          title="Wklej tablelę poniżej"
        />
        <CardContent>
          <ShiftsInput />
        </CardContent>
        <CardActions>
          <Button
            className={classes.generateButton}
            variant="contained"
            color="primary"
          >
            Wygeneruj
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default InputCard;
