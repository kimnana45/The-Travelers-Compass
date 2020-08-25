import React from 'react';
import { Col, Row, Container } from '../../components/Grid';
import { Card, CardBody, CardContent } from '../../components/Card';
import './style.css';
// import Jumbotron from "../components/Jumbotron";

function MembersDashboard() {
	return (
		<Container>
			<Row className='row mt-2 justify-content-md-center'>
				<Col size='md-8'>
					<Row className='row border border-info rounded-pill text-center p-2'>
						<Col size='4'>
							<a href='/'>
								home
							</a>
						</Col>
						<Col size='4'>
							<a href='/'>
								members dashboard
							</a>
						</Col>
						<Col size='4'>
							<a href='/newtrip'>
								plan new trip
							</a>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col size='md-12'>
					<Card>
						<CardBody>
							<CardContent  
								text="hello"
							/>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default MembersDashboard;
