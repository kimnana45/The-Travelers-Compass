import React, { useEffect, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Accordion, AccordionHeader, AccordionContent } from '../components/Accordion';
import { Card, CardBody, CardContent, CardHeader } from '../components/Card';
import API from '../utils/API';

function TripOverview() {
	const [tripName, setTripName] = useState();
	const [tripId, setTripId] = useState();
	const [tripCode, setTripCode] = useState();
	const [tripLocation, setTripLocation] = useState();
	const [tripDates, setTripDates] = useState({
		startDate: '',
		endDate: '',
	});
	const [travelers, setTravelers] = useState([]);
	const [hasEmergencyContact, setHasEmergencyContact] = useState(false);

	const { id } = useParams();
	useEffect(() => {
		API.getTripById(id)
			.then((res) => {
				const { dates, location, tripName, uniqueCode, travelers, _id } = res.data;
				setTripName(tripName);
				setTripId(_id);
				setTripCode(uniqueCode);
				setTripDates({
					startDate: parseISO(dates.startDate).toString().slice(0, 15),
					endDate: parseISO(dates.endDate).toString().slice(0, 15),
				});
				setTravelers(travelers);
				for (let i = 0; i < travelers.length; i++) {
					if (travelers[i].emergencyContact) {
						setHasEmergencyContact(true)
					}
				}
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
						<Col size='3'>
							<Link to={`/ideas/?trip=${tripId}`}>Trip Ideas</Link>
						</Col>{' '}
						<Col size='3'>
							<Link to={'/budget'}>Budget & Expenses</Link>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col size='md-8'>
					<Card>
						<CardBody>
							<CardHeader classes='bg-danger' text={tripName} />
							<CardContent>{'Destination: ' + tripLocation}</CardContent>
							<CardContent>
								{tripDates.startDate + ' to ' + tripDates.endDate}
							</CardContent>
						</CardBody>
					</Card>
				</Col>
				<Col size='md-4'>
					<Row className='mt-3'>
						<Col size='md-12'>
								<Accordion>
									<AccordionHeader 
										title='Reveal Unique Code For This Trip'
										text='Share this code with fellow travelers to allow them access to your itinerary.'>
										<AccordionContent>
											<p className='text-center text-monospace text-muted'>
												{tripCode}
											</p>
										</AccordionContent>
									</AccordionHeader>
								</Accordion>
						</Col>
					</Row>
					{travelers.length > 1 ? (
						<Row>
							<Col size='md-12'>
								<Card>
									<CardBody>
										<CardHeader classes='bg-primary' text='Travelers' />
										{travelers.map((traveler) => (
											<span
												className='card-body d-inline-flex'
												key={traveler._id}
											>
												<i className='fas fa-suitcase px-2 '></i>
												<small className='text-monospace'>
													{traveler.firstName} {traveler.lastName}
												</small>
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
									{hasEmergencyContact ? (
										<CardBody>
											{travelers.filter(person => person.emergencyContact).map(traveler => {
												return (
												<List key={traveler._id}>
													<ListItem >
													<span className='text-center' >
														<strong>{`Traveler: ${traveler.firstName} ${traveler.lastName}`}</strong><br/>
														<i className="far fa-address-card fa-3x ml-4 float-left"></i>
														<strong className='ml-4'>name: {traveler.emergencyContact.name}</strong><br/>
														<strong className='ml-4'>number: {traveler.emergencyContact.number}</strong>
													</span>
													</ListItem>
												</List>)
											})}
										</CardBody>
									) : (
										<CardBody classes="p-3">
											<h6 className="font-italic text-monospace">No emergency contact information is available yet. <br/>
											If you would like yours listed, please set up yours on the home page.</h6>
										</CardBody>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col size='md-12'>
							<Card>
								<CardBody>
									<CardHeader classes='bg-info' text='Expenses' />
									<CardContent>{`Destination: ${tripLocation}`}</CardContent>
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
