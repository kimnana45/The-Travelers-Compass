import React, { useContext } from "react";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { numberWithCommas } from "../../utils/format";
import DeleteBtn from "../DeleteBtn";
import { List, ListItem } from "../List";

export const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(BudgetGlobalContext);

    const sign = transaction.amount < 0 ? "-" : "+";

    return (
        <List className={transaction.amount < 0 ? 'minus' : 'plus'}>
            <ListItem>
                {transaction.text}
                <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
                <DeleteBtn onClick={() => deleteTransaction(transaction._id)} />
            </ListItem>
        </List>
    )
}