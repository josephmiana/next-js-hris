import mongoose from 'mongoose';

const addempSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide full name'],
    },
    employee_id:{
        type: String,
        required: [true, 'Please provide ID'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
	position:{
        type: String,
        required: [true, 'Please provide position, new ']
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
});


const nUser = mongoose.models.newusers || mongoose.model('newusers', addempSchema);

export default nUser;
