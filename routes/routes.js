const passport = require('passport');
const express = require('express');
const router = express.Router();
const db = require('../models');
var isAuthenticated = require('../config/middleware/isAuthenticated');
const { mongo } = require('mongoose');

// USER PASSPORT ROUTES
router.post('/api/register', function (req, res) {
	console.log('registering user');

	//Do password validation here before attempting to register user, such as checking for password length, captial letters, special characters, etc.

	db.User.register(
		new db.User({ username: req.body.username, email: req.body.email }),
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
	console.log('available username');
	if (req.query.username) {
		db.User.find({ username: req.query.username })
			.then((result) => {
				res.json({ length: result.length });
			})
			.catch((err) => res.status(422).json(err));
	} else {
		res.json({ message: 'no username entered for query' });
	}
});

router.get('/api/authorized', isAuthenticated, function (req, res) {
	res.json(req.user);
});

// register a trip
router.post('/api/registerTrip', function (req, res) {
	console.log('registering trip');
	db.Trip.create({
		tripName: req.body.tripName,
		location: req.body.location,
		dates: {
			startDate: req.body.dates.startDate,
			endDate: req.body.dates.endDate,
		},
		password: req.body.password,
	})
		.then(({ _id }) =>
			db.User.findOneAndUpdate({}, { $push: { trips: _id } }, { new: true })
		)
		.then((dbTrip) => {
			res.json(dbTrip);
		})
		.catch((err) => {
			console.log(err);
		});
});

//add picture to gallery that has id of the specific trip
router.post('api/uploadphoto', function (req, res) {
	console.log('Your picture has been added to gallery.');
	db.Gallery.create({
		pictureUrl: req.body.pictureUrl,
		caption: req.body.caption,
	})
		.then(({ _id }) =>
			db.Trip.findOneAndUpdate({}, { $push: { pictures: _id } }, { new: true })
		)
		.then((dbGallery) => {
			res.json(dbGallery);
		})
		.catch((err) => {
			console.log(err);
		});
});

//findAll pictures that belong to a specific trip ID
router.get('/api/gallery/:id', function (req, res) {
	db.Trip.findById(req.params.id)
		.populate('pictures')
		.then((dbTrip) => {
			res.json(dbTrip);
		})
		.catch((err) => {
			res.json(err);
		});
});

// Get user info with populated trips
router.get('/api/user_data', (req, res) => {
	if (!req.user) {
		// The user is not logged in, send back an empty object
		res.json({});
	} else {
		db.User.findById(req.user.id)
			.populate('trips')
			.then((dbUser) => {
				res.json(dbUser);
			})
			.catch((err) => res.status(422).json(err));
		// Otherwise send back the user's email and id
		// Sending back a password, even a hashed password, isn't a good idea
		// res.json({
		// 	email: req.user.email,
		// 	id: req.user.id,
		// 	trips: req.user.trips,
		// });
	}
});

router.get('/trip/:id', (req, res) => {
	console.log(req.params.id)
	db.Trip.findById(req.params.id)
		.then(dbTrip => res.json(dbTrip))
		.catch((err) => res.status(422).json(err));
});

module.exports = router;
