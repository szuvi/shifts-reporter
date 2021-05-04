import { TextField } from '@material-ui/core';
import * as React from 'react';
import PropTypes from 'prop-types';

function ShiftsInput({ input, changeHandler, error }) {
  const handleInputChange = ({ target: { value } }) => {
    changeHandler(value);
  };

  return (
    <TextField
      error={error.length > 0}
      helperText={error}
      value={input}
      onChange={handleInputChange}
      id="outlined-multiline-static"
      label="Tutaj wklej skopiowaną tabelę"
      fullWidth
      multiline
      rows={10}
      variant="outlined"
    />
  );
}

ShiftsInput.propTypes = {
  input: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default ShiftsInput;
