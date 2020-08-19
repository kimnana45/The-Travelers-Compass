import React from "react";
import { Col, Row, Container } from "../components/Grid";
import mountains from "../assets/mtn_banner.png";

function Home() {
  return (
    <Container fluid>
      <Row>
        <img src={mountains} className="mt-2" alt="mountains-banner" />
        <Col size="md-12">
            <h4 className="bigWord">where to next?</h4>
            <h4 className="text-info">start planning your next vacation!</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
