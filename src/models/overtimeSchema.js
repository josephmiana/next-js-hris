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
        type: String,
        default: '',
    },
    date:{
        type: date,
        default: '',
    },
});


const overtime = mongoose.models.overtimehrs || mongoose.model('overtimehrs', overtimehrs);

export default overtime;
