import React, { useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { FormGroup, FormBtn } from "../Form";

export const AddTransaction = () => {
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState(0);
    const { addTransaction } = useContext(BudgetGlobalContext);
    const { id } = useParams();

    const handleSubmit = e => {
        e.preventDefault();
        const newTransaction = {
            reason: reason,
            amount: amount
        }
        addTransaction(id, newTransaction);
        setReason('');
        setAmount('');
    }

    return (
        <div>
            <h2 id="subHeaderWord">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="px-5">
                <FormGroup>
                <label htmlFor="text">Expense Description</label>
                    <input
                        name="reason"
                        type="text"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Ex: Excursion tickets"
                    />
                </FormGroup>
                <FormGroup>
                <label htmlFor="Transaction Amount">Total Amount <br />
                    (Use negative - for expense, positive + budget)
                    </label>
                    <input
                        name="amount"
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Ex: -400.00"
                    />
                </FormGroup>
                <FormBtn classes='btn-dark' text="Add Transaction" />
            </form>
        </div>
    )
}