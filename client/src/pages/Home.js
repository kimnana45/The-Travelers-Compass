import React from "react";
import { FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import mountains from "../assets/mtn_banner.png";

function Home({ logout }) {
  return (
    <Container fluid>
      <Row>
        <img src={mountains} className="mt-2" alt="mountains-banner" />
        <Col size="md-12">
          <Jumbotron>
            <h4 className="bigWord">where to next?</h4>
            <h4 className="text-info">start planning your next vacation!</h4>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
