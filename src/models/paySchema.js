import mongoose from 'mongoose';

const paySchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: [true, 'Please provide ID'],
        unique: true,
    },
    daysofWork: {
        type: Number,
        required: [true, 'Please put days']
    },
    rateperDay: {
        type: Number,
        required: true,
    },
});

const pay = mongoose.models.pay || mongoose.model('pay', paySchema);

export default pay;
