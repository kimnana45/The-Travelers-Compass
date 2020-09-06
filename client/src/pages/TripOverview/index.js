import React, { useEffect, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import { Link, useParams } from 'react-router-dom';
import { useInput } from 'react-hanger';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Accordion, AccordionHeader, AccordionContent } from '../../components/Accordion';
import { FormGroup, Label, Small, Input, FormBtn } from '../../components/Form';
import { CardBody, CardHeader, CardImage } from '../../components/Card';
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
	const [lodgingDetails, setLodgingDetails] = useState([]);
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
	const hotelInput = useInput('');
	const addressInput = useInput('');
	const roomNumberInput = useInput('');
	const checkInDateInput = useInput('');
	const checkOutDateInput = useInput('');
	const wifiNameInput = useInput('');
	const wifiPwInput = useInput('');  

	const { id } = useParams();
	useEffect(() => {
		API.getUser()
			.then(({ data }) => setUser(`${data.firstName} ${data.lastName}`))
			.catch((err) => console.log(err));

		API.getTripById(id)
			.then(res => {
				const { dates, location, tripName, uniqueCode, travelers, _id, lodging, flights,
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
				setLodgingDetails(lodging);
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
		API.addFlightDetail(tripId, flightDetails)
			.then(({ data }) => setFlightDetails(data))
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

	function handleLodgingSubmit(event) {
		event.preventDefault();
		let lodging = {
			service: hotelInput.value,
			address: addressInput.value,
			hotelNum: roomNumberInput.value,
			wifiInfo: {
				name: wifiNameInput.value,
				password: wifiPwInput.value
			},
			checkIn: checkInDateInput.value,
			checkOut: checkOutDateInput.value
		};
		API.addLodgingDetail(tripId, lodging)
			.then(({ data }) => setLodgingDetails(data))
			.catch((err) => console.log(err));
		hotelInput.setValue('');
		addressInput.setValue('');
		roomNumberInput.setValue('');
		wifiNameInput.setValue('');
		wifiPwInput.setValue('');
		checkInDateInput.setValue('');
		checkOutDateInput.setValue('');
	}

	function removeLodging(id) {
		API.removeLodgingDetail(id, tripId)
			.then(({ data }) => setLodgingDetails(data.lodging))
			.catch((err) => console.log(err));
	};

	return (
		<Container fluid classes='p-2'>
			<Row>
				<Col size='md-8'>
					<div classes="justify-content-center" id="postcard">
						<Row classes="p-4">
							<Col size="md-5">
								<CardImage src="https://source.unsplash.com/1600x900/?outdoor" alt="randomPhoto" classes="mt-3 rounded mx-auto d-block img-thumbnail" style={{width: "300px", height: "370px"}}/>
							</Col>
							<Col size="md-1">
							<CardImage src="https://theblondeabroad.com/wp-content/themes/tba/images/postcard-divider@2x.png" alt="randomPhoto" classes="d-none d-lg-block" style={{height: "400px"}}/>
							</Col>
							<Col size="md-6">
								<CardImage src="https://theblondeabroad.com/wp-content/themes/tba/images/about-stamp-waves@2x.png" classes="float-right d-none d-lg-block mb-3" style={{width: "120px", height: "80px"}}/><br/>
								<h1 id="tripFont">{tripName}</h1>
								<h3 id="tripFont"  style={{fontSize: "22px"}}>  </h3>
								<Row>
									<Col size="6">
										<h5 id="tripFont" className="text-right">on the way to...</h5>
									</Col>
									<Col size="6">
									<h5 id="tripFont">{tripLocation}</h5>
									</Col>
								</Row>
								<Row classes="justify-content-center">
									<h5 id="tripFont">{`from ${tripDates.startDate} to ${tripDates.endDate}`}</h5>
								</Row>
								<Row classes="mt-5">
									<Col size='md-2 6'>
										<Link to={'/'}><h5 id="tripFont">home</h5></Link>
									</Col>
									<Col size='md-4 6'>
										<Link to={`/gallery/${id}`}><h5 id="tripFont">photo gallery</h5></Link>
									</Col>
									<Col size='md-3 6'>
										<Link to={`/ideas/?trip=${id}`}><h5 id="tripFont">todo list</h5></Link>
									</Col>
									<Col size='md-3 6'>
										<Link to={`/budget/${id}`}><h5 id="tripFont">expenses</h5></Link>
									</Col>
								</Row>
							</Col>
						</Row>
					</div>
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
							<AccordionHeader
								num='Two'
								title='Add Lodging Details'
								classes='bg-light text-dark'
							>
								<AccordionContent num='Two'>
									<form style={{ margin: '0', maxWidth: '100%' }}>
										<FormGroup>
											<h5 className='mt-2'>Enter Accommodation Details</h5>
											<Row>
												<Col size='md-3 6'>
													<Label text='Name of accommodation' />
													<Small text='Ex: Marriott / Airbnb' />
													<Input
														name='hotelInput'
														type='text'
														{...hotelInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Room #' />
													<Small text='(if applicable)' />
													<Input
														name='roomNumberInput'
														type='text'
														{...roomNumberInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Wifi Name' />
													<Small text='(optional)' />
													<Input
														name='wifiNameInput'
														type='text'
														{...wifiNameInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Wifi Password' />
													<Small text='(optional)' />
													<Input
														name='wifiPwInput'
														type='text'
														{...wifiPwInput.eventBind}
													/>
												</Col>
											</Row>
											<Row>
												<Col size='md-6'>
													<Label text='Address' />
													<Small text='Ex: 12938 streetnamehere blvd, orlando, FL 32839' />
													<Input
														name='addressInput'
														type='text'
														{...addressInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Check-in Date' />
													<Input
														name='checkInDateInput'
														type='date'
														{...checkInDateInput.eventBind}
													/>
												</Col>
												<Col size='md-3 6'>
													<Label text='Check-out Date' />
													<Input
														name='checkOutDateInput'
														type='date'
														{...checkOutDateInput.eventBind}
													/>
												</Col>

											</Row>
										</FormGroup>
										<FormBtn
											text='Add Lodging'
											classes='btn-danger'
											onClick={(event) => handleLodgingSubmit(event)}
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
								<CardBody>
									<CardHeader text='Travelers' id="headerDiv" />
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
											<h6 className='text-monospace my-auto ml-2'>
												{traveler.firstName}
												<br /> {traveler.lastName}
											</h6>
										</span>
									))}
								</CardBody>
							</Col>
						</Row>
					) : (
						<span></span>
					)}
					<Row>
						<Col size='md-12'>
							<CardBody>
								<CardHeader text='Emergency Contacts' id="headerDiv"/>
								{hasEmergencyContact ? (
									<CardBody classes='overflow-auto'>
										{travelers
											.filter((person) => person.emergencyContact)
											.map((traveler) => {
												return (
													<List key={traveler._id}>
														<ListItem>
															<span>
																<Small className="text-monospace" text={`Traveler: ${traveler.firstName} ${traveler.lastName}`} />
																<i className='far fa-address-card fa-3x ml-2 mr-2 float-left'></i>
																<Small className="text-monospace" text={`name: ${traveler.emergencyContact.name}`} />
																<Small className="text-monospace" text={`number: ${traveler.emergencyContact.number}`} />
															</span>
														</ListItem>
													</List>
												);
											})}
									</CardBody>
								) : (
									<CardBody classes='p-3 bg-white'>
										<h6 className='font-italic text-monospace'>
											No emergency contact information is available
										</h6>
									</CardBody>
								)}
							</CardBody>
						</Col>
					</Row>
					<Row>
						<Col size='md-12'>
							<CardBody>
								<CardHeader text='Accommodations' id="headerDiv"/>
								{lodgingDetails.length > 0 ? (
										<CardBody classes='overflow-auto' style={{height: 'auto'}}>
										{lodgingDetails.map(lodging => {
												return (
													<List key={lodging._id}>
														<ListItem>
															<Row>
																<Col size="4">
																	<Small text="lodging" />
																</Col>
																<Col size="8">
																	<Small text={lodging.service} classes="text-right text-monospace" />
																</Col>
															</Row>
															<Row>
																<Col size="4">
																	<Small text="address" />
																</Col>
																<Col size="8">
																	<Small text={lodging.address} classes="text-right text-monospace" />
																</Col>
															</Row>
															{lodging.hotelNum && (
															<Row>
																<Col size="4">
																	<Small text="hotel #" />
																</Col>
																<Col size="8">
																	<Small text={lodging.hotelNum} classes="text-right text-monospace" />
																</Col>
															</Row>
															)}
															<Row>
																<Col size="4">
																	<Small text="check-in" />
																</Col>
																<Col size="8">
																	<Small text={`${lodging.checkIn.substring(5,10)}-${lodging.checkIn.substring(0,2)}`} classes="text-right text-monospace" />
																</Col>
															</Row>
															<Row>
																<Col size="4">
																	<Small text="check-out" />	
																</Col>
																<Col size="8">
																	<Small text={`${lodging.checkOut.substring(5,10)}-${lodging.checkOut.substring(0,2)}`} classes="text-right text-monospace" />
																</Col>
															</Row>
															{lodging.wifiInfo.name && (
															<Row>
																<Col size="4">
																	<Small text="wifi" />
																</Col>
																<Col size="8">
																	<Small text={lodging.wifiInfo.name} classes="text-right text-monospace" />
																</Col>
															</Row>
															)}
															{lodging.wifiInfo.password && (
															<Row>
																<Col size="4">
																	<Small text="wifi pw" />
																</Col>
																<Col size="8">
																	<Small text={lodging.wifiInfo.password} classes="text-right text-monospace" />
																</Col>
															</Row>
															)}
															<Row classes="justify-content-end">
																<FormBtn 
																	classes="btn-sm mx-1 btn-outline-danger" 
																	onClick={() => removeLodging(lodging._id)} 
																	text="delete"
																	style={{width: "60px"}}
																/>
															</Row>
														</ListItem>
													</List>
												);
											})}
									</CardBody>
								) : (
									<CardBody classes='p-3 bg-white'>
										<h6 className='font-italic text-monospace'>
											No lodging information is available
										</h6>
									</CardBody>
								)}
							</CardBody>
						</Col>
					</Row>
					{flightDetails.length > 0 ? (
						<Row>
							<Col size='md-12'>
								<CardBody>
									<CardHeader text='Flight Details' id="headerDiv" />
									<CardBody classes='overflow-auto bg-white' style={{height: '260px'}}>
										{flightDetails.map((flight) => {
											return (
												<CardBody
													classes='rounded p-2 border-bottom'
													key={flight._id}
												>
													<Row>
														<Col size='5'>
															<Small text='Passenger Name' />
															<p className='ml-2 text-monospace'>{flight.user}</p>
														</Col>
														<Col size='7'>
															<Small text='Flight Number' />
															<p className='ml-2 text-monospace'>
																{flight.flightNo}
															</p>
														</Col>
													</Row>
													<Row>
														<h6 className='text-bold mb-0 mt-2 ml-3'>
															Departing:
														</h6>
													</Row>
													<Row>
														<Col size='md-3 6'>
															<Small text='From' />
															<p className='ml-2 mb-0 text-monospace'>
																{flight.departing.airport}
															</p>
														</Col>
														<Col size='md-3 6'>
															<Small text='Date' />
															<p className='ml-2 mb-0 text-monospace'>
																{`${flight.departing.date.substring(5,10)}-${flight.departing.date.substring(0,2)}`}
															</p>
														</Col>
														<Col size='md-3 6'>
															<Small text='Time' />
															<p className='ml-2 mb-0 text-monospace'>
																{flight.departing.time}
															</p>
														</Col>
														<Col size='md-3 6'>
															<Small text='Seat' />
															<p className='ml-2 mb-0 text-monospace'>
																{flight.departing.seat}
															</p>
														</Col>
													</Row>
													<Row>
														<h6 className='text-bold mb-0 mt-2 ml-3'>
															Arriving:
														</h6>
													</Row>
													<Row>
														<Col size='md-3 6'>
															<Small text='To' />
															<p className='ml-2 mb-0 text-monospace'>
																{flight.arriving.airport}
															</p>
														</Col>
														<Col size='md-3 6'>
															<Small text='Date' />
															<p className='ml-2 mb-0 text-monospace'>
																{`${flight.arriving.date.substring(5, 10)}-${flight.arriving.date.substring(0,2)}`}
															</p>
														</Col>
														<Col size='md-3 6'>
															<Small text='Time' />
															<p className='ml-2 mb-0 text-monospace'>
																{flight.arriving.time}
															</p>
														</Col>
														<Col size='md-3 6'>
															<Small text='Seat' />
															<p className='ml-2 mb-0 text-monospace'>
																{flight.arriving.seat}
															</p>
														</Col>
													</Row>
												</CardBody>
											);
										})}
									</CardBody>
								</CardBody>
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
