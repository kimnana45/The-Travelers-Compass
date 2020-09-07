import React, { useState, useLayoutEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useInput } from 'react-hanger';
import moment from 'moment';
import { Col, Row, Container } from '../../components/Grid';
import { FormGroup, Input, Label, Small, FormBtn } from '../../components/Form';
import { Card, CardBody, CardImage } from '../../components/Card';
import { Accordion, AccordionHeader, AccordionContent } from '../../components/Accordion';
import TripCard from '../../components/TripCard';
import API from '../../utils/API';
import './style.css';

function MembersDashboard() {
	const [user, setUser] = useState({
		trips: [],
		id: '',
		name: '',
		username: '',
		profilePic: '',
	});
	const [emergencyContactInfo, setEmergencyContactInfo] = useState({
		set: false,
		name: '',
		number: '',
	});
	const [pastTrips, setPastTrips] = useState([]);
	const [currentTrips, setCurrentTrips] = useState([]);
	const [futureTrips, setFutureTrips] = useState([]);
	const [errorMsg, setErrorMsg] = useState();
	const [joinedTripId, setJoinedTripId] = useState();
	const tripCode = useInput('');
	const tripPassword = useInput('');
	const emergencyContactName = useInput('');
	const emergencyContactNum = useInput('');
	const [joinTripClicked, setJoinTripClicked] = useState(false);
	const [newTripClicked, setNewTripClicked] = useState(false);
	const [refreshPage, setRefreshPage] = useState(false);

	useLayoutEffect(() => {
		API.getUser()
			.then(res => {
				const { trips, firstName, lastName, username, _id, profilePic, emergencyContact } = res.data;
				setUser({
					trips: trips,
					id: _id,
					name: `${firstName} ${lastName}`,
					username: username,
					profilePic: profilePic,
				});
				if (emergencyContact) {
					setEmergencyContactInfo({
						set: true,
						name: emergencyContact.name,
						number: emergencyContact.number,
					});
				}
				checkTripStatus(trips);
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
				let tripIndex = data.trips.length - 1;
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
				setRefreshPage(true);
			})
			.catch((err) => {
				if (err) console.log(err);
			});
	};

	const removeTravelerFromTrip = (idOfTraveler, idOfTrip) => {
		API.removeTravelerFromTrip({
			userId: idOfTraveler,
			tripId: idOfTrip,
		})
			.then((res) => setRefreshPage(true))
			.catch((err) => {
				if (err) console.log(err);
			});
	};

	const checkTripStatus = (trips) => {
		let past = [];
		let current = [];
		let future = [];
		for (let i = 0; i < trips.length; i++) {
			let startDate = moment(trips[i].dates.startDate).format('YYYY-MM-D');
			let endDate = moment(trips[i].dates.endDate).format('YYYY-MM-D');
			let currentDate = moment().format('YYYY-MM-D');
			let checkIsBefore = moment(currentDate).isBefore(startDate);
			let checkIsAfter = moment(currentDate).isAfter(startDate);
			let checkIsBetween = moment(currentDate).isBetween(startDate, endDate);
			if (checkIsBefore) {
				future.push(trips[i]);
			} else if (checkIsBetween) {
				current.push(trips[i]);
			} else if (currentDate === startDate) {
				console.log(currentDate)
				console.log(startDate)
				current.push(trips[i])
			} else if (checkIsAfter) {
				past.push(trips[i]);
			}
		}
		setPastTrips(past);
		setCurrentTrips(current);
		setFutureTrips(future);
	};

	if (joinTripClicked) {
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
							<CardBody classes='mx-auto my-2'>
								<CardImage
									src={user.profilePic ? (user.profilePic) : ("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")}
									alt={user.username}
									classes='img-thumbnail'
									id='profilePic'
								/>
							</CardBody>
							<CardBody classes='mx-auto'>
								<h2 id='subHeaderWord'>{user.username}</h2>
								<h4 className='text-center'>{user.name}</h4>
								{currentTrips.length > 0 && (
									<h6 className='text-center'>
										{currentTrips.length} current {currentTrips.length === 1 ? "trip" : "trips"}
									</h6>
								)}
								<h6 className='text-center'>
										{futureTrips.length} future {futureTrips.length === 1 ? "trip" : "trips"} being planned
								</h6>
								{pastTrips.length > 0 && (
									<h6 className='text-center'>
										{pastTrips.length} past {pastTrips.length === 1 ? "trip" : "trips"}
									</h6>
								)}
							</CardBody>
						</Card>
						<Accordion>
							{pastTrips.length > 0 && (
							<AccordionHeader num='One' title='All Past Itineraries'>
								<AccordionContent num='One'>
									{pastTrips.map(trip => (
										<Link to={`/trip/${trip._id}`} key={trip._id}>
											{trip.tripName} to {trip.location[0].name}
										</Link>
									))}
								</AccordionContent>
							</AccordionHeader>
							)}
							<AccordionHeader num='Two' title='Join an existing itinerary'>
								<AccordionContent num='Two'>
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
								num='Three'
								title='Set your emergency contact info'
							>
								<AccordionContent num='Three'>
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
							classes='btn-dark btn-lg'
							onClick={() => setNewTripClicked(true)}
						/>
						<Card id="currentTripsContainer">
						{currentTrips.length > 0 && (
							<Card classes='p-2 justify-content-center'>
								<h1 id='headerWordTeal' className="text-left">current {currentTrips.length === 1 ? "trip" : "trips"}</h1>
								{currentTrips.map((trip) => (
									<TripCard
										key={trip._id}
										trip={trip}
										deleteTrip={deleteTrip}
										removeTravelerFromTrip={removeTravelerFromTrip}
										userId={user.id}
									/>
								))}
							</Card>
						)}
						</Card>
						<Card id="futureTripsContainer">
						{futureTrips.length > 0 && (
							<Card classes='p-2 justify-content-center'>
								<h1 id='headerWordTeal' className="text-left">upcoming {futureTrips.length === 1 ? "trip" : "trips"}</h1>
								{futureTrips.map((trip) => (
									<TripCard
										key={trip._id}
										trip={trip}
										deleteTrip={deleteTrip}
										removeTravelerFromTrip={removeTravelerFromTrip}
										userId={user.id}
									/>
								))}
							</Card>
						)}
						</Card>
						{user.trips.length === 0 && (
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