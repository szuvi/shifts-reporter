/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

const ReportContext = React.createContext();

const initialState = {
  allToggled: false,
  users: [],
  reportObject: { date: {}, users: {} },
};

const reportUpdater = (reportObject) => {
  const users = Object.keys(reportObject.users).reduce((acc, userName) => {
    acc[userName] = false;
    return acc;
  }, {});
  return { allToggled: false, users, reportObject };
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REPORT':
      return reportUpdater(action.payload);

    case 'TOGGLE': {
      const targetUserState = state.users[action.payload];
      return {
        ...state,
        allToggled: false,
        users: {
          ...state.users,
          [action.payload]: !targetUserState,
        },
      };
    }

    case 'TOGGLE_ALL': {
      const toggledUsers = Object.keys(state.users).reduce((acc, key) => {
        acc[key] = !state.allToggled;
        return acc;
      }, {});
      return {
        ...state,
        allToggled: !state.allToggled,
        users: toggledUsers,
      };
    }

    default:
      throw new Error('Incorrect action type');
  }
};

function ReportProvider(props) {
  const value = React.useReducer(userReducer, initialState);

  return <ReportContext.Provider value={value} {...props} />;
}

export { ReportContext, ReportProvider };
