import { TextField } from '@material-ui/core';
import * as React from 'react';

function ShiftsInput() {
  const [input, setInput] = React.useState('');

  const handleInputChange = ({ target: { value } }) => {
    setInput(value);
  };

  return (
    <TextField
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

export default ShiftsInput;
