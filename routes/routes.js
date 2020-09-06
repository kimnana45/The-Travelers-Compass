const passport = require('passport');
const express = require('express');
const router = express.Router();
const db = require('../models');
var isAuthenticated = require('../config/middleware/isAuthenticated');
const { query } = require('express');

// USER PASSPORT ROUTES
//register a user
router.post('/api/register', function (req, res) {
	//Do password validation here before attempting to register user, such as checking for password length, capital letters, special characters, etc.
	const { firstName, lastName, username, email, profilePic, password } = req.body;
	db.User.register(
		new db.User({
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			profilePic: profilePic
		}), password,
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
//user log in route
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
//user log out route
router.get('/api/logout', function (req, res) {
	req.logout();
	res.json({ message: 'logged out' });
});
//route to find a specific username
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
// Get user data
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
router.get('/api/authorized', isAuthenticated, function ({ user }, res) {
	res.json(user);
});


//TRIP ROUTES
// register a trip
router.post('/api/trip', function ({ body }, res) {
	const { tripName, location, dates, password, creatorId, uniqueCode, emergencyContact } = body;
	db.Trip.create({
		tripName: tripName,
		location: location,
		dates: {
			startDate: dates.startDate,
			endDate: dates.endDate,
		},
		password: password,
		creator: creatorId,
		travelers: [creatorId],
		uniqueCode: uniqueCode
	})
		.then(({ _id }) => db.User.findOneAndUpdate({ _id: creatorId }, { $push: { trips: _id } }, { new: true }))
		.then(dbTrip => res.json(dbTrip))
		.catch(err => console.log(err));
});
//find trip by its id
router.get('/api/trip/:id', (req, res) => {
	let { id } = req.params;
	db.Trip.findById(id)
		.populate('travelers')
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});
// Delete trip by trip Id & remove trip Id's from users
router.delete('/api/trip/:id', (req, res) => {
	let { id } = req.params;
	db.Trip.findByIdAndRemove({ _id: id })
		.then(dbTrip => db.User.updateMany(
			{ _id: { $in: dbTrip.travelers } },
			{ $pull: { trips: { $in: id } } },
			{ new: true }))
		.then(dbTrip => res.json(dbTrip))
});
// Join an existing trip with trip's unique code & pw
router.put('/api/jointrip', (req, res) => {
	const { code, password } = req.body;
	db.Trip.findOneAndUpdate(
		{
			uniqueCode: code,
			password: password
		},
		{ $push: { travelers: req.user._id } },
		{ new: true })
		.then(({ _id }) => db.User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $push: { trips: _id } },
			{ new: true }))
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});
// Delete a traveler from an existing trip & remove trip from the traveler
router.put('/api/trip', (req, res) => {
	let { userId, tripId } = req.body;
	db.Trip.findOneAndUpdate(
		{ _id: tripId },
		{ $pull: { travelers: { $in: userId } } },
		{ new: true })
		.then(({ _id }) => db.User.updateOne(
			{ _id: userId },
			{ $pull: { trips: { $in: tripId } } },
			{ new: true }))
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});
//Route to save emergency contact info
router.put('/api/trip/emergencyContact', function (req, res) {
	const { id, name, number } = req.body;
	db.User.findOneAndUpdate(
		{ _id: id },
		{
			$set:
			{
				emergencyContact: {
					name: name,
					number: number
				}
			}
		},
		{ new: true })
		.then(dbUser => res.json(dbUser))
		.catch(err => console.log(err))
});
//Route to add flights on the trip
router.put('/api/trip/:id/flight', function (req, res) {
	const { body } = req;
	const { id } = req.params;
	db.Trip.findOneAndUpdate(
		{ _id: id },
		{ $push: { flights: body } },
		{ new: true })
		.then(dbTrip => res.json(dbTrip.flights))
		.catch(err => console.log(err))
});
//Route to add lodging on the trip
router.put('/api/trip/:id/lodging', function (req, res) {
	const { body } = req;
	const { id } = req.params;
	db.Trip.findOneAndUpdate({ _id: id }, { $push: { lodging: body } }, { new: true })
		.then(dbTrip => res.json(dbTrip.lodging))
		.catch(err => console.log(err))
});
//Route to remove lodging on the trip
router.put('/api/trip/:tripId/lodging/:lodgingId', function (req, res) {
	const { tripId, lodgingId } = req.params;
	console.log(req.params)
	db.Trip.findByIdAndUpdate({ _id: tripId }, { $pull: { lodging: { _id: lodgingId } } }, { new: true })
		.then(dbTrip => res.json(dbTrip))
		.catch(err => console.log(err));
});


// PICTURE ROUTES
// add picture 
router.put('/api/trip/:id', function (req, res) {
	const { id } = req.params;
	const { body } = req;
	db.Trip.findOneAndUpdate(
		{ _id: id },
		{
			$push:
				{ pictures: body }
		},
		{ new: true })
		.then(dbUser => res.json(dbUser))
		.catch(err => console.log(err))
});
// delete picture 
router.put('/api/trip/picture/:picId', function (req, res) {
	const { picId } = req.params;
	const { tripId } = req.body;
	db.Trip.update(
		{ _id: tripId },
		{ $pull: { pictures: { _id: picId } } },
		{ new: true })
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});


//IDEAS ROUTES
//route to add the idea
router.put('/api/trip/:id/ideas', function (req, res) {
	db.Trip.findByIdAndUpdate({ _id: req.params.id }, { $push: { toDos: req.body } }, { new: true })
		.then(dbTrip => res.json(dbTrip.toDos))
		.catch(err => console.log(err));
});

//route to delete the idea 
router.put('/api/trip/:tripId/ideas/:ideaId', function (req, res) {
	db.Trip.findByIdAndUpdate({ _id: req.params.tripId }, { $pull: { toDos: { _id: req.params.ideaId } } }, { new: true })
		.then(dbTrip => res.json(dbTrip))
		.catch(err => console.log(err));
});


//BUDGET & TRANSACTION ROUTES
//route to add transaction
router.put('/api/trip/:id/transaction', function (req, res) {
	db.Trip.findByIdAndUpdate({ _id: req.params.id }, { $push: { expenses: req.body } }, { new: true })
		.then(({ expenses }) => res.json(expenses[expenses.length - 1]))
		.catch(err => console.log(err));
});
//route to remove a transaction
router.put('/api/trip/:tripId/transaction/:transactionId', function (req, res) {
	console.log(req.params)
	db.Trip.findByIdAndUpdate({ _id: req.params.tripId }, { $pull: { expenses: { _id: req.params.transactionId } } }, { new: true })
		.then(dbTrip => res.json(dbTrip))
		.catch(err => console.log(err));
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'built', 'index.html'))
});

module.exports = router;
