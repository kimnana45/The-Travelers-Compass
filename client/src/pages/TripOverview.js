import React, { useEffect, useState } from 'react';
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
				setTripLocation(location);
				setTripDates({
					startDate: dates.startDate,
					endDate: dates.endDate,
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
							<CardHeader 
								classes='bg-danger'
								text={tripName}
							/>
							<CardContent 
								text={'Destination: ' + tripLocation} 
							/>
							<CardContent 
								text={tripDates.startDate + ' to ' + tripDates.endDate} 
							/>
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

export default TripOverview;
