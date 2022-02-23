import React, { Fragment } from 'react';

const terrainTypes = require('../../data/terrainTypes.json');

class Form extends React.Component {

  pickRandomNumber(array){
    return Math.floor(Math.random() * (array.length));
  }

  handleRandom(e){
    let checkBoxes = document.forms.terrainSelect.terrainTypes;
    for (let i=0; i<terrainTypes.length; i++){
      checkBoxes[i].checked = false;
    }
    for(let i=0; i<5; i++){
      let randomNumber = checkBoxes[this.pickRandomNumber(terrainTypes)];
      while(randomNumber.checked){
        randomNumber = checkBoxes[this.pickRandomNumber(terrainTypes)];
      }
      while(!randomNumber.checked){
        randomNumber.checked = true;
      }
    }
    let button = document.getElementById('submitButton');
    button.disabled = false;
  }

  render() {
    return (
      <form id="terrainSelect">
        <button id='randomFive'>PICK RANDOM FIVE TERRAIN</button>
        {
          terrainTypes.map(type => {
            console.log(type);
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
    )
  }
}

export default Form;