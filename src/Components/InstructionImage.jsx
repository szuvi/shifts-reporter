import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import images from '../Resources/Images/images';

const useStyles = makeStyles({
  media: {
    width: '100%',
  },
});

function InstructionImage({ stepCount }) {
  const imageName = `step${stepCount}`;
  const image = images[imageName];
  const classes = useStyles();

  return <img className={classes.media} src={image} alt={image} />;
}

InstructionImage.propTypes = {
  stepCount: PropTypes.number.isRequired,
};

export default InstructionImage;
