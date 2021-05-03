import { Container } from '@material-ui/core';
import * as React from 'react';
import InputCard from './Containers/InputCard';
import NavBar from './Containers/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <InputCard />
      </Container>
    </>
  );
}

export default App;
