import React, { useEffect, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { Accordion, AccordionContent } from '../components/Accordion';
import { Card, CardBody, CardContent, CardHeader } from '../components/Card';
import API from '../utils/API';

function TripOverview() {
	const [tripName, setTripName] = useState();
	const [tripCode, setTripCode] = useState();
	const [tripLocation, setTripLocation] = useState();
	const [tripDates, setTripDates] = useState({
		startDate: '',
		endDate: '',
	});
	const [travelers, setTravelers] = useState([]);

	const { id } = useParams();
	useEffect(() => {
		API.getTripById(id)
			.then((res) => {
				console.log(res.data);
				const { dates, location, tripName, uniqueCode, users } = res.data;
				setTripName(tripName);
				setTripCode(uniqueCode);
				setTripDates({
					startDate: parseISO(dates.startDate).toString().slice(0, 15),
					endDate: parseISO(dates.endDate).toString().slice(0, 15),
				});
				setTravelers(users);
				if (!location[0].administrative) {
					setTripLocation(`${location[0].name}, ${location[0].country}`);
				} else {
					setTripLocation(`${location[0].name}, ${location[0].administrative}`);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Container>
			<Row className='row mt-2 justify-content-md-center'>
				<Col size='md-8'>
					<Row className='row border border-info rounded-pill text-center p-2'>
						<Col size='3'>
							<Link to={`/gallery/${id}`}>photo gallery</Link>
						</Col>
						<Col size='3'>
							<Link to={'/uploadphoto'}>add new photos</Link>
						</Col>
						<Col size='3'>{/* <Link to={'/'}>home</Link> */}</Col>
						<Col size='3'>
							{/* <Link to={'/newtrip'}>plan new trip</Link> */}
						</Col>
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
					<Row className='mt-3'>
						<Col size='md-12'>
							<Accordion
								title='Reveal Unique Code For This Trip'
								text='Share this code with fellow travelers to allow them access to your itinerary.'
							>
								<AccordionContent>
									<p className='text-center text-monospace text-muted'>
										{tripCode}
									</p>
								</AccordionContent>
							</Accordion>
						</Col>
					</Row>
					{travelers.length > 1 ? (
						<Row>
							<Col size='md-12'>
								<Card>
									<CardBody>
										<CardHeader classes='bg-primary' text='Travelers' />
												{travelers.map(traveler => (
													<span 
														className="card-body d-inline-flex" 
														key={traveler._id}
													>
														<i className="fas fa-suitcase px-2 "></i>
														<small className="text-monospace">{traveler.firstName} {traveler.lastName}</small>
													</span>
												))}
									</CardBody>
								</Card>
							</Col>
						</Row>
					) : (
						<span></span>
					)}
					<Row>
						<Col size='md-12'>
							<Card>
								<CardBody>
									<CardHeader classes='bg-warning' text='Emergency Contacts' />
									<CardContent>
										{`Travelers: ${travelers.length}`}
									</CardContent> 
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col size='md-12'>
							<Card>
								<CardBody>
									<CardHeader classes='bg-info' text='Expenses' />
									<CardContent>
										{`Destination: ${tripLocation}`}
									</CardContent>
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
