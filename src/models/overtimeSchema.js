import mongoose from 'mongoose';

const overtimehrs = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        default: '',
    },
    employee_id: {
        type: String,
        required: true,
    },
    overtime: {
        type: Number,
        default: '',
    },
    date:{
        type: Date,
        default: '',
    },
});


const overtimes = mongoose.models.overtimehrs || mongoose.model('overtimehrs', overtimehrs);

export default overtimes;
