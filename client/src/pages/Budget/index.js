import React from "react";
import { Balance } from "../../components/Balance";
import { BudgetExpenses } from "../../components/Budget&Expenses";
import { TransactionList } from "../../components/TransactionList";
import { AddTransaction } from "../../components/AddTransaction";
import { BudgetGlobalProvider } from "../../utils/BudgetGlobalState";
import { Container, Row, Col } from "../../components/Grid";
import "./style.css";

function Budget() {
    return (
        <BudgetGlobalProvider>
            <Container className="budget-container">
                <Row>
                    <Col size="md-12">
                    <h1>Budget For The Trip</h1>
                    </Col>
                </Row>
            <Row>
                <Col size="md-4">
                    <Balance />
                    <BudgetExpenses />
                </Col>
                <Col size="md-4">
                    <TransactionList />
                </Col>
                <Col size="md-4">
                    <AddTransaction />
                </Col>
            </Row>
            </Container>
        </BudgetGlobalProvider>
    )
}

export default Budget; 