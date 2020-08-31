import React, { useEffect } from "react";
import { Container } from "../components/Grid";
import { ListItem, List } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/IdeaGlobalState";
import { REMOVE_FAVORITE, LOADING, UPDATE_FAVORITES } from "../utils/actions";

const MustDoList = () => {
    const [state, dispatch] = useStoreContext();

    const getFavorites = () => {
        dispatch({ type: LOADING });
        dispatch({ type: UPDATE_FAVORITES });
    };

    const removeFromFavorites = id => {
        dispatch({
            type: REMOVE_FAVORITE,
            _id: id
        });
    };

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <Container>
            <h1>Must Do List</h1>
            {state.favorites.length ? (
                <List>
                    <h3>Click on an idea to view its details</h3>
                    {state.favorites.map(idea => (
                        <ListItem key={idea._id}>
                            <Link to={"/ideas/" + idea._id}>
                                <strong>
                                    {idea.whatToDo}
                                    where: {idea.address}
                                    by: {idea.author}
                                </strong>
                            </Link>
                            <DeleteBtn onClick={() => removeFromFavorites(idea._id)} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <h3>No must do items on the list yet. Is there nothing you like?</h3>
            )}
            <div>
                <Link to="IdeasMain">Back to the Ideas List</Link>
            </div>
        </Container>
    )
}

export default MustDoList;