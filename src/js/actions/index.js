import { push, replace, go, goBack, goForward } from 'react-router-redux';
import { logout } from './auth';
import { authFetch } from '../utils';
import queryString from 'query-string';
import { keyBy, pick } from 'lodash';

export const INIT_BOT_UPDATE = 'INIT_BOT_UPDATE';
export function initBotUpdate({ botKey }) {
  return (dispatch, getState) =>{
    const bot = getState().bots[botKey];
    let seedUpdate = { 
      botKey,
      time: new Date()
    };
    if(bot && bot.updates && bot.updates.length && typeof bot.updates[0] === 'object'){
      seedUpdate = Object.assign(
        seedUpdate, 
        pick( 
          bot.updates[bot.updates.length - 1], 
          ['lightTimeOn', 'lightTimeOff', 'temperature']
        )
      );
    }
    dispatch(botUpdateChange( seedUpdate ));
  };
}

export const BOT_UPDATE_CHANGE = 'BOT_UPDATE_CHANGE';
export function botUpdateChange(data){
  return {
    type: BOT_UPDATE_CHANGE,
    data
  };
}

export const SET_ACTIVE_UPDATE_INDEX = 'SET_ACTIVE_UPDATE_INDEX';
export function setActiveUpdateIndex(index){
  return {
    type: SET_ACTIVE_UPDATE_INDEX,
    index
  };
}



