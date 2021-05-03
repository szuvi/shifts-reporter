import { Container } from '@material-ui/core';
import * as React from 'react';
import { Route } from 'react-router-dom';
import InputCard from './Containers/InputCard';
import Instructions from './Containers/Instructions';
import NavBar from './Containers/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Route exact path="/">
          <InputCard />
        </Route>
        <Route exact path="/instructions">
          <Instructions />
        </Route>
      </Container>
    </>
  );
}

export default App;
