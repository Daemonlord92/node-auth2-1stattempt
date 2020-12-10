const router = require('express').Router();
const User = require('./userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || "secret";

// GET ROUTES

router.get('/', restrict,  (req, res) => {
	User.find()
	.then(users => res.status(200).json(users))
	.catch(err => res.status(500).json({ mes: 'Server Error', err}))
})

router.get('/:id', restrict, (req, res) => {
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
 		if (user && bcrypt.compareSync(password, user.password)) {
 			const token = generateToken(user);
 			res.status(201).json({ mes: `Welcome, ${user.username}`, token})
 		} else {
 			res.status(401).json({mes:'Can not continue!'})
 		}
 	})
 	.catch(err => res.status(500).json({mes: 'Server Error', err}))
 })

// TOKEN FUNCTION

 function generateToken(user) {
    console.log(user)
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '2h'
  };

  //const secret = process.env.JWT_SECRET || "a secure secret";

  const token = jwt.sign(payload, secret, options);
  return token;
};

function restrict() {
	return (req, res, next) => {
		try {
			// get the token value from a cookie, which is automatically sent from the client
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json({
					message: "You shall not pass!",
				})
			}

			// make sure the signature on the token is valid and still matches the payload
			// (we need to use the same secret string that was used to sign the token)
			jwt.verify(token, process.env.SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "You shall not pass!",
					})
				}

			

				// make the token's decoded payload available to other middleware
				// functions or route handlers, in case we want to use it for something
				req.token = decoded

				// at this point, we know the token is valid and the user is authorized
				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

 module.exports = router;