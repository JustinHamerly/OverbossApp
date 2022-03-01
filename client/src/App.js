import React, { Fragment } from 'react';

import { Container, AppBar, Typography } from '@material-ui/core';
import Form from './components/NewGameForm/NewGameForm.js';

function App() {

  return (
    <Fragment>

      <Container maxwidth="lg">
        <AppBar position="static" color="inherit">
          <Typography variant="h2" align="center">Overboss Companion</Typography>
        </AppBar>
      </Container>

      <Form/>

    </Fragment>
  );

}

export default App;