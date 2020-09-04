import React, { useEffect, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import { Link, useParams } from 'react-router-dom';
import { useInput } from 'react-hanger';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import {
	Accordion,
	AccordionHeader,
	AccordionContent,
} from '../../components/Accordion';
import { FormGroup, Label, Small, Input, FormBtn } from '../../components/Form';
import {
	Card,
	CardBody,
	CardContent,
	CardHeader,
	CardImage,
} from '../../components/Card';
import API from '../../utils/API';
import './style.css';

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
	const [user, setUser] = useState();
	const [flightDetails, setFlightDetails] = useState([]);
	const [hasEmergencyContact, setHasEmergencyContact] = useState(false);
	const airlineInput = useInput('');
	const flightNoInput = useInput('');
	const departingAirportInput = useInput('');
	const departingDateInput = useInput('');
	const departingTimeInput = useInput('');
	const departingSeatInput = useInput('');
	const arrivalAirportInput = useInput('');
	const arrivalDateInput = useInput('');
	const arrivalTimeInput = useInput('');
	const arrivalSeatInput = useInput('');

	const { id } = useParams();
	useEffect(() => {
		API.getUser()
			.then(({ data }) => setUser(`${data.firstName} ${data.lastName}`))
			.catch((err) => console.log(err));

		API.getTripById(id)
			.then((res) => {
				const {
					dates,
					location,
					tripName,
					uniqueCode,
					travelers,
					_id,
					flights,
				} = res.data;
				setTripName(tripName);
				setTripId(_id);
				setTripCode(uniqueCode);
				setTripDates({
					startDate: parseISO(dates.startDate).toString().slice(0, 15),
					endDate: parseISO(dates.endDate).toString().slice(0, 15),
				});
				setTravelers(travelers);
				setFlightDetails(flights);
				for (let i = 0; i < travelers.length; i++) {
					if (travelers[i].emergencyContact) {
						setHasEmergencyContact(true);
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

	function handleFlightSubmit(event) {
		event.preventDefault();
		let flightDetails = {
			user: user,
			airline: airlineInput.value.toUpperCase(),
			flightNo: flightNoInput.value.toUpperCase(),
			departing: {
				airport: departingAirportInput.value.toUpperCase(),
				date: departingDateInput.value,
				time: departingTimeInput.value,
				seat: departingSeatInput.value.toUpperCase(),
			},
			arriving: {
				airport: arrivalAirportInput.value.toUpperCase(),
				date: arrivalDateInput.value,
				time: arrivalTimeInput.value,
				seat: arrivalSeatInput.value.toUpperCase(),
			},
		};
		API.updateFlightDetail(tripId, flightDetails)
			.then(({ data }) => {
				setFlightDetails(data);
			})
			.catch((err) => console.log(err));
		airlineInput.setValue('');
		flightNoInput.setValue('');
		departingAirportInput.setValue('');
		departingDateInput.setValue('');
		departingSeatInput.setValue('');
		departingTimeInput.setValue('');
		arrivalAirportInput.setValue('');
		arrivalDateInput.setValue('');
		arrivalSeatInput.setValue('');
		arrivalTimeInput.setValue('');
	}

	return (
		<Container fluid classes='p-3'>
			<Row className='row mt-2 justify-content-md-center'>
				<Col size='md-8'>
					<Row className='row border border-info rounded-pill text-center p-2'>
						<Col size='3'>
							<Link to={'/'}>home</Link>
						</Col>
						<Col size='3'>
							<Link to={`/gallery/${id}`}>photo gallery</Link>
						</Col>
						<Col size='3'>
							<Link to={`/ideas/?trip=${id}`}>trip Ideas</Link>
						</Col>{' '}
						<Col size='3'>
							<Link to={`/budget/${id}`}>expenses</Link>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col size='md-8'>
					<Card>
						<CardBody>
							<CardHeader classes='bg-dark text-white' text={tripName} />
							<CardContent>{'Destination: ' + tripLocation}</CardContent>
							<CardContent>
								{tripDates.startDate + ' to ' + tripDates.endDate}
							</CardContent>
						</CardBody>
					</Card>
					<Row className='mt-3'>
						<Accordion>
							<AccordionHeader
								num='One'
								title='Add Flight Details'
								classes='bg-light text-dark'
							>
								<AccordionContent num='One'>
									<form style={{ margin: '0', maxWidth: '100%' }}>
										<FormGroup>
											<h5 className='mt-2'>Enter Your Flight Details</h5>
											<Row>
												<Col size='6'>
													<Label text='Airline' />
													<Small text='Ex: Delta' />
													<Input
														name='airlineInput'
														type='text'
														{...airlineInput.eventBind}
													/>
												</Col>
												<Col size='6'>
													<Label text='Flight Number' />
													<Small text='Ex: BA2490' />
													<Input
														name='flightNoInput'
														type='text'
														{...flightNoInput.eventBind}
													/>
												</Col>
											</Row>
											<h5 className='mt-2'>Departure Details:</h5>
											<Row>
												<Col size='md-3 6'>
													<Label text='Airport Code' />
													<Small text='Ex: MCO' />
													<Input
														name='departingAirportInput'
														type='text'
														maxLength='3'
														{...departingAirportInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Seat Assignment' />
													<Small text='Ex: 20D' />
													<Input
														name='departingSeatInput'
														type='text'
														{...departingSeatInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Time' />
													<Small text='Ex: ' />
													<Input
														name='departingTimeInput'
														type='time'
														{...departingTimeInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Date' />
													<Small text='Please choose a date' />
													<Input
														name='departingDateInput'
														type='date'
														{...departingDateInput.eventBind}
													/>
												</Col>
											</Row>
											<h5 className='mt-2'>Arrival Details:</h5>
											<Row>
												<Col size='md-3 6'>
													<Label text='Airport Code' />
													<Small text='Ex: MCO' />
													<Input
														name='arrivalAirportInput'
														type='text'
														maxLength='3'
														{...arrivalAirportInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Seat Assignment' />
													<Small text='Ex: 20D' />
													<Input
														name='arrivalSeatInput'
														type='text'
														{...arrivalSeatInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Time' />
													<Small text='Ex: ' />
													<Input
														name='arrivalTimeInput'
														type='time'
														{...arrivalTimeInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Date' />
													<Small text='Please choose a date' />
													<Input
														name='arrivalDateInput'
														type='date'
														{...arrivalDateInput.eventBind}
													/>
												</Col>
											</Row>
										</FormGroup>
										<FormBtn
											text='Add flight'
											classes='btn-danger'
											onClick={(event) => handleFlightSubmit(event)}
										/>
									</form>
								</AccordionContent>
							</AccordionHeader>
						</Accordion>
					</Row>
				</Col>
				<Col size='md-4'>
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
												{traveler.profilePic ? (
													<CardImage
														src={traveler.profilePic}
														alt={traveler.username}
														classes='img-thumbnail'
														id='thumbnailPic'
													/>
												) : (
													<i className='fas fa-suitcase px-2 '></i>
												)}
												<small className='text-monospace my-auto ml-2'>
													{traveler.firstName}
													<br /> {traveler.lastName}
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
											{travelers
												.filter((person) => person.emergencyContact)
												.map((traveler) => {
													return (
														<List key={traveler._id}>
															<ListItem>
																<span className='text-center'>
																	<strong>{`Traveler: ${traveler.firstName} ${traveler.lastName}`}</strong>
																	<br />
																	<i className='far fa-address-card fa-3x ml-4 float-left'></i>
																	<strong className='ml-4'>
																		name: {traveler.emergencyContact.name}
																	</strong>
																	<br />
																	<strong className='ml-4'>
																		number: {traveler.emergencyContact.number}
																	</strong>
																</span>
															</ListItem>
														</List>
													);
												})}
										</CardBody>
									) : (
										<CardBody classes='p-3'>
											<h6 className='font-italic text-monospace'>
												No emergency contact information is available for any
												travelers yet.{' '}
											</h6>
										</CardBody>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>
					{/* <Row>
						<Col size='md-12'>
							<Card>
								<CardBody>
									<CardHeader classes='bg-info' text='Expenses' />
									<CardContent>{`Destination: ${tripLocation}`}</CardContent>
								</CardBody>
							</Card>
						</Col>
					</Row> */}
					{flightDetails.length > 0 ? (
						<Row>
							<Col size='md-12'>
								<Card>
									<CardBody>
										<CardHeader classes='bg-info' text='Flight Details' />
										<CardBody
											classes='overflow-auto'
											style={{ height: '320px' }}
										>
											{flightDetails.map((flight) => {
												return (
													<CardBody
														classes='rounded p-2 border-bottom'
														key={flight._id}
													>
														<Row>
															<Col size='5'>
																<Small text='Passenger Name' />
																<strong className='ml-2'>{flight.user}</strong>
															</Col>
															<Col size='7'>
																<Small text='Flight Number' />
																<strong className='ml-2'>
																	{flight.flightNo}
																</strong>
															</Col>
														</Row>
														<Row>
															<h6 className='text-bold mb-0 mt-2 ml-3'>
																Departing:
															</h6>
														</Row>
														<Row>
															<Col size='3'>
																<Small text='From' />
																<strong className='ml-2 mb-0'>
																	{flight.departing.airport}
																</strong>
															</Col>
															<Col size='3'>
																<Small text='Date' />
																<strong className='ml-2 mb-0'>{`${flight.departing.date.substring(
																	5,
																	10
																)}-${flight.departing.date.substring(
																	0,
																	2
																)}`}</strong>
															</Col>
															<Col size='3'>
																<Small text='Time' />
																<strong className='ml-2 mb-0'>
																	{flight.departing.time}
																</strong>
															</Col>
															<Col size='3'>
																<Small text='Seat' />
																<strong className='ml-2 mb-0'>
																	{flight.departing.seat}
																</strong>
															</Col>
														</Row>
														<Row>
															<h6 className='text-bold mb-0 mt-2 ml-3'>
																Arriving:
															</h6>
														</Row>
														<Row>
															<Col size='3'>
																<Small text='To' />
																<strong className='ml-2 mb-0'>
																	{flight.arriving.airport}
																</strong>
															</Col>
															<Col size='3'>
																<Small text='Date' />
																<strong className='ml-2 mb-0'>{`${flight.arriving.date.substring(
																	5,
																	10
																)}-${flight.arriving.date.substring(
																	0,
																	2
																)}`}</strong>
															</Col>
															<Col size='3'>
																<Small text='Time' />
																<strong className='ml-2 mb-0'>
																	{flight.arriving.time}
																</strong>
															</Col>
															<Col size='3'>
																<Small text='Seat' />
																<strong className='ml-2 mb-0'>
																	{flight.arriving.seat}
																</strong>
															</Col>
														</Row>
													</CardBody>
												);
											})}
										</CardBody>
									</CardBody>
								</Card>
							</Col>
						</Row>
					) : (
						''
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default TripOverview;
