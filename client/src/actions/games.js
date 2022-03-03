import * as api from '../api';

// action creators

export const getGames = () => async (dispatch) => {

  try{

    const { data } = await api.fetchGames();
    dispatch({type: 'FETCH_ALL', data});

  }catch(e){

    console.log(e.message);

  }
}