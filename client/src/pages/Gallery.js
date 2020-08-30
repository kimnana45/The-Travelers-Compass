import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody } from '../components/Card';
import { Container } from '../components/Grid';
import API from '../utils/API';

function Gallery() {
	const [picturePath, setPicturePath] = useState();
	const [caption, setCaption] = useState();

	const { id } = useParams();
	useEffect(() => {
		API.getPictures(id)
			.then(res => {
				console.log(res.data);
				const { picturePath, caption } = res.data;
				setPicturePath(picturePath);
				setCaption(caption);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<Container>
			<Card>
				<CardBody>
					<img src={picturePath} />
					<p>{caption}</p>
				</CardBody>
			</Card>
		</Container>
	);
}

export default Gallery;
