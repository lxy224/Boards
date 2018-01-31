const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	username: String,
	password: String,
	time: Number,
	code: String,
	valid: Boolean
});

const model = mongoose.model('email_validation', schema);

module.exports = model;