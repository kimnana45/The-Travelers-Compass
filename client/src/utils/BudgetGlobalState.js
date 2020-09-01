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
    async function getTransactions() {
        try {
            const res = await axios.get('/api/transactions');
            dispatch({
                type: GET_TRANSACTIONS,
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: err.response.data.error
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/transactions/${id}`);
            dispatch({
                type: REMOVE_TRANSACTION,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/transactions/', transaction, config);
            dispatch({
                type: ADD_TRANSACTION,
                payload: res.data.data
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