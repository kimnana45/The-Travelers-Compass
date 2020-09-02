import React, { useContext, useEffect } from "react";
import { Transaction } from "../Transaction";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(BudgetGlobalContext);

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (<Transaction
                    key={transaction._id}
                    transaction={transaction}
                />))}
            </ul>
        </>
    )
}