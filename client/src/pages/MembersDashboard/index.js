import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useInput } from 'react-hanger';
import parseISO from 'date-fns/parseISO';
import { Col, Row, Container } from '../../components/Grid';
import { FormGroup, Input, Label, Small, FormBtn } from '../../components/Form';
import { Card, CardBody, CardImage } from '../../components/Card';
import { Accordion, AccordionHeader, AccordionContent } from '../../components/Accordion';
import API from '../../utils/API';
import './style.css';

function MembersDashboard() {
	const [user, setUser] = useState({
		trips: [],
		id: '',
		name: '',
		username: '',
		profilePic: ''
	});
	const [emergencyContactInfo, setEmergencyContactInfo] = useState({
		set: false,
		name: '',
		number: '',
	});
	const [errorMsg, setErrorMsg] = useState();
	const [joinedTripId, setJoinedTripId] = useState();
	const tripCode = useInput('');
	const tripPassword = useInput('');
	const emergencyContactName = useInput('');
	const emergencyContactNum = useInput('');
	const [joinTripClicked, setJoinTripClicked] = useState(false);
	const [newTripClicked, setNewTripClicked] = useState(false);
	const [refreshPage, setRefreshPage] = useState(false);

	useEffect(() => {
		API.getUser()
			.then((res) => {
				const { trips, firstName, lastName, username, _id, profilePic, emergencyContact } = res.data;
				setUser({
					trips: trips,
					id: _id,
					name: `${firstName} ${lastName}`,
					username: username,
					profilePic: profilePic
				})
				if (emergencyContact) {
					setEmergencyContactInfo({
						set: true,
						name: emergencyContact.name,
						number: emergencyContact.number,
					});
				}
			})
			.catch((err) => console.log(err));
	}, [refreshPage]);

	const handleJoinTripSubmit = (event) => {
		event.preventDefault();
		API.joinExistingTrip({
			code: tripCode.value,
			password: tripPassword.value,
		})
			.then(({ data }) => {
				let tripIndex = data.trips.length - 1
				setJoinedTripId(data.trips[tripIndex]);
				setJoinTripClicked(true);
			})
			.catch((err) => {
				if (err) setErrorMsg('Code or Password is Incorrect');
				tripCode.setValue('');
				tripPassword.setValue('');
				setJoinTripClicked(false);
			});
	};

	const handleECSubmit = (event) => {
		event.preventDefault();
		API.saveEmergencyContact({
			id: user.id,
			name: emergencyContactName.value,
			number: emergencyContactNum.value,
		})
			.then((res) => {
				const { name, number } = res.data.emergencyContact;
				setEmergencyContactInfo({
					set: true,
					name: name,
					number: number,
				});
			})
			.catch((err) => {
				if (err) console.log(err);
			});
		emergencyContactName.setValue('');
		emergencyContactNum.setValue('');
	};

	const deleteTrip = (tripId) => {
		API.deleteTrip(tripId)
			.then((res) => {
				setRefreshPage(true)
			})
			.catch((err) => {
				if (err) console.log(err);
			});
	};

	const removeTravelerFromTrip = (idOfTraveler, idOfTrip) => {
		API.removeTravelerFromTrip({
			userId: idOfTraveler,
			tripId: idOfTrip
		})
			.then((res) => setRefreshPage(true))
			.catch((err) => {
				if (err) console.log(err);
			});
	};

	if (joinTripClicked) {
		console.log(joinTripClicked)
		let tripId = user.trips.length - 1;
		return <Redirect to={`/trip/${joinedTripId}`} />;
	}

	if (newTripClicked) {
		return <Redirect to={`/newtrip`} />;
	}

	return (
		<Container>
			<div className='mt-3'>
				<Row>
					<Col size='md-4'>
						<Card>
							<CardBody classes="mx-auto my-2">
								<CardImage src={user.profilePic} alt={user.username} classes="img-thumbnail" id="profilePic"/>
							</CardBody>
							<CardBody classes='mx-auto'>
								<h2 id='subHeaderWord'>{user.username}</h2>
								<h4 className="text-center">{user.name}</h4>
								{ user.trips.length === 1 ? (
									<h6 className="text-center">{user.trips.length} trip planned currently</h6>
								) : (
									<h6 className="text-center">{user.trips.length} trips planned currently</h6>
								)}
							</CardBody>
						</Card>
						<Accordion>
							<AccordionHeader num='One' title='Join an existing itinerary'>
								<AccordionContent num='One'>
									<form>
										<FormGroup>
											<Label text='Enter Unique Trip Code' />
											<Small text='case sensitive' />
											<Input
												name='tripCode'
												type='text'
												{...tripCode.eventBind}
											/>
											<Label text='Enter Trip password' />
											<Small text='case sensitive' />
											<Input
												name='tripPassword'
												type='text'
												{...tripPassword.eventBind}
											/>
										</FormGroup>
										{errorMsg ? <Small text={errorMsg} /> : ''}
										<FormBtn
											text='Find Existing Itinerary'
											onClick={handleJoinTripSubmit}
											classes='btn-danger'
										/>
									</form>
								</AccordionContent>
							</AccordionHeader>
							<AccordionHeader
								num='Two'
								title='Set your emergency contact info'
							>
								<AccordionContent num='Two'>
									{emergencyContactInfo.set ? (
										<span className='text-center'>
											Current emergency contact:
											<br />
											<i className='far fa-address-card fa-3x ml-4 float-left'></i>
											<strong className='ml-4'>
												name: {emergencyContactInfo.name}
											</strong>
											<br />
											<strong className='ml-4'>
												number: {emergencyContactInfo.number}
											</strong>
										</span>
									) : (
										''
									)}
									<form className='mt-1'>
										<FormGroup>
											<Label text='Emergency Contact Name' />
											<Input
												name='emergencyContactName'
												value={emergencyContactName}
												type='text'
												{...emergencyContactName.eventBind}
											/>
											<Label text='Emergency Contact Phone Number' />
											<Small text='please include area code' />
											<Input
												name='emergencyContactNum'
												value={emergencyContactNum}
												type='text'
												{...emergencyContactNum.eventBind}
											/>
										</FormGroup>
										<FormBtn
											text={
												emergencyContactInfo.set
													? 'Update your emergency contact info'
													: 'Set your emergency contact info'
											}
											onClick={handleECSubmit}
											classes='btn-danger'
										/>
									</form>
								</AccordionContent>
							</AccordionHeader>
						</Accordion>
					</Col>
					<Col size='md-8'>
						<FormBtn
							type='button'
							text='start a new itinerary'
							classes='btn-info btn-lg'
							onClick={() => setNewTripClicked(true)}
						/>
						{user.trips.length ? (
							<Card classes='p-2 justify-content-center'>
								<h1>upcoming trips</h1>
								{user.trips.map((trip) => (
									<CardBody
										key={trip._id}
										classes='p-2 m-1 border rounded-lg text-center'
									>
										{trip.creator === user.id ? (
											<FormBtn
												classes='float-right btn-sm text-danger'
												text="delete trip"
												style={{ width: 'auto' }}
												onClick={() => deleteTrip(trip._id)}
											/>
										) : (
											<FormBtn
												classes='float-right btn-sm text-danger'
												text="remove me from this trip"
												style={{ width: 'auto' }}
												onClick={() => removeTravelerFromTrip(user.id, trip._id)}
											/>
										)}
										<Link to={`/trip/${trip._id}`} key={trip._id}>
											<FormBtn
												classes='float-left btn-sm text-info'
												text="view itinerary"
												style={{ width: 'auto' }}
											/>
											<br/>
										</Link>
										<h3 id='subHeaderWord' className='mt-2 mb-4 text-center'>
											{trip.tripName}
										</h3>
										<Row>
											<Col size='md-4'>
												<i className='far fa-compass fa-2x mx-auto'></i>
												<p className='text-center'>
													{trip.location[0].name +
														', ' +
														(trip.location[0].administrative
															? trip.location[0].administrative
															: trip.location[0].country)}
												</p>
											</Col>
											<Col size='md-4'>
												<i className='fas fa-calendar-alt fa-2x mx-auto'></i>
												<p className='text-center'>
													{parseISO(trip.dates.startDate)
														.toString()
														.slice(4, 15)}{' '}
													-{' '}
													{parseISO(trip.dates.endDate)
														.toString()
														.slice(4, 15)}
												</p>
											</Col>
											<Col size='md-4'>
												<i className='fas fa-key fa-2x mx-auto'></i>
												<p className='text-center'>{trip.uniqueCode}</p>
											</Col>
										</Row>
									</CardBody>
								))}
							</Card>
						) : (
							<Card>
								<CardBody classes='p-3'>
									<h2 id='subHeaderWord'>bummer, no upcoming trips...</h2>
									<h2 id='subHeaderWord'>
										join an existing itinerary or start planning a new one.
									</h2>
								</CardBody>
							</Card>
						)}
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default MembersDashboard;
