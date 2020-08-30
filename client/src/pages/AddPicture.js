import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import { Row, Col, Container } from '../components/Grid';
import { Input, Label, FormGroup, FormBtn } from '../components/Form';
// import dotenv from "dotenv";
import ReactFilestack from 'filestack-react';

function Picture() {
	// const env = dotenv.config();
	// console.log(process.env.filestackAPI);
	const [picturePath, setPicturePath] = useState();
	const [caption, setCaption] = useState("");
	const [tripId, setTripId] = useState("");
	const [submission, setSubmission] = useState(false);

	function onSuccess(response) {
		console.log(response.filesUploaded[0].url);
		setPicturePath(response.filesUploaded[0].url);
	}

	function handleInputChange(event) {
		const { value } = event.target;
		setCaption(value);
		setPicturePath(picturePath);
	}

	useEffect(() => {
        let query = window.location.search
        query = query.split("=")
        setTripId(query[1]);
    });

	function addToGallery(event) {
		event.preventDefault();
		API.addPicture({
			picturePath: picturePath,
			caption: caption,
			tripId: tripId
		})
			.then(res => {
				console.log('Your picture was upload successfully!');
				console.log(res);
				setSubmission(true);
			})
			.catch(err =>  console.log(err));
	};

	if (submission) {
		return <Redirect to={`/gallery/${tripId}`} />
	}

	return (
		<Container>
			<Row className='mt-2'>
				<ReactFilestack
					apikey={"AG4hPSOMQruX3SKmPWtD0z"}
					mode={'pick'}
					onSuccess={(response) => onSuccess(response)}
					onError={(e) => console.log(e)}
					componentDisplayMode={{
						customText: <i class="fas fa-images"></i>,
						customColor: 'pink'
					}}
				/>
				<form>
					<Row>
						<Col size='md-6'>
							<FormGroup>
								<Label text='Add a caption' />
								<Input
									name='caption'
									value={caption}
									onChange={handleInputChange}
									placeholder='Caption This Photo'
								/>
							</FormGroup>
						</Col>
						<FormBtn
							text='Add Picture'
							onClick={addToGallery}
							classes='btn-primary'
						/>
					</Row>
				</form>
			</Row>
		</Container>
	);
}

export default Picture;
