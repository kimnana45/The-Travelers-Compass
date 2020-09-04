import React, { createContext, useReducer } from "react";
import { ADD_TRANSACTION, REMOVE_TRANSACTION, GET_TRANSACTIONS, TRANSACTION_ERROR } from "./actions";
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload,
                loading: false
            }
        case REMOVE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case TRANSACTION_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

export const BudgetGlobalContext = createContext(initialState);
export const BudgetGlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //Actions
    async function getTransactions(id) {
        try {
            const { data } = await axios.get(`/api/trip/${id}`);
            dispatch({
                type: GET_TRANSACTIONS,
                payload: data.expenses
            });
        } catch (err) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: err.response.data.error
            });
        }
    }

    async function deleteTransaction(tripId, transactionId) {
        try {
            await axios.put(`/api/trip/${tripId}/transaction/${transactionId}`);
            dispatch({
                type: REMOVE_TRANSACTION,
                payload: transactionId
            });
        } catch (err) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(id, transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.put(`/api/trip/${id}/transaction`, transaction, config);
            dispatch({
                type: ADD_TRANSACTION,
                payload: data
            });
        } catch (err) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: err.response.data.error
            })
        }
    }

    return (<BudgetGlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}
    >
        {children}
    </BudgetGlobalContext.Provider>)
}