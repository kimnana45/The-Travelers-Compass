import React, { useContext } from "react";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { numberWithCommas } from "../../utils/format";
import { FormBtn } from "../Form";

export const Transaction = ({ tripId, transaction }) => {
    const { deleteTransaction } = useContext(BudgetGlobalContext);

    const sign = transaction.amount < 0 ? "-" : "+";

    return (
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}> 
                {transaction.reason} 
                <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
                <FormBtn onClick={() => deleteTransaction(tripId, transaction._id)} className="delete-btn" text="x" style={{width: "auto"}}/>
        </li>
    )
}