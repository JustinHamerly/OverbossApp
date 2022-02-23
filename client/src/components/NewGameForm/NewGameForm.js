import React from 'react';

const terrainTypes = require('../../data/terrainTypes.json');

const Form = () => {
  
  return (
    <form id="terrainSelect">
      {
        terrainTypes.forEach(type => {
          <input type="checkbox" id={type.type} name="terrainTypes" value={type.type}>
            {/* <label for={type.type}>

            </label> */}
          </input>
        })
      }
    </form>
  );
}

export default Form;