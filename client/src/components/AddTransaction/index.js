import React, { useState, useContext } from "react";
import { BudgetGlobalContext } from "../../utils/BudgetGlobalState";
import { FormGroup, Label, Input, FormBtn } from "../Form";
import { Container, Row, Col } from "../Grid";

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
            <Container>
                <h3>Add New Transaction</h3>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label text="State the reason for this transaction" />
                                <Input
                                    name="reason"
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                    placeholder="Your reason here"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label text="Transaction Amount" />
                                <Input
                                    name="amount"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    placeholder="Enter amount here"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormBtn
                        classes='btn-primary'
                        type='submit'
                        text="Add Transaction"
                    />
                </form>
            </Container>
        </>
    )
}