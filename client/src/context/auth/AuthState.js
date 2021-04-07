import React, { useContext, useReducer } from "react";
//import uuid from "uuid";
import axios from "axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null, // logged in or not
    loading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    // @todo - load token into global headers (x-auth-token : token)
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      console.log(res.data);
      state.user = res.data;
      dispatch({ type: USER_LOADED, payload: res.data });
      //   console.log(state.user);
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register user
  // we need to send a POST request to /api/users and send some data like header(content-type : application/json)
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      // Here we get the token from backend users route which we need to store at global level via context API
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login user
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
      // Here we get the token from backend users route which we need to store at global level via context API
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  // Here in value attribute we need to add what all we want to have global access
  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.error,
        register,
        loadUser,
        login,
        logout,
        clearError,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
