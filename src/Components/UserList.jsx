import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Switch,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { ReportContext } from '../Contexts/ReportProvider';

function UserList({ error }) {
  const [state, dispatch] = React.useContext(ReportContext);

  const handleToggle = (event) => {
    dispatch({ type: 'TOGGLE', payload: event.target.name });
  };

  const handleToggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL' });
  };

  return (
    <FormControl error={error.length > 0} component="fieldset">
      <FormLabel component="legend">Wybierz z listy</FormLabel>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={state.allToggled}
              onChange={handleToggleAll}
              name="toggleAll"
            />
          }
          label="Wszyscy"
        />

        {Object.keys(state.users).map((userName) => (
          <FormControlLabel
            key={uuidv4()}
            control={
              <Switch
                checked={state.users[userName]}
                onChange={handleToggle}
                name={userName}
              />
            }
            label={userName}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}

UserList.propTypes = {
  error: PropTypes.string,
};

UserList.defaultProps = {
  error: '',
};

export default UserList;
