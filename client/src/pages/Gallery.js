import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, CardContent } from '../components/Card';
import { Container } from '../components/Grid';
import Picture from './AddPicture';
import API from '../utils/API';

function Gallery() {
	const [pictureUrl, setPictureUrl] = useState();
	const [caption, setCaption] = useState();

	const { id } = useParams();
	useEffect(() => {
        API.getPictures(id)
            .then(res => {
			    console.log(res.data);
		    });
	}, []);

	return (
		<Container>
			<Card>
				<CardBody>"Hello World!"</CardBody>
			</Card>
		</Container>
	);
}

export default Gallery;
