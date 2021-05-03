import { Container } from '@material-ui/core';
import * as React from 'react';
// import InputCard from './Containers/InputCard';
import Instructions from './Containers/Instructions';
import NavBar from './Containers/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Instructions />
      </Container>
    </>
  );
}

export default App;
