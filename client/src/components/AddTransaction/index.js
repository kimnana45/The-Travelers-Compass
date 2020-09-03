import React, { useState, useContext } from "react";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { FormGroup } from "../Form";

export const AddTransaction = () => {
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState(0);

    const { addTransaction } = useContext(BudgetGlobalContext);

    const handleSubmit = e => {
        e.preventDefault();
        const newTransaction = {
            reason,
            amount: +amount
        }
        addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Add New Transaction</h3>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                <label htmlFor="text">State the reason for this transaction</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Your reason here"
                    />
                </FormGroup>
                {/* <div className="form-control">
                    <label htmlFor="text">State the reason for this transaction</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Your reason here"
                    />
                </div> */}
                <FormGroup>
                <label htmlFor="Transaction Amount">Transaction Amount <br />
                    (Use negative - for expense, positive + budget)
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Enter amount here"
                    />
                </FormGroup>
                <button className="Budgetbtn">Add Transaction</button>
            </form>
        </>
    )
}