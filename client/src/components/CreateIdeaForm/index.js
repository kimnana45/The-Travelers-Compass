import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_IDEA, LOADING } from "../../utils/actions";
import API from "../../utils/API";

function CreateIdeaForm() {
    const ideaRef = useRef();
    const addressRef = useRef();
    const authorRef = useRef();
    const [state, dispatch] = useStoreContext();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: LOADING });
        API.saveIdea({
            idea: ideaRef.current.value,
            address: addressRef.current.value,
            author: authorRef.current.value
        })
            .then(res => {
                dispatch({
                    type: ADD_IDEA,
                    idea: res.data
                });
            })
            .catch(err => console.log(err));

        ideaRef.current.value = "";
        addressRef.current.value = "";
    };

    return (


    )
}

export default CreateIdeaForm;