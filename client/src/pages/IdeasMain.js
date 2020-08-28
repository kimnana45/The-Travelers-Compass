import React from "react";
import { Col, Row, Container } from "../components/Grid";
import CreateIdeaForm from "../components/CreateIdeaForm";
import IdeasList from "../components/IdeasList";

const IdeasMain = () => {
    return (
    <Container>
        <Row>
            <Col size="md-6">
                <CreateIdeaForm />
            </Col>
            <Col size="md-6">
                <IdeasList />
            </Col>
        </Row>
    </Container>
    )
}

export default IdeasMain;