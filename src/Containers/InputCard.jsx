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
import sampleInput from '../Resources/sample';
import GenerateModal from './GenerateModal';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 375,
    paddingBottom: theme.spacing(1),
  },
  cardButtons: {
    justifyContent: 'space-between',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  pasteButton: {
    marginTop: theme.spacing(1),
  },
}));

function InputCard() {
  const classes = useStyles();
  const [input, setInput] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const users = ['Jan Kowalski', 'Anna Nowak'];

  const handleSampleInput = () => {
    setInput(sampleInput);
  };

  const handleReset = () => {
    setInput('');
  };

  const handleGenerate = () => {
    setModalOpen(true);
  };

  return (
    <>
      <GenerateModal
        open={modalOpen}
        setOpen={setModalOpen}
        userNames={users}
      />
      <Card className={classes.root}>
        <CardHeader
          action={
            <Button
              className={classes.pasteButton}
              variant="outlined"
              color="secondary"
              startIcon={<FileCopyIcon />}
              onClick={handleSampleInput}
            >
              Przykład
            </Button>
          }
          title="Wklej tablelę poniżej"
        />

        <CardContent>
          <ShiftsInput input={input} changeHandler={setInput} />
        </CardContent>

        <CardActions className={classes.cardButtons}>
          <Button onClick={handleReset} color="secondary">
            Wyczyść
          </Button>
          <Button
            onClick={handleGenerate}
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
