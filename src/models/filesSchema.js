import mongoose from 'mongoose';

const workfiles = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        default: '',
    },
    employee_id: {
        type: String,
        required: true,
    },
    hireddate: {
        type: String,
        default: '',
    },
    pagibig: {
        type: String,
        default: '',
    },
    philhealth: {
        type: String,
        default: '',
    },
    tin:{
        type: String,
        default: '',
    },
    sss:{
        type: String,
        default: '',
    }
});


const files = mongoose.models.workfiles || mongoose.model('workfiles', workfiles);

export default files;
