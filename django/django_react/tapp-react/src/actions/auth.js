import axios from "axios";

import {
  USER_LOADED,
  GET_ERRORS,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

export const errorfetch = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
};

export const loadCustomUser = () => (dispatch, getState) => {
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = (email, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(errorfetch(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const register = ({ name,email, password, instructor,course }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password,instructor, course });

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(errorfetch(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: AUTH_ERROR
      });
    })
    .catch(err => {
    const errors = {
      msg: err.response.data,
      status: err.response.status}
    });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

