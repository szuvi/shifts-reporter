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
import { ReportContext } from '../Contexts/ReportProvider';
import useTableParser from '../Hooks/useTableParser';

const useStyles = makeStyles((theme) => ({
  root: {
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
  const [input, setInput] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [, dispatch] = React.useContext(ReportContext);
  const classes = useStyles();
  const { generateReportObject, isValidReport } = useTableParser();

  const handleSampleInput = () => {
    setInput(sampleInput);
  };

  const handleReset = () => {
    setInput('');
  };

  const handleGenerate = () => {
    const reportObject = generateReportObject(input);
    if (isValidReport(reportObject)) {
      dispatch({ type: 'UPDATE_REPORT', payload: reportObject });
      setModalOpen(true);
    } else {
      setError('Nieprawidłowy format tabeli dyżurów.');
    }
  };

  return (
    <>
      <GenerateModal open={modalOpen} setOpen={setModalOpen} />

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
