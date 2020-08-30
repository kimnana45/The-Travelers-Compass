import React, { useState } from 'react';
import API from '../utils/API';
import { Row, Col, Container } from '../components/Grid';
import { Input, Label, FormGroup, FormBtn } from '../components/Form';
// import dotenv from "dotenv";
import ReactFilestack from 'filestack-react';

function Picture() {
	// const env = dotenv.config();
	// console.log(process.env.filestackAPI);
	const [picturePath, setPicturePath] = useState();
	const [caption, setCaption] = useState();
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

	function addToGallery(event) {
		event.preventDefault();
		API.addPicture({
			picturePath: picturePath,
			caption: caption,
		})
			.then(res => {
				console.log('Your picture was upload successfully!');
				console.log(res);
				setSubmission(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<Container>
			<Row className='mt-2'>
				<ReactFilestack
					apikey={"AG4hPSOMQruX3SKmPWtD0z"}
					mode={'pick'}
					// componentDisplayMode={{
					// 	type: 'button',
					// 	customText: <i class="fas fa-upload"></i>,
					// 	customColor: 'black'
					// }}
					onSuccess={(response) => onSuccess(response)}
					onError={(e) => console.log(e)}
					buttonText={'Pick File'}
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
