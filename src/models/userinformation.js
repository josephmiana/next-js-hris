import mongoose from 'mongoose';

const information = new mongoose.Schema({
    EmployeeInformation: {
        name: {
            type: String,
            required: true,
        },
        employee_id: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: '',
            required: false,
        },
        role: {
            type: String,
            required: true,
        }
    },
    PayInformation: {
        rate: {
            type: Number,
            required: true,
        },
    },
    Schedule: {
        startshiftperweek:{
            type: Number,
            required: true
        },
        endshiftperweek: {
            type: Number, 
            required: true,
        },
        startshift: {
            type: Number,
            required: true,
        },
        endshift: {
            type: Number,
            required: true,
        },
    },
    datecreated: {
        type: Date,
    }
});

const userinformation = mongoose.models.information || mongoose.model('information', information);

export default userinformation;
