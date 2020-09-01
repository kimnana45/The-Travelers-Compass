import React, { useContext, useEffect } from "react";
import { Transaction } from "../Transaction";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { List } from "../List";

export const TransactionList = () => {
    const { transactions, getTransactions} = useContext(BudgetGlobalContext);

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <>
        <h3>History</h3>
        <List>
            {transactions.map(transaction => (<Transaction
            key={transaction._id}
            transaction={transaction}
            />))}
        </List>
        </>
    )
}