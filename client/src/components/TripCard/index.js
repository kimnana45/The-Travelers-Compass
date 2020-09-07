import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { Col, Row } from '../../components/Grid';
import { FormBtn } from '../../components/Form';
import { CardBody } from '../../components/Card';

function TripCard({ trip, deleteTrip, removeTravelerFromTrip, userId }) {
    let currentDate = moment().format('YYYY-MM-D');
    let checkIsBefore = moment(currentDate).isBefore(trip.dates.startDate);

	return (
        <CardBody key={trip._id} classes='p-2 m-1 border rounded-lg text-center'>
            {trip.creator === userId ? (
                <FormBtn
                    classes='float-right btn-sm text-danger'
                    text='delete trip'
                    style={{ width: 'auto' }}
                    onClick={() => deleteTrip(trip._id)}
                />
            ) : (
                <FormBtn
                    classes='float-right btn-sm text-danger'
                    text='remove me from this trip'
                    style={{ width: 'auto' }}
                    onClick={() => removeTravelerFromTrip(userId, trip._id)}
                />
            )}
            {checkIsBefore && (<Moment fromNow>{trip.dates.startDate}</Moment>)}
            <Link to={`/trip/${trip._id}`} key={trip._id}>
                <FormBtn
                    classes='float-left btn-sm text-info'
                    text='view itinerary'
                    style={{ width: 'auto' }}
                />
                <br />
            </Link>
            <h3 id='subHeaderWord' className='mt-2 mb-4 text-center'>
                {trip.tripName}
            </h3>
            <Row>
                <Col size='md-4'>
                    <i className='far fa-compass fa-2x mx-auto'></i>
                    <p className='text-center'>
                        {trip.location[0].name +
                            ', ' +
                            (trip.location[0].administrative
                                ? trip.location[0].administrative
                                : trip.location[0].country)}
                    </p>
                </Col>
                <Col size='md-4'>
                    <i className='fas fa-calendar-alt fa-2x mx-auto'></i>
                    <p className='text-center'>
                        {moment(trip.dates.start).format('MMM Do YY')} -{' '}
                        {moment(trip.dates.end).format('MMM Do YY')}
                    </p>
                </Col>
                <Col size='md-4'>
                    <small className="m-0 p-0">share this code to allow others to join</small>
                    <p className='text-center'>{trip.uniqueCode}</p>
                    <small className="m-0 p-0 text-monospace">[pw: {trip.password}]</small> 
                </Col>
            </Row>
        </CardBody>
    )
}

export default TripCard;