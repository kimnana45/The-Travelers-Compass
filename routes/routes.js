const passport = require('passport');
const express = require('express');
const router = express.Router();
const db = require('../models');
var isAuthenticated = require('../config/middleware/isAuthenticated');

// USER PASSPORT ROUTES
router.post('/api/register', function (req, res) {
	//Do password validation here before attempting to register user, such as checking for password length, capital letters, special characters, etc.
	db.User.register(
		new db.User({ firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, email: req.body.email }),
		req.body.password,
		function (err, user) {
			if (err) {
				console.log(err);
				return res.json(err);
			}
			passport.authenticate('local')(req, res, function (data) {
				res.json(req.user);
			});
		}
	);
});

router.post('/api/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json(info);
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.json(user);
		});
	})(req, res, next);
});

router.get('/api/logout', function (req, res) {
	req.logout();
	res.json({ message: 'logged out' });
});

router.get('/api/user', function (req, res) {
	const { username } = req.query;
	if (username) {
		db.User.find({ username: username })
			.then(result => res.json({ length: result.length }))
			.catch((err) => res.status(422).json(err));
	} else {
		res.json({ message: 'no username entered for query' });
	}
});

router.get('/api/authorized', isAuthenticated, function ({ user }, res) {
	res.json(user);
});

// register a trip
router.post('/api/registerTrip', function ({ body }, res) {
	const { tripName, location, dates, password, creatorId, uniqueCode } = body;
	db.Trip.create({
		tripName: tripName,
		location: location,
		dates: {
			startDate: dates.startDate,
			endDate: dates.endDate,
		},
		password: password,
		users: [creatorId],
		uniqueCode: uniqueCode
	})
		.then(({ _id }) => db.User.findOneAndUpdate({ _id: creatorId}, { $push: { trips: _id } }, { new: true }))
		.then(dbTrip => res.json(dbTrip))
		.catch(err => console.log(err));
});


//add picture to gallery that has id of the specific trip
router.post('api/uploadphoto', function ({ body }, res) {
	db.Gallery.create(body)
		.then(({ _id }) => db.Trip.findOneAndUpdate({}, { $push: { pictures: _id } }, { new: true }))
		.then(dbGallery => res.json(dbGallery))
		.catch(err => console.log(err));
});

//findAll pictures that belong to a specific trip ID
router.get('/api/gallery/:id', function (req, res) {
	db.Trip.findById(req.params.id)
		.populate('pictures')
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.json(err))
});

// Get user info upon login with populated trips
router.get('/api/user_data', ({ user }, res) => {
	if (!user) {
		res.json({});
	} else {
		db.User.findById(user.id)
			.populate('trips')
			.then(dbUser => res.json(dbUser))
			.catch(err => res.status(422).json(err));
	}
});

// Get trip details by trip id
router.get('/api/trip/:id', (req, res) => {
	let { id } = req.params;
	db.Trip.findById(id)
		.populate('users')
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});

// Join an existing trip with trip's unique code & pw
router.post('/api/jointrip', (req, res) => {
	const { code, password } = req.body;
	db.Trip.findOneAndUpdate(
		{ 
			uniqueCode: code,
			password: password
		}, 
		{ $push: { users: req.user._id } }, 
		{ new: true })
		.then(({ _id }) => db.User.findOneAndUpdate(
			{ _id: req.user._id}, 
			{ $push: { trips: _id } }, 
			{ new: true }))
	 	.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});

module.exports = router;