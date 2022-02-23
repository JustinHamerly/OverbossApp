import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';

const terrainTypes = require('../../data/terrainTypes.json');

function Form() {

  const pickRandomNumber = (array) => {
    return Math.floor(Math.random() * (array.length));
  }

  const handleRandom = (e) => {
    let checkBoxes = document.forms.terrainSelect.terrainTypes;
    console.log(checkBoxes);
    for (let i=0; i<terrainTypes.length; i++){
      checkBoxes[i].checked = false;
    }

    for(let i=0; i<5; i++){
      let randomNumber = checkBoxes[pickRandomNumber(terrainTypes)];
      while(randomNumber.checked){
        randomNumber = checkBoxes[pickRandomNumber(terrainTypes)];
      }
      while(!randomNumber.checked){
        randomNumber.checked = true;
      }
    }
  }

  return(
    <Fragment>
      <Button id='randomFive' onClick={() => handleRandom()}>PICK RANDOM FIVE TERRAIN</Button>
      <form id="terrainSelect">
        {
          terrainTypes.map(type => {
            return(
              <Fragment key={type.type}>
                <label htmlFor={type.type}>{type.type}</label>
                <input type="checkbox" id={type.type} name="terrainTypes" value={type.type}>
                </input>
              </Fragment>
            )
          })
        }
            
        <button id="createGameButton" disabled={true} title="Create Game Button">CREATE GAME</button>
      </form>
    </Fragment>
  )
  
}


export default Form;