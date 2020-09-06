import React, { useEffect, useState } from 'react';
import { ListItem, List } from '../List';
import { Small, FormBtn } from '../Form';
import { Container } from '../Grid';
import { useStoreContext } from '../../utils/IdeaGlobalState';
import { REMOVE_IDEA, UPDATE_IDEAS, LOADING } from '../../utils/actions';
import API from '../../utils/API';

function IdeasList() {
	const [tripId, setTripId] = useState('');
	// const [refresh, setRefresh] = useState(false);
	const [state, dispatch] = useStoreContext();

	const removeIdea = (id) => {
		API.removeIdea(id, tripId)
			.then((res) => {
				dispatch({
					type: REMOVE_IDEA,
					_id: id,
				});
				// setRefresh(true)
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
			<h1 className="text-center" id="headerWordGreen">Current Ideas</h1>
			<Small text="Add to favorites if you want to do it too!" classes="text-center"/>
			{state.ideas.length ? (
				<List>
					{state.ideas.map((idea) => (
						<ListItem key={idea._id}>
							{console.log(idea)}
							<FormBtn 
								classes="float-right btn-sm mx-1 btn-outline-danger" 
								onClick={() => removeIdea(idea._id)} 
								text={<i className="far fa-times-circle"></i>}
								style={{width: "auto"}}
							/>
							{idea.suggestion ? (
								<FormBtn 
								classes="float-right btn-sm btn-outline-danger" 
								text={<i className="fas fa-thumbs-up"></i>}
								onClick={() => console.log(idea._id)} 
								type="button"
								style={{width: "auto"}}
							/>
							) : (
								""
							)}
                            <i className='fas fa-map-marked-alt fa-2x mx-3'></i>
							<strong>
								{`${idea.idea} by ${idea.user.firstName} ${idea.user.lastName}`}
							</strong>
						</ListItem>
					))}
				</List>
			) : (
				<h3 id="subHeaderWord" className="my-5">No idea yet. Someone think of something!</h3>
			)}
		</Container>
	);
}

export default IdeasList;
