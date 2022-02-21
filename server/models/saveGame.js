import mongoose from 'mongoose';

const saveGameSchema = mongoose.Schema({
  name: String,
  creator: String,
  playerCount: Number,
  players: [],
  tokenPool: [],
  tokenPoolDiscard: [],
  tilePool: [],
  tilePoolDiscard: [],
  display: [],
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const SaveGame = mongoose.model('SaveGame', saveGameSchema);

export default SaveGame;