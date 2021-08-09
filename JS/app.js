'use strict';
// ------------------------------------------------------GLOBAL VARIABLES
const formElem = document.getElementById('terrainSelect');
const randomButtonElem = document.getElementById('randomFive');

const tilePool = [];
const tokenPool = [];

const terrainArray = ['Forest', 'Cave', 'Graveyard', 'Swamp', 'Camp', 'Castle', 'Cloud Island', 'Desert', 'Summoning Circle', 'Volcano', 'Tower'];
const tokenArray = ['Kobold', 'Dragon', 'Skeleton', 'Witch', 'Orc', 'Vampire', 'Harpy', 'Sandoworm', 'Sorcerobe', 'Elemental', 'Evil Eye'];
const crystalArray = ['Forest Crytal', 'Cave Crystal', 'Graveyard Crystal', 'Swamp Crystal', 'Camp Crystal', 'Castle Crystal', 'Cloud Island Crystal', 'Desert Crystal', 'Summoning Circle Crystal', 'Volcano Crystal', 'Tower Crystal'];
const terrainImgArray = ['img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png'];
const tokenImgArray = ['img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png'];
const crystalImgArray = ['img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png'];


// ------------------------------------------------------CONSTRUCTOR FUNCTIONS
function Tile(tileName, tileImg){
  this.tileName = tileName;
  this.tileImg = tileImg;
}

function Token(tokenName, tokenImg){
  this.tokenName = tokenName;
  this.tokenImg = tokenImg;
}




// ------------------------------------------------------CONSTRUCTOR METHODS





// ------------------------------------------------------GLOBAL FUNCTIONS
function newElement(tagname, parent, text){
  const element = document.createElement(tagname);
  parent.appendChild(element);
  if (text){
    element.textContent = text;
  }
  return element;
}
//for creating and appending elements to HTML in JavaScript

function createForm(){
  for (let i=0; i<terrainArray.length; i++){
    let inputElem = newElement('input', formElem, null);
    inputElem.type = 'checkbox';
    inputElem.id = terrainArray[i];
    inputElem.name = 'terrainTypes';
    inputElem.value = i;
    let labelElem = newElement('label', formElem, terrainArray[i]);
    labelElem.for = terrainArray[i];
  }
  let buttonElem = newElement('button', formElem, 'submit');
  buttonElem.id = 'submitButton';
  buttonElem.disabled = true;
}
//Generates the form for selecting terrain types.

function checkboxLimit(checkgroup, limit){
  for (let i=0; i<checkgroup.length; i++){
    checkgroup[i].addEventListener('click',function(){
      let checkedCount=0;
      for (let i=0; i<checkgroup.length; i++){
        if (checkgroup[i].checked){
          checkedCount++;
        }
      }
      let button = document.getElementById('submitButton');
      if (checkedCount !== limit){
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });
  }
}
//controls the number of selections on the form by enabling and disabling the submit button.

function pickRandomNumber(array){
  return Math.floor(Math.random() * (array.length));
}
//grabs a random index number for the inputted array




// ------------------------------------------------------EVENT FUNCTIONS
function handleSubmit(e){
  e.preventDefault();
  console.log(e);
  for (let i=0; i<terrainArray.length; i++){
    if (e.target[i].checked){
      for (let j=0; j<12; j++){
        tilePool.push(new Tile(terrainArray[i], terrainImgArray[i]));
      }
      for (let j=0; j<10; j++){
        tokenPool.push(new Token(tokenArray[i], tokenImgArray[i]));
      }
      tokenPool.push(new Token(crystalArray[i], crystalImgArray[i]));
    }
  }
  for (let i=0; i<8; i++){
    tilePool.push(new Tile('Dungeon', 'dungeon.png'));
  }
  for (let i=0; i<7; i++){
    tokenPool.push(new Token('Portal', 'portal.png'));
  }
  for (let i=0; i<6; i++){
    tokenPool.push(new Token('Miniboss', 'miniboss.png'));
  }
  console.log(tilePool);
  console.log(tokenPool);
}
//pushes tiles to the array by checking which boxes have been checked.  Also pushes all the standard tokens.

function handleRandom(e){
  console.log(e);
  let checkBoxes = document.forms.terrainSelect.terrainTypes;
  for (let i=0; i<terrainArray.length; i++){
    checkBoxes[i].checked = false;
  }
  for(let i=0; i<5; i++){
    let randomNumber = checkBoxes[pickRandomNumber(terrainArray)];
    while(randomNumber.checked){
      randomNumber = checkBoxes[pickRandomNumber(terrainArray)];
    }
    while(!randomNumber.checked){
      randomNumber.checked = true;
    }
  }
  let button = document.getElementById('submitButton');
  button.disabled = false;
}
//always picks 5 unique boxes to check and sets the submit button to enabled.




// ------------------------------------------------------LISTENERS
formElem.addEventListener('submit', handleSubmit);
randomButtonElem.addEventListener('click', handleRandom);




// ------------------------------------------------------CALL FUNCTIONS
createForm();
checkboxLimit(document.forms.terrainSelect.terrainTypes, 5);
