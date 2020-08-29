import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useInput } from 'react-hanger';
import { Col, Row, Container } from '../../components/Grid';
import { FormGroup, Input, Label, Small, FormBtn } from '../../components/Form';
import { Card, CardBody } from '../../components/Card';
import { Accordion, AccordionContent } from '../../components/Accordion';
import API from '../../utils/API';
import './style.css';

function MembersDashboard() {
	const [usersTrips, setUsersTrips] = useState([]);
	const [userId, setUserId] = useState();
	const [username, setUsername] = useState();
	const [errorMsg, setErrorMsg] = useState();
	const tripCode = useInput('');
	const tripPassword = useInput('');
	const [submission, setSubmission] = useState(false);

	useEffect(() => {
		API.getUser()
			.then(res => {
				const { trips, username, _id } = res.data;
				setUsersTrips(trips);
				setUserId(_id);
				setUsername(username);
			})
			.catch(err => console.log(err));
	}, []);

	const handleSubmit = event => {
		event.preventDefault();
		API.joinExistingTrip({
			code: tripCode.value,
			password: tripPassword.value
			})
			.then(res => {
				setUsersTrips(res.data.trips);
				setSubmission(true);
			})
			.catch(err => {
				if (err) setErrorMsg('Code or Password is incorrect')
			});
	};

	if (submission) {
		let tripId = usersTrips.length - 1;
		return <Redirect to={`/trip/${usersTrips[tripId]}`} />
	}

	return (
		<Container>
			<Row>
				<h3>Hello {username}!</h3>
			</Row>
			<Row>
				<Col size='md-4'>
					<Accordion title='Gain access to an existing itinerary!'>
						<AccordionContent>
							<form>
								<FormGroup>
									<Label text='Enter Unique Trip Code:' />
									<Small text='case sensitive'/>
									<Input 
										name='tripCode' 
										type='text' 
										{...tripCode.eventBind} 
									/>
									<Label text='Enter Trip password:' />
									<Small text='case sensitive'/>
									<Input 
										name='tripPassword' 
										type='text' 
										{...tripPassword.eventBind} 
									/>
								</FormGroup>
								{errorMsg ? <Small text={errorMsg} /> : ''}
								<FormBtn
									text='Find Existing Itinerary'
									onClick={handleSubmit}
									classes='btn-danger'
								/>
							</form>
						</AccordionContent>
					</Accordion>
				</Col>
				<Col size='md-8'>
					{usersTrips.length ? (
						<Card>
							{usersTrips.map(trip => (
								<CardBody key={trip._id}>
									<Link 
										to={`/trip/${trip._id}`}
										key={trip._id}
									>
										<strong>{trip.tripName}</strong>
									</Link>
									{/* <CardContent text={trip.tripName} /> */}
								</CardBody>
							))}
						</Card>
					) : (
						<h3>Bummer! No trips planned yet!</h3>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default MembersDashboard;
