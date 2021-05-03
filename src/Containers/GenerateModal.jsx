import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import UserList from '../Components/UserList';

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'toggle': {
      const targetUserState = state.users[action.value];
      return {
        ...state,
        error: '',
        users: {
          ...state.users,
          [action.value]: !targetUserState,
        },
      };
    }

    case 'toggleAll': {
      const toggledUsers = Object.keys(state.users).reduce((acc, key) => {
        acc[key] = !state.allToggled;
        return acc;
      }, {});
      return {
        error: '',
        allToggled: !state.allToggled,
        users: toggledUsers,
      };
    }

    case 'error': {
      return {
        ...state,
        error: action.value,
      };
    }

    default: {
      return state;
    }
  }
};

const userInitializer = (userNames) =>
  userNames.reduce(
    (acc, user) => {
      acc.users[user] = false;
      return acc;
    },
    { allToggled: false, error: '', users: {} },
  );

function GenerateModal({ open, setOpen, userNames, generatePdf }) {
  const [state, dispatch] = React.useReducer(
    usersReducer,
    userNames,
    userInitializer,
  );

  const toggleUser = (userName) => {
    dispatch({ type: 'toggle', value: userName });
  };

  const toggleAll = () => {
    dispatch({ type: 'toggleAll' });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGenerate = () => {
    const selectedUsers = Object.keys(state.users).filter(
      (userName) => state.users[userName] === true,
    );
    if (selectedUsers.length === 0) {
      dispatch({ type: 'error', value: 'Wybierz użytkownika' });
    } else {
      generatePdf(selectedUsers);
    }
  };

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle>Dla kogo wygenerować raport?</DialogTitle>
      <DialogContent>
        <UserList
          error={state.error}
          users={state.users}
          toggleUser={toggleUser}
          toggleAll={toggleAll}
          allChecked={state.allToggled}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleGenerate}
          variant="contained"
          color="primary"
          startIcon={<PictureAsPdfIcon />}
        >
          Generuj PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}

GenerateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  userNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  generatePdf: PropTypes.func.isRequired,
};

export default GenerateModal;
