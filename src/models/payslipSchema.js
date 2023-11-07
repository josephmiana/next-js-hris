import mongoose from 'mongoose';

const payslip = new mongoose.Schema({
    EmployeeInformation: {
        name: {
            type: String,
            required: true,
        },
        employee_id: {
            type: String,
            default: '',
            required: true,
        },
        position: {
            type: String,
            default: '',
            required: true,
        },
    },
    TaxableIncome: {
        salary: {
            type: String,
            default: '',
            required: true,
        },
        overtime: {
            type: String,
            default: '',
            required: true,
        },
        grossEarnings: {
            type: Number,
            required: true,
        },
    },
    Deductions: {
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
});

const employeePayslip = mongoose.models.payslip || mongoose.model('payslip', payslip);

export default employeePayslip;
