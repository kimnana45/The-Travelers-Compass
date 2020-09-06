import React, { useEffect, useState } from 'react';
import { ListItem, List } from '../List';
import { Small, FormBtn } from '../Form';
import { Container } from '../Grid';
import { useStoreContext } from '../../utils/IdeaGlobalState';
import { REMOVE_IDEA, UPDATE_IDEAS, LOADING } from '../../utils/actions';
import API from '../../utils/API';

function IdeasList() {
	const [tripId, setTripId] = useState('');
	const [state, dispatch] = useStoreContext();

	const removeIdea = (id) => {
		API.removeIdea(id, tripId)
			.then(res => {
				dispatch({
					type: REMOVE_IDEA,
					_id: id,
				});
			})
			.catch((err) => console.log(err));
	};

	const getIdeas = (id) => {
		dispatch({ type: LOADING });
		API.getTripById(id)
			.then(({ data }) => {
				dispatch({
					type: UPDATE_IDEAS,
					ideas: data.toDos,
				});
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		let query = window.location.search;
		query = query.split('='); 
		setTripId(query[1]);
		getIdeas(query[1])
	}, []);

	return (
		<Container>
			<h1 className="text-center" id="headerWordCreme">Current Ideas</h1>
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
                            <i className='fas fa-map-marked-alt fa-2x mx-3'></i>
							<small className="d-inline-flex text-monospace mr-3">
								{`${idea.idea} by ${idea.user.firstName} ${idea.user.lastName}`} 
							</small>
							{idea.mustDo ? (<Small text="(must do)" classes="d-inline-flex"/>) : (<Small text="(suggestion)" classes="d-inline-flex"/>)}
						</ListItem>
					))}
				</List>
			) : (
				<h4 id="subHeaderWord" className="my-5">No idea yet.<br/> Someone think of something!</h4>
			)}
		</Container>
	);
}

export default IdeasList;
