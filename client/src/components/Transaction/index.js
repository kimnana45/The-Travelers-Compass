import React, { useContext } from "react";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { numberWithCommas } from "../../utils/format";

export const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(BudgetGlobalContext);

    const sign = transaction.amount < 0 ? "-" : "+";

    return (
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}> 
                {transaction.text}
                <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
                <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
        </li>
    )
}