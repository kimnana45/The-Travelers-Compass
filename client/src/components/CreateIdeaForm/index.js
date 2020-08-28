import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_IDEA, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import { Container } from "../Grid";

function CreateIdeaForm() {
    const whatToDoRef = useRef();
    const addressRef = useRef();
    const authorRef = useRef();
    const [state, dispatch] = useStoreContext();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: LOADING });
        API.saveIdea({
            whatToDo: whatToDoRef.current.value,
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

        whatToDoRef.current.value = "";
        addressRef.current.value = "";
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
									required ref={whatToDoRef}
									placeholder='Your idea for an adventure'
								/>
							</FormGroup>
						</Col>
                        </Row>
                        <Row>
							<Col size='md-6'>
								<AlgoliaPlaces
                                    required ref={addressRef}
									placeholder='Search for place'
									options={{
										appId: process.env.appID,
										apiKey: process.env.apiKEY,
										language: 'en',
										type: 'address',
									}}
									onChange={({ suggestion }) => setLocation({ location: suggestion, validLocation: true})}
									onClear={() => {}}
								/>
							</Col>
						</Row>
                        <Row>
                            <Col size="md-6">
                            <Label text="This idea was created by:"/>
                            <Input 
                            required ref={authorRef}
                            placeholder="Your name here"
                            />
                            </Col>
                        </Row>
                        <FormBtn
						disabled={state.loading}
						classes='btn-primary'
                        type='submit'
                        text="Add Idea"
					/>
                        </form>
        </Container>

    )
}

export default CreateIdeaForm;