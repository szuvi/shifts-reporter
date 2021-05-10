import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import UserList from '../Components/UserList';
import PdfGenerator from '../Utils/pdfGenerator';

const userInitializer = (userNames) =>
  userNames.reduce(
    (acc, user) => {
      acc.users[user] = false;
      return acc;
    },
    { allToggled: false, error: '', users: {}, toGenerate: false }
  );

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return userInitializer(action.value);
    }

    case 'pdfGenerated': {
      return {
        ...state,
        error: '',
      };
    }

    case 'toggle': {
      const targetUserState = state.users[action.value];
      return {
        allToggled: false,
        toGenerate: false,
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
        ...state,
        toGenerate: false,
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

function GenerateModal({ open, setOpen, reportObject }) {
  const [state, dispatch] = React.useReducer(
    usersReducer,
    reportObject.userNames,
    userInitializer
  );
  const [previousReportObj, setpreviousReportObj] = React.useState(
    reportObject
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  if (reportObject !== previousReportObj) {
    dispatch({ type: 'reset', value: reportObject.userNames });
    setpreviousReportObj(reportObject);
  }

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
    const selectedUsersNames = Object.keys(state.users).filter(
      (userName) => state.users[userName] === true
    );
    if (selectedUsersNames.length === 0) {
      dispatch({ type: 'error', value: 'Wybierz użytkowników' });
    } else {
      const { date } = reportObject;
      const selectedDatesByUser = selectedUsersNames.reduce((acc, userName) => {
        acc[userName] = reportObject[userName];
        return acc;
      }, {});
      const generator = new PdfGenerator({ date, ...selectedDatesByUser });
      generator.getReport();
      dispatch({ type: 'pdfGenerated' });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
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
  reportObject: PropTypes.shape({
    date: PropTypes.shape({ month: PropTypes.string, year: PropTypes.number }),
    userNames: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default GenerateModal;
