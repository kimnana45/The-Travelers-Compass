import React, { Component } from 'react';
import { Col, Row, Container } from '../components/Grid';
import { Card, CardBody, CardContent } from '../../components/Card';

class TripOverview extends Component {
	state = {
		trip: {},
	};

	// componentDidMount
		// do API call to get trip info from DB from the join trip form
		// render info about that trip to the page

	render() {
		return (
			<Container>
				<Row className='row mt-2 justify-content-md-center'>
					<Col size='md-8'>
						<Row className='row border border-info rounded-pill text-center p-2'>
							<Col size='4'>
								<a href='/'>home</a>
							</Col>
							<Col size='4'>
								<a href='/'>members dashboard</a>
							</Col>
							<Col size='4'>
								<a href='/newtrip'>plan new trip</a>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col size='md-8'>
						<Card>
							<CardBody>
								<CardContent text='hello' />
							</CardBody>
						</Card>
					</Col>
					<Col size='md-4'>
						<Card>
							<CardBody>
								<CardContent text='hello' />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default TripOverview;
