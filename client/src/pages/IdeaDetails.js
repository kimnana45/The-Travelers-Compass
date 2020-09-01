import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_IDEA, ADD_FAVORITE, REMOVE_FAVORITE } from "../utils/actions";

const IdeaDetails = props => {
    const [state, dispatch] = useStoreContext();

    // useEffect(() => {
    //     API.getIdea(props.match.params.id)
    //     .then(res => dispatch({ type: SET_CURRENT_IDEA, idea: res.data }))
    //     .catch(err => console.log(err));
    // }, []);

    const addFavorite = () => {
        dispatch({
            type: ADD_FAVORITE,
            idea: state.currentIdea
        });
    };

    const removeFavorite = () => {
        dispatch({
            type: REMOVE_FAVORITE,
            _id: state.currentIdea._id
        });
    };

    return (
        <>{state.currentIdea ? (
            <Container fluid>
              <Row>
                <Col size="md-12">
                  <Jumbotron>
                    <h1>
                      {state.currentIdea.whatToDo} by {state.currentIdea.author}
                    </h1>
                  </Jumbotron>
                </Col>
              </Row>
              <Row>
                <Col size="md-10 md-offset-1">
                  <article>
                    <h1>Address:</h1>
                    <p>{state.currentIdea.address}</p>
                  </article>
                </Col>
                {state.favorites.indexOf(state.currentIdea) !== -1 ? (
                  <button className="btn btn-danger" onClick={removeFavorite}>
                      Remove from Must Do List!
                  </button>
                ) : (
                  <button className="btn" onClick={addFavorite}>
                      ❤️ Add to Must Do List
                  </button>
                )}
              </Row>
              <Row>
                <Col size="md-2">
                  <Link to="/">← Back to Ideas List</Link>
                </Col>
              </Row>
            </Container>
          ) : (
            <div>loading...</div>
          )}</>
    )
}

export default IdeaDetails;