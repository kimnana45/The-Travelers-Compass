import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { Card, CardBody, CardContent } from '../../components/Card';
import API from '../../utils/API';
import './style.css';
// import Jumbotron from "../components/Jumbotron";

function MembersDashboard() {
	const [usersTrips, setUsersTrips] = useState([]);
	const [userId, setUserId] = useState();
	const [username, setUsername] = useState();

	useEffect(() => {
		API.getUser()
			.then(res => {
				const { trips, username, _id } = res.data;
				setUsersTrips(trips);
				setUserId(_id);
				setUsername(username);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Container>
			<Row className='row mt-2 justify-content-md-center'>
				<Col size='md-8'>
					<Row className='row border border-info rounded-pill text-center p-2'>
						<Col size='4'>
							<Link to={'/'}>home</Link>
						</Col>
						<Col size='4'>
							<Link to={'/newtrip'}>plan new trip</Link>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col size='md-12'>
					{usersTrips.length ? (
						<Card>
							{usersTrips.map(trip=> (
								<CardBody key={trip._id}>
									<Link to={'/trip/' + trip._id}>
										<strong>
											{trip.tripName}
										</strong>
									</Link>
									{/* <CardContent text={trip.tripName} /> */}
								</CardBody>
							))}
						</Card>
					) : (
						<h3>Bummer! No trips planned yet!</h3>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default MembersDashboard;
