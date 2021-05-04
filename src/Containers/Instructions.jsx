import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import InstructionImage from '../Components/InstructionImage';

function getSteps() {
  return [
    'Skopiuj tabelę',
    'Wklej do programu',
    'Wygeneruj',
    'Wybierz użytkownika',
    'Dokument gotowy do druku',
  ];
}

const useStyles = makeStyles({
  actions: {
    justifyContent: 'space-around',
  },
});

function Instructions() {
  const [currStep, setStep] = React.useState(0);
  const steps = getSteps();
  const classes = useStyles();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Card>
      <Stepper activeStep={currStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <CardContent>
        <InstructionImage stepCount={currStep + 1} />
      </CardContent>

      <CardActions className={classes.actions}>
        <Button onClick={handleBack} disabled={currStep === 0}>
          Poprzedni
        </Button>
        {currStep === steps.length - 1 ? (
          <Button onClick={handleReset}>Reset</Button>
        ) : (
          <Button onClick={handleNext}>Nastepny</Button>
        )}
        <Button component={Link} to="/" variant="contained" color="secondary">
          Powrót
        </Button>
      </CardActions>
    </Card>
  );
}

export default Instructions;
