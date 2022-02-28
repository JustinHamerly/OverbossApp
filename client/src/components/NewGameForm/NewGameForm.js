import React, { Fragment, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

const terrainTypes = require('../../data/terrainTypes.json');

function Form() {

  const [buttonDisabled, setButtonDisabled] = useState(true);

  let [checkedCount, updateCheckedCount] = useState(0);
  console.log(checkedCount);

  useEffect(() => {
    if(checkedCount === 5){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [checkedCount]);

  const pickRandomNumber = (array) => {
    return Math.floor(Math.random() * (array.length));
  }

  const handleRandom = (e) => {
    let checkBoxes = document.forms.terrainSelect.terrainTypes;
    for (let i=0; i<terrainTypes.length; i++){
      checkBoxes[i].checked = false;
      updateCheckedCount(0);
    }

    for(let i=0; i<5; i++){
      let randomNumber = checkBoxes[pickRandomNumber(terrainTypes)];
      while(randomNumber.checked){
        randomNumber = checkBoxes[pickRandomNumber(terrainTypes)];
      }
      while(!randomNumber.checked){
        randomNumber.checked = true;
        updateCheckedCount(5);
      }
    }
  }

  const handleCheckbox = (e) => {
    if(e.target.checked === true){
      updateCheckedCount(checkedCount+1);
    }else{
      updateCheckedCount(checkedCount-1);
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
                <input type="checkbox" id={type.type} name="terrainTypes" value={type.type} onClick={(e) => handleCheckbox(e)}>
                </input>
              </Fragment>
            )
          })
        }
            
        <Button id="createGameButton" disabled={buttonDisabled} title="Create Game Button">CREATE GAME</Button>
      </form>
    </Fragment>
  )
  
}


export default Form;