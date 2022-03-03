import React, { Fragment, useState, useEffect } from 'react';
import { Button, Paper } from '@material-ui/core';

const terrainTypes = require('../../data/terrainTypes');
const terrainKeys = Array.from(terrainTypes.default.keys());

function Form() {

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [checkedCount, updateCheckedCount] = useState(0);
  const [selectedTerrain, setSelectedTerrain] = useState([]);
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState([]);

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
    for (let i=0; i<terrainKeys.length; i++){
      checkBoxes[i].checked = false;
      updateCheckedCount(0);
    }

    let selectedTypes = [];

    for(let i=0; i<5; i++){
      let randomKey = checkBoxes[pickRandomNumber(terrainKeys)];
      while(randomKey.checked){
        randomKey = checkBoxes[pickRandomNumber(terrainKeys)];
      }
      while(!randomKey.checked){
        randomKey.checked = true;
        selectedTypes.push(randomKey.value);
      }
    }
    
    setSelectedTerrain(selectedTypes);
    updateCheckedCount(5);
  }

  const handleCheckbox = (e) => {
    if(e.target.checked === true){
      updateCheckedCount(checkedCount+1);
      setSelectedTerrain(selectedTerrain => [...selectedTerrain, e.target.value]);
    }else{
      updateCheckedCount(checkedCount-1);
      setSelectedTerrain(selectedTerrain => selectedTerrain.filter(item => item !== e.target.value));
    }
  }
  
  const handlePlayerCount = (e) => {
    setPlayerCount(parseInt(e.target.value));
  }
  
  function handlePlayers() {
    const nameFields = document.forms.terrainSelect.pname;
    setPlayers(() => {
      let players = [];
      nameFields.forEach(field => players.push({player: field.id, name: field.value}));
      return players;
    });
  }

  const handleNewGame = () => {
    handlePlayers();
    
  }
  
  return(
    <Paper>
      <Button id='randomFive' onClick={() => handleRandom()}>PICK RANDOM FIVE TERRAIN</Button>
      <form id="terrainSelect" autoComplete="off" noValidate>
        {
          terrainKeys.map(key => {
            return(
              <Fragment key={key}>
                <label htmlFor={key}>{key}</label>
                <input type="checkbox" id={key} name="terrainTypes" value={key} onClick={(e) => handleCheckbox(e)}/>
              </Fragment>
            )
          })
        }
        <Fragment key="players">
          <label htmlFor="playerCount">Player Count:</label>
          <select defaultValue="2" className="playerCount" onChange={(e) => handlePlayerCount(e)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <Paper id="playernames">
            <label htmlFor="playerone">Player 1:</label>
            <input type="text" id="playerone" name="pname"></input>
            {playerCount > 1 &&
              <>
                <label htmlFor="playertwo">Player 2:</label>
                <input type="text" id="playertwo" name="pname"></input>
              </>}
            {playerCount > 2 && 
              <>
                <label htmlFor="playerthree">Player 3:</label>
                <input type="text" id="playerthree" name="pname"></input>
              </>}
            {playerCount > 3 && 
              <>
                <label htmlFor="playerfour">Player 4:</label>
                <input type="text" id="playerfour" name="pname"></input>
              </>}
            {playerCount === 5 &&
              <>
                <label htmlFor="playerfive">Player 5:</label>
                <input type="text" id="playerfive" name="pname"></input>
              </>}
          </Paper>
        </Fragment>
        <Button id="createGameButton" disabled={buttonDisabled} title="Create Game Button" onClick={handleNewGame}>CREATE GAME</Button>
      </form>
    </Paper>
  )
  
}

export default Form;