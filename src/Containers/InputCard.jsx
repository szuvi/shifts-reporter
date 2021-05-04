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
import TableParser from '../Utils/TableParser';
import raportVerification from '../Utils/objectVerification';

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
  const [reportObject, setReportObject] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const users = ['Jan Kowalski', 'Anna Nowak'];

  const handleSampleInput = () => {
    setInput(sampleInput);
  };

  const handleReset = () => {
    setInput('');
  };

  const handleGenerate = () => {
    const myParser = new TableParser(input);
    const myReportObject = myParser.getObject();
    console.table(myReportObject);
    if (raportVerification.isValidUserDateObject(myReportObject)) {
      setReportObject(myReportObject);
      setModalOpen(true);
    } else {
      setError('Nieprawidłowy format tabeli dyżurów.');
    }
  };

  return (
    <>
      <GenerateModal
        reportObject={reportObject}
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
          <ShiftsInput input={input} changeHandler={setInput} error={error} />
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
