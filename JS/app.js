'use strict';
// ------------------------------------------------------GLOBAL VARIABLES
const formElem = document.getElementById('terrainSelect');

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


function checkboxlimit(checkgroup, limit){
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



// ------------------------------------------------------LISTENERS
formElem.addEventListener('submit', handleSubmit);



// ------------------------------------------------------CALL FUNCTIONS
createForm();
checkboxlimit(document.forms.terrainSelect.terrainTypes, 4);
