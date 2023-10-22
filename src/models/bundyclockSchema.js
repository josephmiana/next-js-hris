import mongoose from 'mongoose';

const time = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
		unique: true,
    },
    time_in: {
        type: String,
        default: '',
    },
    time_out: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: new Date().toDateString,
    },
});


const bundy = mongoose.models.time || mongoose.model('time', time);

export default bundy;
