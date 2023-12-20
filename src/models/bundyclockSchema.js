import mongoose from 'mongoose';

const times = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    employee_id: {
        type: String,
        required: true,
    },
    morningTimeIn: {
        type: String,
        default: '',
    },
    morningTimeOut: {
        type: String,
        default: '',
    },
    afternoonTimeIn: {
        type: String,
        default: '',
    },
    afternoonTimeOut: {
        type: String,
        default: '',
    },
    breaktimeIn: {
        type: String,
        default: '',
    },
    breaktimeOut: {
        type: String,
        default: '',
    },
    overTimeIn: {
        type: String,
        default: '',
    },
    overTimeOut: {
        type: String,
        default: '',
    },
    overtime: {
        type: String,
        default: '',
    },
    normalhour: {
        type: String,
        default: '',
    },
    tardiness: {
        type: String,
        default: '',
    },
    workedHours: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        required: true,
    },
    holiday: String,
});


const bundy = mongoose.models.times || mongoose.model('times', times);

export default bundy;
