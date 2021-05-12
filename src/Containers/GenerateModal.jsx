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
import usePdfGenerator from '../Hooks/usePdfGenerator';
import { ReportContext } from '../Contexts/ReportProvider';

function GenerateModal({ open, setOpen }) {
  const [state] = React.useContext(ReportContext);
  const [error, setError] = React.useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const selectedUsersData = React.useMemo(
    () =>
      Object.keys(state.users).reduce((acc, userName) => {
        if (state.users[userName] === true) {
          acc[userName] = state.reportObject.users[userName];
        }
        return acc;
      }, {}),
    [state.users, state.reportObject.users]
  );

  const { getReport } = usePdfGenerator(state.reportObject, selectedUsersData);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGenerate = () => {
    if (Object.keys(selectedUsersData).length === 0) {
      setError('Wybież co najmniej jedną osobę.');
    } else {
      getReport();
      setError('');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle>Dla kogo wygenerować raport?</DialogTitle>
      <DialogContent>
        <UserList error={error} users={state.users} />
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
};

export default GenerateModal;
