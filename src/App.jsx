import { Container, useMediaQuery } from '@material-ui/core';
import * as React from 'react';
import { Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputCard from './Containers/InputCard';
import Instructions from './Containers/Instructions';
import NavBar from './Containers/NavBar';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: { main: '#1f2937' },
          secondary: { main: '#58A6F8' },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="md">
          <Route exact path="/">
            <InputCard />
          </Route>
          <Route exact path="/instructions">
            <Instructions />
          </Route>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
