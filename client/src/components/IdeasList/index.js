import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, List } from '../List';
import { Small, FormBtn } from '../Form';
import { Container } from '../Grid';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_IDEA, UPDATE_IDEAS, LOADING } from '../../utils/actions';
import API from '../../utils/API';

function IdeasList() {
	const [tripId, setTripId] = useState('');
	const [state, dispatch] = useStoreContext();

	const removeIdea = (id) => {
		console.log(`removeid is ${id}`);
		API.deleteIdea(id)
			.then(() => {
				dispatch({
					type: REMOVE_IDEA,
					_id: id,
				});
			})
			.catch((err) => console.log(err));
	};

	const getIdeas = (id) => {
		dispatch({ type: LOADING });
		API.getIdeas(id)
			.then(({ data }) => {
				dispatch({
					type: UPDATE_IDEAS,
					ideas: data,
				});
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		let query = window.location.search;
		query = query.split('='); 
		setTripId(query[1]);
		getIdeas(query[1]);
	}, []);

	return (
		<Container>
			<h1 className="text-center">Current Ideas</h1>
			<Small text="Add to favorites if you want to do it too!" />
			{state.ideas.length ? (
				<List>
					{state.ideas.map((idea) => (
						<ListItem key={idea._id}>
							<FormBtn 
								classes="float-right btn-sm mx-1 btn-outline-danger" 
								onClick={() => removeIdea(idea._id)} 
								text={<i className="far fa-times-circle"></i>}
								style={{width: "auto"}}
							/>
							<FormBtn 
								classes="float-right btn-sm btn-outline-danger" 
								text={<i className="fas fa-heart"></i>}
								type="button"
								style={{width: "auto"}}
							/>
                            <i className='fas fa-map-marked-alt fa-2x mx-3'></i>
                            <Link to={'/ideas/' + idea._id}>
                                <strong>
                                    {idea.toDo} by{' '}
                                    {`${idea.user.firstName} ${idea.user.lastName}`}
                                </strong>
							</Link>	
						</ListItem>

					))}
				</List>
			) : (
				<h3>No idea yet. Someone think of something!</h3>
			)}
			<div className="mt-4">
				<Link to='favorites'>View must-do list</Link>
			</div>
		</Container>
	);
}

export default IdeasList;
