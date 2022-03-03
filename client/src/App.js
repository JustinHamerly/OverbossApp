import React, { Fragment, useEffect } from 'react';
import { Container, AppBar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getGames } from './actions/games';

import Form from './components/NewGameForm/NewGameForm.js';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

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