import React from "react";
import { Balance } from "../components/Balance";
import { BudgetExpenses } from "../components/Budget&Expenses";
import { TransactionList } from "../components/TransactionList";
import { AddTransaction } from "../components/AddTransaction";
import { BudgetGlobalProvider } from "../utils/BudgetGlobalState";
import { Container } from "../components/Grid";

function Budget() {
    <BudgetGlobalProvider>
        <Container>
            <h2>Budget For The Trip</h2>
            <Balance />
            <BudgetExpenses />
            <TransactionList />
            <AddTransaction />
        </Container>
    </BudgetGlobalProvider>
}

export default Budget; 