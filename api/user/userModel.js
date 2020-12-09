const db = require('../../data/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById
}

function add(body) {
	return db('users')
	.insert(body)
}

function find() {
	return db('users')
	.select('id', 'username', 'password')
}

function findBy(filter) {
	return db('users')
	.where(filter)
}


function findById(id) {
	return db('users')
	.where({ id })
	.first()
}