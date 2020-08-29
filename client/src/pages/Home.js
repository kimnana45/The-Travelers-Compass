import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import headerIMG from "../assets/header.png";

function Home() {
  return (
    <Container fluid>
      <Jumbotron>
        <Row>
          <Col size='md-8 d-none d-sm-block'>
            <img src={headerIMG} className='img-fluid' />
          </Col>
          <Col size='md-4'>
            <h1 className='bigWordName mt-4'>start planning your next vacation!</h1>
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  );
}

export default Home;