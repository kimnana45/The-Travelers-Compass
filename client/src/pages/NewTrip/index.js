import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as RandExp from 'randexp';
import AlgoliaPlaces from 'algolia-places-react';
import { FormGroup, Input, Label, FormBtn, Small } from '../../components/Form';
import { Container, Col, Row } from '../../components/Grid';
import { Datepicker, START_DATE } from '@datepicker-react/styled';
import API from '../../utils/API';
import './style.css';

function Trip({ userId }) {
	const [tripId, setTripId] = useState();
	const [tripName, setTripName] = useState({
		tripName: '',
		validTN: false,
	});
	const [location, setLocation] = useState({
		location: {},
		validLocation: false,
	});
	const [dates, setDates] = useState({
		startDate: null,
		endDate: null,
		focusedInput: START_DATE,
	});
	const [password, setPassword] = useState({
		password: '',
		validPW: false,
	});
	const [submission, setSubmission] = useState(false);
	
	function handleDatesChange(data: OnDatesChangeProps) {
		if (!data.focusedInput) {
			setDates({ ...data, focusedInput: START_DATE });
		} else {
			setDates(data);
		}
	}

	function handleInputChange(event) {
		const { name, value } = event.target;
		switch (name) {
			case 'tripName':
				return setTripName({
					tripName: value,
					validTN: true,
				});
			case 'dates':
				return handleDatesChange();
			case 'password':
				return setPassword({
					password: value,
					validPW: true,
				});
			default:
		}
	}

	const addNewTrip = (e) => {
		e.preventDefault();
		API.saveTrip({
			tripName: tripName.tripName.toUpperCase(),
			location: location.location,
			dates: dates,
			password: password.password,
			creatorId: userId,
			uniqueCode: `${new RandExp(/^[0-9a-z]{6}$/).gen()}-${new RandExp(
				/^[0-9A-Z]{6}$/
			).gen()}`
		})
			.then(res => {
				let { trips } = res.data;
				let mostRecentTrip = trips.length - 1;
				setTripId(trips[mostRecentTrip]);
				setSubmission(true);
			})
			.catch(err => console.log(err));
	};

	if (submission) {
		return <Redirect to={`/trip/${tripId}`} />;
	}

	return (
		<Container>
			<Row className='mt-2'>
				<form>
					<Row>
						<Col size='md-6'>
							<FormGroup>
								<Label text='Trip Name' />
								<Small text='(Ex: Roadtrip to Rocky Mtns!)' />
								<Input
									name='tripName'
									value={tripName.tripName}
									onChange={handleInputChange}
									placeholder='Your Trip Name'
								/>
							</FormGroup>
						</Col>
						<Col size='md-6'>
							<FormGroup>
								<Label text='Set a password for your trip' />
								<Small text='Must be minimum of 6 characters.' />
								<Input
									name='password'
									value={password.password}
									onChange={handleInputChange}
									placeholder='Trip Password'
								/>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Row>
							<Label text='Where are you going?' classes='ml-3' />
						</Row>
						<Row>
							<Col size='12'>
								<AlgoliaPlaces
									placeholder='Search by city'
									name='location'
									options={{
										appId: process.env.appID,
										apiKey: process.env.apiKEY,
										language: 'en',
										type: 'city',
									}}
									onChange={({ suggestion }) =>
										setLocation({ location: suggestion, validLocation: true })
									}
									onClear={() => {}}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Label text='What are the dates of the trip?' />
						<Datepicker
							onDatesChange={handleDatesChange}
							startDate={dates.startDate} // Date or null
							endDate={dates.endDate} // Date or null
							focusedInput={dates.focusedInput} // START_DATE, END_DATE or null
						/>
					</FormGroup>
					<FormBtn
						disabled={
							tripName.validTN &&
							location.validLocation &&
							dates.startDate &&
							dates.endDate &&
							password.validPW
								? ''
								: 'disabled'
						}
						text='Start Planning!'
						onClick={addNewTrip}
						classes='btn-danger'
						type='submit'
					/>
				</form>
			</Row>
		</Container>
	);
}

export default Trip;