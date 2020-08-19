import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

function MembersDashboard() {
  return (
    <Container fluid>
      <Row className="row mt-2 justify-content-md-center"> 
        <Col size="md-6">
          <Row className="row border border-info rounded-pill text-center p-2">
            <Col size="4">
              <a href="/"><small>HOME</small></a>
            </Col>
            <Col size="4">
            <a href="/"><small>MEMBERS DASHBOARD</small></a>
            </Col>      
            <Col size="4">
            <a href="/newtrip"><small>PLAN NEW TRIP</small></a>
            </Col>                   
          </Row>
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <Row>
            <h4>past trips:</h4>
          </Row>
          <Row className="p-1">
            <div className="shadow p-3 mb-5 bg-white rounded">
              *add tile*
            </div>
          </Row>
        </Col>
        <Col size="md-6">
          <Row>
            <h4>upcoming trips:</h4>
          </Row>
          <Row className="p-1">
          <div className="shadow p-3 mb-5 bg-white rounded">
              *add tile*
            </div>
          </Row>
        </Col>    
      </Row>
    </Container>
  );
}

export default MembersDashboard;