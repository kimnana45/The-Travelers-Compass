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
            
        </Container>
    )
}

export default IdeasList;