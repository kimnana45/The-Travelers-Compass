import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInput } from 'react-hanger';
import ReactFilestack from 'filestack-react';
import { Card, CardBody, CardImage } from '../../components/Card';
import { FormBtn, FormGroup, Input, Small } from '../../components/Form';
import { Row, Col, Container } from '../../components/Grid';
import API from '../../utils/API';
import './style.css';

function Gallery() {
	const caption = useInput('');
	const [username, setUsername] = useState();
	const [picturePath, setPicturePath] = useState();
	const [pictures, setPictures] = useState([]);
	const [refreshPage, setRefreshPage] = useState(false);

	const { id } = useParams();
	useEffect(() => {
		API.getUser()
			.then(({ data }) => setUsername(data.username))
		API.getTripById(id)
			.then(({ data }) => setPictures(data.pictures))
			.catch((err) => console.log(err));
	}, [refreshPage]);

	function onSuccess(response) {
		setPicturePath(response.filesUploaded[0].url);
	}

	function addToGallery(event) {
		event.preventDefault();
		if (picturePath) {
			API.addPicture(id, {
				src: picturePath,
				caption: caption.value,
			})
				.then(({ data }) => {
					caption.setValue('');
					setPicturePath('')
					setRefreshPage(true)
				})
				.catch((err) => console.log(err));
		} else {
			return
		}
	}
	
	function deletePicture(picId, tripId) {
		API.deletePicture(picId, {tripId: tripId})
			.then(({data}) => setRefreshPage(true))
	};

	return (
		<Container fluid>
			<Row classes="mt-2 p-3">
				<Col size='md-3'>
					<form>
						<h3 id="subHeaderWord">upload new photo</h3><br/>
						<Row classes="justify-content-center">
							<Col size="md-10">
								<CardBody classes="mx-auto my-2">
									{picturePath ? (
										<CardImage src={picturePath} classes='mb-2 img-thumbnail' id="uploadPhoto" />
									) : (
										<CardImage
											src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
											classes='img-thumbnail'
										/>
									)}
								</CardBody>
								<ReactFilestack
										apikey={'AG4hPSOMQruX3SKmPWtD0z'}
										mode={'pick'}
										onSuccess={(response) => onSuccess(response)}
										onError={(e) => console.log(e)}
										componentDisplayMode={{
											type: 'button',
											customText: 'upload',
										}}
									/>
							</Col>
						</Row>
						<Row classes='mt-2'>
							<Col size="md-12">
								<FormGroup>
									<Input
										name='caption'
										value={caption}
										placeholder='Caption This Photo'
										{...caption.eventBind}
									/>
								<FormBtn
									text='Add Picture'
									onClick={addToGallery}
									classes='btn-danger mt-1'
								/>
								</FormGroup>
							</Col>
						</Row>
					</form>
				</Col>
				<Col size='md-9'>
					<Row>
						<h3 id="subHeaderWord" className="mx-auto">gallery</h3><br/>
					</Row>
					<Row id="galleryDiv" classes="justify-content-center p-1">
						{pictures.map((pic) => (
							<Card 
							key={pic._id} 
							classes="float-left border-dark mx-2">
								<CardImage 
									src={pic.src} 
									alt={`picture ${pic._id}`} id="galleryPhoto"
								/>
								<CardBody>
										<FormBtn
											classes='float-right btn-sm text-danger'
											text={<i className="far fa-times-circle"></i>}
											style={{ width: 'auto' }}
											onClick={() => deletePicture(pic._id, id)}
										/>
									<CardBody classes="ml-4">
									<strong>{username}</strong>
									</CardBody>
									<CardBody classes="ml-4 overflow-auto" style={{width: "240px", height: "50px"}}>
										{pic.caption ? (<Small text={pic.caption} />) : ""}
									</CardBody>
								</CardBody>
							</Card>
						))}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default Gallery;
