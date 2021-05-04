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

function UserList({ users, toggleUser, toggleAll, allChecked, error = '' }) {
  const handleToggle = (event) => {
    toggleUser(event.target.name);
  };

  const handleToggleAll = () => {
    toggleAll();
  };

  return (
    <FormControl error={error.length > 0} component="fieldset">
      <FormLabel component="legend">Wybierz z listy</FormLabel>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={allChecked}
              onChange={handleToggleAll}
              name="toggleAll"
            />
          }
          label="Wszyscy"
        />

        {Object.keys(users).map((userName) => (
          <FormControlLabel
            key={uuidv4()}
            control={
              <Switch
                checked={users[userName]}
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
  users: PropTypes.objectOf(PropTypes.bool).isRequired,
  toggleUser: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  allChecked: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  error: PropTypes.string, // default value procided in props deconstruction
};

export default UserList;
