import mongoose from 'mongoose';

const payslip = new mongoose.Schema({
    employeeinformation: {
        name: {
            type: String,
            required: false,
        },
        employee_id: {
            type: String,
            default: '',
            required: false,
        },
        role: {
            type: String,
            default: '',
            required: false,
        },
    },
    taxableincome: {
        
        salary: {
            type: String,
            default: '',
            required: false,
        },
        
        totalhoursworked: {
            type: String,
            default: '',
            required: false,
        },
        overtime: {
            type: String,
            default: '',
        },
        normalhours: {
            type: String, 
            default: '',
            required: false,
        },
        totalovertime: {
            type: String,
            default: '',
        },
        rate: {
            type: String,
            default: '',
            required: false,
        },
       
        grossearnings: {
            type: String,
            required: false,
        },
    },
    deduction: {
        tax: {
            type: String,
            required: false,
        },
        pagibig: {
            type: String,
            required: false,
        },
        philhealth: {
            type: String,
            required: false,
        },
        sss: {
            type: String,
            required: false,
        },
        totalcontribution: {
            type: String,
            required: false,
        },
    },
    periodcovered: {
        type: String,
        required: false,
    },
    netpay: {
        type: String,
        default: "",
    },
    date: {
        type: String,
        required: false,
    }
});

const employeePayslip = mongoose.models.payslip || mongoose.model('payslip', payslip);

export default employeePayslip;
