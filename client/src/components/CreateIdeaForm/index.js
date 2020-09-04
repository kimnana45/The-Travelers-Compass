import React, { useState, useEffect } from 'react';
import { Label, Input, FormGroup, FormBtn } from '../Form';
import { Card, CardBody } from '../Card';
import { useStoreContext } from '../../utils/IdeaGlobalState';
import { ADD_IDEA, LOADING } from '../../utils/actions';
import API from '../../utils/API';
import { Col, Row, Container } from '../Grid';
import AlgoliaPlaces from 'algolia-places-react';
import { set } from 'mongoose';

function CreateIdeaForm() {
	const [idea, setIdea] = useState('');
	const [address, setAddress] = useState({});
	const [userInfo, setUserInfo] = useState({
		id: '',
		firstName: '',
		lastName: '',
	});
	const [tripId, setTripId] = useState('');
	const [mustDo, setMustDo] = useState(false);
	const [suggestion, setSuggestion] = useState(false);
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
		let toDo = {
			idea: idea,
			address: address,
			user: userInfo,
			mustDo: mustDo,
			suggestion: suggestion
		}
		API.saveIdea(tripId, toDo)
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
		const { name, value } = e.target;
		if (name === 'idea') setIdea(value);
		if (e.target.checked) {
			if (value === 'mustDo') setMustDo(true);
			else setSuggestion(true);
		} 
	}

	return (
		<div>
			<Card classes="border-dark">
				<h1 className="text-center">Get To Planning</h1>
				<h4 className="text-center">Start adding ideas for our trip</h4>
				<form onSubmit={handleSubmit} style={{ margin: '0'}}>
					<Row>
						<FormGroup className="px-4" style={{ width: '100%'}}>
							<Label text='What to see, what to do, what to eat?' />
							<Input
								name='idea'
								value={idea}
								onChange={handleInputChange}
								placeholder='Ex: Grand Canyon'
							/>
						</FormGroup>
					</Row>
					<Row>
					<FormGroup className="px-4" style={{ width: '100%'}}>
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
						</FormGroup>
					</Row>
					<Row>
						<FormGroup className="px-4" style={{ width: '100%'}}>
							<Label classes="mt-2" text='Is this a must do or a suggestion?' />
							<div className="checkform ml-4">
								<div className="form-check form-check-inline">
									<Input 
										className="form-check-input" type="radio" name="typeOfIdea" id="mustDoIdea" value="mustDo" onChange={handleInputChange} />
									<Label className="form-check-label m-0" htmlFor="mustDoIdea" text="Must Do"/>
								</div>
								<div className="form-check form-check-inline">
									<Input 
										className="form-check-input" type="radio" name="typeOfIdea" id="suggestionIdea" value="suggestion" onChange={handleInputChange} />
									<Label className="form-check-label m-0" htmlFor="suggestionIdea" text="Just a Suggestion"/>
								</div>
							</div>
						</FormGroup>
					</Row>
					<Row className='row mt-2 justify-content-md-center'>
						<Col size='md-12'>
							<FormBtn
								// disabled={state.loading}
								classes='btn-danger btn-sm'
								type='submit'
								text='Add To List'
							/>
						</Col>
					</Row>
				</form>
			</Card>
		</div>
	);
}

export default CreateIdeaForm;