const router = require('express').Router();
const User = require('./userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET ROUTES

router.get('/', (req, res) => {
	User.find()
	.then(users => res.status(200).json(users))
	.catch(err => res.status(500).json({ mes: 'Server Error', err}))
})

router.get('/:id', (req, res) => {
	User.findById(req.params.id)
	.then(users => res.status(200).json(users))
	.catch(err => res.status(500).json({mes: 'Server Error', err}))
})

 // ADD ROUTE

 router.post('/signup', (req, res) => {
 	let user = req.body

 	const hash = bcrypt.hashSync(user.password, 5)
 	user.password = hash
 	User.add(user)
 	.then(user => res.status(200).json(user))
 	.catch(err => res.status(500).json({mes:'Server Error', err}))
 })

 // LOGIN ROUTE

 router.post('/login', (req, res) => {
 	const { username, password } = req.body;
 	User.findBy({username: username})
 	.then(user => {

 	})
 })

 module.exports = router;