'use strict';
// ------------------------------------------------------GLOBAL VARIABLES
const formElem = document.getElementById('terrainSelect');
const randomButtonElem = document.getElementById('randomFive');

let game;

const terrainTypes = [
  {
    type: 'Forest',
    creature: 'Kobold',
    tileImg: './img/Tiles/ForestTile.png',
    tokenImg: './img/Tokens/ForestToken.png',
    crystalImg: './img/Crystals/ForestCrystal.png',
    tileDesc: {
      text: 'The forests of Arcadia are dark and deep, and the more you have, the darker and deeper they are.  Kobolds prefer forests.',
      points: 'Players receive a total number of points depending on the number of Forest Tiles they have on their map',
      table: '# of forests/points:  1/1, 2/3, 3/6, 4/10, 5+/15'
    },
    variants: []
  },
  {
    type: 'Cave',
    creature: 'Dragon',
    tileImg: './img/Tiles/CaveTile.png',
    tokenImg: './img/Tokens/CaveToken.png',
    crystalImg: './img/Crystals/CaveCrystal.png',
    tileDesc: {
      text: 'Caves are the natural lairs of dragons and other beasties;  they are at their most powerful when hidden within mountains.',
      points: 'Each Cave is worth 1 base point.  A Cave bordering any mountainous edge of the map is worth an additional 2 points, for a maximum value of 3 points'
    },
    variants: []
  },
  {
    type: 'Graveyard',
    creature: 'Skeleton',
    tileImg: './img/Tiles/GraveyardTile.png',
    tokenImg: './img/Tokens/GraveyardToken.png',
    crystalImg: './img/Crystals/GraveyardCrystal.png',
    tileDesc: {
      text: 'Skeletons, ghouls, and ghosts prowl Arcadia\'s cemeteries.  The Boss who owns the most Graveyards is king of the undead!',
      points: 'Each Graveyard has a base value worth between 1 and 3 points.  Additionally, the Boss with the most Graveyard tiles scores 5 points, and the Boss with the second most Graveyard tiles scores 2.  If two or more Bosses are tied for either first or second place, all of them receive that place\'s points.'
    },
    variants: []
  },
  {
    type: 'Swamp',
    creature: 'Witch',
    tileImg: './img/Tiles/SwampTile.png',
    tokenImg: './img/Tokens/SwampToken.png',
    crystalImg: './img/Crystals/SwampCrystal.png',
    tileDesc: {
      text: 'Wet and loathsome, Swamps spread wherever there is water and rot.  Swamps are home to Arcadia\'s Witches.',
      points: 'Each Swamp is worth 1 base point.  It is also worth 1 additional point if it borders a watery edge of the map, and 1 additional point if it is next to at least one other Swamp tile, for a maximum value of 3 points.'
    },
    variants: []
  },
  {
    type: 'Camp',
    creature: 'Orc',
    tileImg: './img/Tiles/CampTile.png',
    tokenImg: './img/Tokens/CampToken.png',
    crystalImg: './img/Crystals/CampCrystal.png',
    tileDesc: {
      text: '',
      points: '',
      table: '',
    },
    variants: []
  },
  {
    type: 'Castle',
    creature: 'Vampire',
    tileImg: './img/Tiles/CastleTile.png',
    tokenImg: './img/Tokens/CastleToken.png',
    crystalImg: './img/Crystals/CastleCrystal.png',
    tileDesc: {
      text: '',
      points: '',
      table: '',
    },
    variants: []
  },
  {
    type: 'Cloud Island',
    creature: 'Harpy',
    tileImg: './img/Tiles/CloudIslandTile.png',
    tokenImg: './img/Tokens/CloudIslandToken.png',
    crystalImg: './img/Crystals/CloudIslandCrystal.png',
    tileDesc: {
      text: '',
      points: '',
      table: '',
    },
    variants: []
  },
  {
    type: 'Desert',
    creature: 'Sandworm',
    tileImg: './img/Tiles/DesertTile.png',
    tokenImg: './img/Tokens/DesertToken.png',
    crystalImg: './img/Crystals/DesertCrystal.png',
    tileDesc: {
      text: '',
      points: '',
      table: '',
    },
    variants: []
  },
  {
    type: 'Summoning Circle',
    creature: 'Sorcerobe',
    tileImg: './img/Tiles/SummoningCircleTile.png',
    tokenImg: './img/Tokens/SummoningCircleToken.png',
    crystalImg: './img/Crystals/SummoningCircleCrystal.png',
    tileDesc: {
      text: '',
      points: '',
      table: '',
    },
    variants: []
  },
  {
    type: 'Volcano',
    creature: 'Elemental',
    tileImg: './img/Tiles/VolcanoTile.png',
    tokenImg: './img/Tokens/VolcanoToken.png',
    crystalImg: './img/Crystals/VolcanoCrystal.png',
    tileDesc: {
      text: '',
      points: '',
      table: '',
    },
    variants: []
  },
  {
    type: 'Tower',
    creature: 'Evil Eye',
    tileImg: './img/Tiles/TowerTile.png',
    tokenImg: './img/Tokens/TowerToken.png',
    crystalImg: './img/Crystals/TowerCrystal.png',
    tileDesc: {
      text: '',
      points: '',
      table: '',
    },
    variants: []
  }
]

const dungeon = {
  type: 'Dungeon',
  tileImg: './img/Tiles/DungeonTile.png',
  tileDesc: {
    text: 'Dungeons lay at the center of deadly terrain, an enticement for the intrepid adventurer',
    points: 'Each Dungeon is worth 1 base point.  Each Dungeon also gains a point for every different type of terrain that borders it.  If all four sides of a Dungeon are bordered by different types of terrain type, that Dungeon gains its maximum value of 5 points.  Tokens may NOT be placed on Dungeons.'
  }
}


// ------------------------------------------------------CONSTRUCTOR FUNCTIONS
function Game(tokens, tiles){
  this.playerCount = 0;
  this.players = [];
  this.tokenPool = tokens;
  this.tokenPoolDiscard = [];
  this.tilePool = tiles;
  this.tilePoolDiscard = [];
  this.display = [];
}

function Player(name){
  this.name = name;
  this.tokens = [];
  this.tiles = [];
}

function Tile(tileName, tileImg, desc){
  this.tileName = tileName;
  this.tileImg = tileImg;
  this.description = desc;
  this.type = null;
}

function Token(tokenName, tokenImg, desc){
  this.tokenName = tokenName;
  this.tokenImg = tokenImg;
  this.description = desc;
}

function DisplayPair(token, tile){
  this.token = token,
  this.tile = tile
}

// ------------------------------------------------------CONSTRUCTOR METHODS
Game.prototype.addInitialPairs = function() {
  for(let i=0; i<4; i++){
    const tile = this.tilePool.pop();
    const token = this.tokenPool.pop();
    const pair = new DisplayPair(token, tile);
    this.display.push(pair);
  }
}




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

function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
//Fisher Yates array shuffle algorithm.



// ------------------------------------------------------EVENT FUNCTIONS
async function handleSubmit(e){
  e.preventDefault();
  const tilePool = [];
  const tokenPool = [];
  for (let i=0; i<terrainTypes.length; i++){
    if (e.target[i].checked){
      for (let j=0; j<12; j++){
        tilePool.push(new Tile(terrainTypes[i].type, terrainTypes[i].tileImg, terrainTypes[i].tileDesc));
      }
      for (let j=0; j<10; j++){
        tokenPool.push(new Token(terrainTypes[i].creature, terrainTypes[i].tokenImg, terrainTypes[i].creature));
      }
      tokenPool.push(new Token(terrainTypes[i].type + ' Crystal', terrainTypes[i].crystalImg, terrainTypes[i].type + ' Crystal'));
    }
  }
  for (let i=0; i<8; i++){
    tilePool.push(new Tile(dungeon.type, dungeon.tileImg, dungeon.tileDesc));
  }
  for (let i=0; i<7; i++){
    tokenPool.push(new Token('Portal', './img/Tokens/PortalToken.png'));
  }
  for (let i=0; i<6; i++){
    tokenPool.push(new Token('Miniboss', './img/Tokens/MinibossToken.png'));
  }
  await shuffle(tilePool);
  await shuffle(tokenPool);
  game = new Game(tokenPool, tilePool);
  game.addInitialPairs();
  console.log(game);
}
//pushes tiles to the array by checking which boxes have been checked.  Also pushes all the standard tokens.

function handleRandom(e){
  let checkBoxes = document.forms.terrainSelect.terrainTypes;
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


