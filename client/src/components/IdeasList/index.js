import React, { useEffect } from "react";
import { ListItem, List } from "../List";
import DeleteBtn from "../DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_IDEA, UPDATE_IDEAS, LOADING } from "../../utils/actions";
import API from "../../utils/API";

function IdeasList() {
    const [state, dispatch] = useStoreContext();

    const removeIdea = id => {
        API.deleteIdea(id)
        .then(() => {
            dispatch({
                type: REMOVE_IDEA,
                _id: id
            });
        })
        .catch(err => console.log(err));
    };

    const getIdeas = () => {
        dispatch({ type: LOADING });
        API.getIdeas()
        .then(res => {
            dispatch({
                type: UPDATE_IDEAS,
                ideas: res.data
            });
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        getIdeas();
    }, []);

    return (
        <Container>
            <h1>All of Our Ideas</h1>
            <h3>Click on an idea to view details</h3>
            {state.ideas.length ? (
                <List>
                    {state.ideas.map(idea => (
                        <ListItem key={idea._id}>
                            <Link to={"/ideas/" + idea._id}>
                                <strong>
                                    {idea.whatToDo} by {idea.author}
                                </strong>
                            </Link>
                            <DeleteBtn onClick={() => removeIdea(idea._id)} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <h3>No idea yet. Someone think of something!</h3>
            )}
            <div>
                <Link to="favorites">View must-do list</Link>
            </div>
        </Container>
    );
}

export default IdeasList;