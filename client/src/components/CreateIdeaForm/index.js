import React, { useState, useEffect } from 'react';
import { Label, Input, FormGroup, FormBtn } from '../Form';
import { Card, CardBody } from '../Card';
import { useStoreContext } from '../../utils/IdeaGlobalState';
import { ADD_IDEA, LOADING } from '../../utils/actions';
import API from '../../utils/API';
import { Col, Row, Container } from '../Grid';
import AlgoliaPlaces from 'algolia-places-react';

function CreateIdeaForm() {
	const [idea, setIdea] = useState('');
	const [address, setAddress] = useState({});
	const [userInfo, setUserInfo] = useState({
		id: '',
		firstName: '',
		lastName: '',
	});
	const [tripId, setTripId] = useState('');
	const [state, dispatch] = useStoreContext();

	useEffect(() => {
		let query = window.location.search;
		query = query.split('=');
		setTripId(query[1]);
		getUserData();
	}, [tripId]);

	function handleSubmit(e) {
		e.preventDefault();
		dispatch({ type: LOADING });
		API.saveIdea({
			idea: idea,
			address: address,
			userInfo: userInfo,
			tripId: tripId,
		})
			.then((res) => {
				dispatch({
					type: ADD_IDEA,
					idea: res.data,
				});
			})
			.catch((err) => console.log(err));

		setIdea('');
		setAddress('');
	}

	function getUserData() {
		API.getUser()
			.then((res) => {
				const { firstName, lastName, _id } = res.data;
				setUserInfo({
					id: _id,
					firstName: firstName,
					lastName: lastName,
				});
			})
			.catch((err) => console.log(err));
	}

	function handleInputChange(e) {
		const { value } = e.target;
		setIdea(value);
	}

	return (
		<Container>
			<Card classes="border-dark p-3">
				<h1 className="text-center">Get To Planning</h1>
				<h4 className="text-center">Start adding ideas for our trip</h4>
				<form onSubmit={handleSubmit}>
					<Row>
						<Col size='md-12'>
							<FormGroup>
								<Label text='What to see, what to do, what to eat?' />
								<Input
									name='idea'
									value={idea}
									onChange={handleInputChange}
									placeholder='Ex: Grand Canyon'
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col size='md-12'>
							<Label text='Add the address of the location:' />
							<AlgoliaPlaces
								placeholder='Search by address'
								options={{
									appId: process.env.appID,
									apiKey: process.env.apiKEY,
									language: 'en',
									type: 'address',
								}}
								onChange={({ suggestion }) => setAddress(suggestion)}
							/>
						</Col>
					</Row>
					<Row className='row mt-2 justify-content-md-center'>
						<Col size='md-6'>
							<FormBtn
								// disabled={state.loading}
								classes='btn-danger btn-sm'
								type='submit'
								text='Add Idea'
							/>
						</Col>
					</Row>
				</form>
			</Card>
		</Container>
	);
}

export default CreateIdeaForm;
