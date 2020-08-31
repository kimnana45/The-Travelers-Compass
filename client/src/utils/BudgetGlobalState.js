import React, { createContext, useReducer, useContext } from "react";


const initialState = {
    transactions: [],
    error: null,
    loading: true
}

export const BudgetGlobalContext = createContext(initialState);
export const BudgetGlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer();

    //Actions
  
}