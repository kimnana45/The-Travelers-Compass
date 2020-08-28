import React, { useEffect, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { Card, CardBody, CardContent, CardHeader } from '../components/Card';
import API from '../utils/API';

function TripOverview() {
	const [tripName, setTripName] = useState();
	const [tripLocation, setTripLocation] = useState();
	const [tripDates, setTripDates] = useState({
		startDate: '',
		endDate: '',
	});

	const { id } = useParams();
	useEffect(() => {
		API.getTripInfo(id)
			.then((res) => {
				const { dates, location, tripName } = res.data;
				setTripName(tripName);
				setTripLocation(`${location[0].name}, ${location[0].administrative}`);
				setTripDates({
					startDate: ((parseISO(dates.startDate)).toString().slice(0,15)),
					endDate: ((parseISO(dates.endDate)).toString().slice(0,15)),
				});
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Container>
			<Row className='row mt-2 justify-content-md-center'>
				<Col size='md-8'>
					<Row className='row border border-info rounded-pill text-center p-2'>
						<Col size='3'>
							<Link to={'/'}>home</Link>
						</Col>
						<Col size='3'>
							<Link to={'/newtrip'}>plan new trip</Link>
						</Col>
						<Col size='3'>
							<Link to={`/gallery/${id}`}>photo gallery</Link>
						</Col>
						{/* <Col size='3'>
							<Link to={'/uploadphoto'}>add new photos</Link>
						</Col> */}
					</Row>
				</Col>
			</Row>
			<Row>
				<Col size='md-8'>
					<Card>
						<CardBody>
							<CardHeader classes='bg-danger' text={tripName} />
							<CardContent text={'Destination: ' + tripLocation} />
							<CardContent
								text={tripDates.startDate + ' to ' + tripDates.endDate}
							/>
						</CardBody>
					</Card>
				</Col>
				<Col size='md-4'>
					<Row>
						<Col size='md-12'>
							<Card>
								<CardBody>
									<CardHeader classes='bg-primary' text='Travelers' />
									<CardContent text={'Destination: ' + tripLocation} />
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col size='md-12'>
							<Card>
								<CardBody>
									<CardHeader classes='bg-warning' text='Emergency Contacts' />
									<CardContent text={'Destination: ' + tripLocation} />
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col size='md-12'>
							<Card>
								<CardBody>
									<CardHeader classes='bg-info' text='Expenses' />
									<CardContent text={'Destination: ' + tripLocation} />
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default TripOverview;
