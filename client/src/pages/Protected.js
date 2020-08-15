import React from "react";
import { FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

function Protected({logout}) {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Welcome to the Protected Page</h1>
            <FormBtn
              text="Logout"
              onClick={logout}
              classes="btn-primary logoutBtn"
            />
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Protected;
