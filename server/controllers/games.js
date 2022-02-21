import SaveGame from "../models/saveGame.js";

export const getGames = async (req, res) => {
  try{
    const saveGames = await SaveGame.find();
    res.status(200).json(saveGames);
  }catch(error){
    res.status(404).json({message: error.message});
  }
}

export const createGame = (req, res) => {
  try{

  }catch(error){
    
  }
}