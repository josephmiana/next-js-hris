import mongoose from 'mongoose';

const payslip = new mongoose.Schema({
    employeeinformation: {
        name: {
            type: String,
            required: true,
        },
        employee_id: {
            type: String,
            default: '',
            required: true,
        },
        role: {
            type: String,
            default: '',
            required: true,
        },
    },
    taxableincome: {
        salary: {
            type: Number,
            default: '',
            required: true,
        },
        overtime: {
            type: Number,
            default: '',
            required: true,
        },
        grossearnings: {
            type: Number,
            required: true,
        },
    },
    deduction: {
        tax: {
            type: Number,
            required: false,
        },
        pagibig: {
            type: Number,
            required: true,
        },
        philhealth: {
            type: Number,
            required: true,
        },
        sss: {
            type: Number,
            required: true,
        },
        totalcontribution: {
            type: Number,
            required: true,
        },
    },
    netpay: {
        type: Number,
        default: '',
    },
    date: {
        type: Date,
        required: true,
    }
});

const employeePayslip = mongoose.models.payslip || mongoose.model('payslip', payslip);

export default employeePayslip;
