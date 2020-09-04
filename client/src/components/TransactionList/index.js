import React, { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Transaction } from "../Transaction";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(BudgetGlobalContext);
    const { id } = useParams();

    useEffect(() => {
        getExpenseInfo(id)
        console.log(id)
    }, []);

    function getExpenseInfo(id) {
        getTransactions(id);
    }

    return (
        <div>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction
                        key={transaction._id}
                        transaction={transaction}
                        tripId={id}
                    />
                ))}
            </ul>
        </div>
    )
}