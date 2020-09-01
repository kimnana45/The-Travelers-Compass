import React, { useContext } from "react";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { numberWithCommas } from "../../utils/format";
import { FormBtn } from "../Form";
import { List, ListItem } from "../List";

export const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(BudgetGlobalContext);

    const sign = transaction.amount < 0 ? "-" : "+";

    return (
        <List className={transaction.amount < 0 ? 'minus' : 'plus'}>
            <ListItem>
                {transaction.text}
                <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
                <FormBtn 
                    onClick={() => deleteTransaction(transaction._id)} 
                    text="x"
                />
            </ListItem>
        </List>
    )
}