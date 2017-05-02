import { push, replace, go, goBack, goForward } from 'react-router-redux';
import { logout } from './auth';
import queryString from 'query-string';
import { keyBy, omit } from 'lodash';
import storage from 'local-storage-fallback';


export const API_REQUEST = 'API_REQUEST';

export function apiRequest(url) {
  return{
    type: API_REQUEST,
    url
  };
}

export const API_REQUEST_FAIL = 'API_REQUEST_FAIL';
export function apiRequestFail(message) {
  return{
    type: API_REQUEST_FAIL,
    message
  };
}

export const DISMISS_ERROR = 'DISMISS_ERROR';
export function dismissError(){
  return{
    type: DISMISS_ERROR
  };
}

export const API_REQUEST_SUCCESS = 'API_REQUEST_SUCCESS';
export function apiRequestSuccess() {
  return{
    type: API_REQUEST_SUCCESS
  };
}

export function makeAuthedApiRequest(req){
  return dispatch => {
    
    const url =  req.url + '?' + queryString.stringify(req.query);
    const method = req.method || 'GET';
    const body = JSON.stringify(req.body) || null;
    const token = storage.getItem('token');
    
    const headers = { 'Authorization' : `Bearer ${token}` };
    if(method.toUpperCase() === 'POST'){
      headers['Content-Type'] = 'application/json';
    }
    let fetchOptions = {
      method,
      headers: new Headers( headers )
    };
    if(method.toUpperCase() === 'POST' && body){
      fetchOptions.body = body;
    }
    if(!token){
      dispatch(logout());
    }else{
      dispatch(apiRequest(url));
      return fetch(url, fetchOptions)
      .then( res => {
        if(res.ok){
          dispatch(apiRequestSuccess());
          return res;
        }else{
          throw Error();
        }
      });
    }
  };
}

export function getBots({ key, history }) {
  return dispatch => {
    return dispatch(makeAuthedApiRequest({
      url: '/api/bot',
      query: { key, history }
    })).catch( err => {
      console.error(err);
      dispatch(apiRequestFail("Something went wrong talking to Poly HQ. Try refreshing!"));
    }).then( res => res.json() ).then( res => {
      dispatch(botUpdate( keyBy(res, 'key') ));
    });
  };
}


export const BOT_UPDATE = 'BOT_UPDATE';
export function botUpdate(data) {
  return{
    type: BOT_UPDATE,
    data
  };
}


export function saveBotUpdate() {
  return ( dispatch, getState ) => {
    const data = getState().botUpdate;
    dispatch(updateBot( data.botKey, {update: omit( data, 'botKey')} ))
    .then( res => {
      dispatch(push(`/bots/${data.botKey}`));
    });
  };
}

export function updateBot(key, data) {
  return ( dispatch, getState ) => {
    return dispatch(makeAuthedApiRequest({
      url: `/api/bot/${key}`,
      body: data,
      method: 'POST'
    })).then(res => res.json()).then( res => {
      dispatch(botUpdate({[key]: res}));
    }).catch( err => {
      console.error(err);
      dispatch(apiRequestFail("Something went wrong. Your update may not have been saved."));
    });
  };
}

export function getSignedS3Url({ type }) {
  return dispatch => {
    return dispatch(makeAuthedApiRequest({
      url: `/api/sign-s3`,
      query: { type }
    })).then( 
      res => res.json() 
    ).catch(e => {
      dispatch(apiRequestFail("Something went wrong uploading your image."));    
    });
  };
}


