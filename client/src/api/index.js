import axios from 'axios';

const url = process.env.REACT_APP_SERVER || 'http://localhost:5000/newgame';

export const fetchGames = () => axios.get(url);
