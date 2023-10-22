import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide username'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: String,
	forgotPasswordTokenExpiry: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
	Religion: String,
	Birthplace: String,
	status: String,
	gender: String,
	Phone: String,
	blk : String,
	street: String,
	barangay: String,
	city: String,
	region: String,
	zip: String,
	height: String,
	weight: String,
	blood: String,
	medHistory: String,
	skills: String,
	hobbies: String,
});


const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
