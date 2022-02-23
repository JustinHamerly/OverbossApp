import React from 'react';
import { Container, AppBar, Typography } from '@material-ui/core';
import Form from './components/NewGameForm/NewGameForm.js';


const terrainTypes = require('./data/terrainTypes.json');

class App extends React.Component {

  createForm() {
    const formElem = document.getElementById('terrainSelect');
    for (let i=0; i<terrainTypes.length; i++){
      let inputElem = this.newElement('input', formElem, null);
      inputElem.type = 'checkbox';
      inputElem.id = terrainTypes[i].type;
      inputElem.name = 'terrainTypes';
      inputElem.value = i;
      let labelElem = this.newElement('label', formElem, terrainTypes[i].type);
      labelElem.for = terrainTypes[i].type;
    }
    let buttonElem = this.newElement('button', formElem, 'SHUFFLE TILES');
    buttonElem.id = 'submitButton';
    buttonElem.disabled = true;
  }

  newElement(tagname, parent, text){
    const element = document.createElement(tagname);
    parent.appendChild(element);
    if (text){
      element.textContent = text;
    }
    return element;
  }

  render(){
    return (
      <>
        <Container maxwidth="lg">
          <AppBar position="static" color="inherit">
            <Typography variant="h2" align="center">Overboss Companion</Typography>
          </AppBar>
        </Container>
        <Form createForm={this.createForm} />
      </>
    );
  }
}

export default App;