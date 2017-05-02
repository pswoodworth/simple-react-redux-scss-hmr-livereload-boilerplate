import { push, replace, go, goBack, goForward } from 'react-router-redux';
import { apiRequestFail } from './api';
import storage from 'local-storage-fallback';

export function login({ email, password }) {
  return dispatch => {
    dispatch(loginRequest());
    fetch(`/auth?email=${email}&password=${password}`).then(
      res => {
        if(res.ok){
          res.text().then(token => {
            try{
              storage.setItem('token', token);
            }catch(err){
              console.warn('Unable to save token to local storage', err);
            }
            dispatch(loginSuccess(token));
            dispatch(loginSuccessRedirect());
          });
        }else{
          dispatch(loginFail());
          dispatch(apiRequestFail(`We weren't able to log you in. 
            Please check your email and password.`));
        }
      }
    );
  };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest(){
  return{
    type: LOGIN_REQUEST
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(token){
  return{
    type: LOGIN_SUCCESS,
    token
  };
}

export function loginSuccessRedirect(){
  return dispatch =>{
    dispatch(push('/'));
  };
}

export const LOGIN_FAIL = 'LOGIN_FAIL';
export function loginFail(){
  return{
    type: LOGIN_FAIL
  };
}

export function logout(){
  return dispatch => {
    dispatch(logoutRequest());
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    dispatch(push('/login'));
  };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export function logoutRequest(){
    return{
      type: LOGOUT_REQUEST
    };
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export function logoutSuccess(){
    return{
      type: LOGOUT_SUCCESS
    };
}



