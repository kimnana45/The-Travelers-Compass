import React, { useState, useEffect} from "react";
import { Label, Input, FormGroup, FormBtn } from "../Form"; 
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_IDEA, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import AlgoliaPlaces from 'algolia-places-react';

function CreateIdeaForm() {
    const [whatToDo, setWhatToDo] = useState("");
    const [address, setAddress] = useState({});
    const [author, setAuthor] = useState("");
    const [tripId, setTripId] = useState("")
    const [state, dispatch] = useStoreContext();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: LOADING });
        API.saveIdea({
            whatToDo: whatToDo,
            address: address,
            author: author,
            tripId: tripId
        })
            .then(res => {
                dispatch({
                    type: ADD_IDEA,
                    idea: res.data
                });
            })
            .catch(err => console.log(err))

        setWhatToDo("");
        setAddress("");
    };

    useEffect(() => {
        let query = window.location.search
        query = query.split("=")
        setTripId(query[1]);
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case ('whatToDo'):
                return setWhatToDo(value);
            case ('author'):
                return setAuthor(value);
            default:
                return;
        }
    };

    return (
        <Container>
            <h1>Ideas For Our Trip</h1>
            <form onSubmit={handleSubmit}>
					<Row>
						<Col size='md-6'>
							<FormGroup>
								<Label text='What should we do?' />
								<Input
                                    name="whatToDo"
                                    value={whatToDo}
                                    onChange={handleInputChange}
									placeholder='Your idea for an adventure'
								/>
							</FormGroup>
						</Col>
                        </Row>
                        <Row>
							<Col size='md-6'>
								<AlgoliaPlaces
									placeholder='Search for place'
									options={{
										appId: process.env.appID,
										apiKey: process.env.apiKEY,
										language: 'en',
										type: 'address',
									}}
									onChange={({ suggestion }) => setAddress(suggestion)}
									onClear={() => {}}
								/>
							</Col>
						</Row>
                        <Row>
                            <Col size="md-6">
                            <Label text="This idea was created by:"/>
                            <Input 
                            name="author"
                            value={author}
                            onChange={handleInputChange}
                            placeholder="Your name here"
                            />
                            </Col>
                        </Row>
                        <FormBtn
						// disabled={state.loading}
						classes='btn-primary'
                        type='submit'
                        text="Add Idea"
					/>
                        </form>
        </Container>

    )
}

export default CreateIdeaForm;