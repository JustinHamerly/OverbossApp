import React from 'react';
import { Container, AppBar, Typography } from '@material-ui/core';
import Form from './components/NewGameForm/NewGameForm.js';

const App = () => {

  const terrainTypes = require('./data/terrainTypes.json');
  console.log(terrainTypes);

  function createForm() {
    const formElem = document.getElementById('terrainSelect');
    for (let i=0; i<terrainTypes.length; i++){
      let inputElem = newElement('input', formElem, null);
      inputElem.type = 'checkbox';
      inputElem.id = terrainTypes[i].type;
      inputElem.name = 'terrainTypes';
      inputElem.value = i;
      let labelElem = newElement('label', formElem, terrainTypes[i].type);
      labelElem.for = terrainTypes[i].type;
    }
    let buttonElem = newElement('button', formElem, 'SHUFFLE TILES');
    buttonElem.id = 'submitButton';
    buttonElem.disabled = true;
  }

  function newElement(tagname, parent, text){
    const element = document.createElement(tagname);
    parent.appendChild(element);
    if (text){
      element.textContent = text;
    }
    return element;
  }

  return (
    <>
      <Container maxwidth="lg">
        <AppBar position="static" color="inherit">
          <Typography variant="h2" align="center">Overboss Companion</Typography>
        </AppBar>
      </Container>
      <Form />
    </>
  );
}

export default App;