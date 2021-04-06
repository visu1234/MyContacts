import React, { useContext, useReducer } from "react";
//import uuid from "uuid";
import { v4 as uuidv4 } from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        type: "personal",
        id: 1,
        name: "vivek",
        email: "vivektest@gmail.com",
        phone: "70145682194",
      },
      {
        type: "professional",
        id: 2,
        name: "Avi",
        email: "avitest@gmail.com",
        phone: "7016821956",
      },
      {
        type: "professional",
        id: 3,
        name: "shakil",
        email: "shakiltest@gmail.com",
        phone: "7018732194",
      },
    ],
    current: null,
    filtered: null, // array of contacts matching with current filter
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  // Add contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set Current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  // Filter contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  // Here in value attribute we need to add what all we want to have global access
  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
