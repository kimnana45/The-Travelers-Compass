import React, { useContext } from "react";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { numberWithCommas } from "../../utils/format";

export const BudgetExpenses = () => {
    const { transactions } = useContext(BudgetGlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const budget = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    return (
        <div className="bud-exp-container">
            <div>
                <h4>Budget</h4>
                <p className="money plus">${numberWithCommas(budget)}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">${numberWithCommas(expense)}</p>
            </div>
        </div>
    )
}