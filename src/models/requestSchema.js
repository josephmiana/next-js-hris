import mongoose from 'mongoose';

const requestfiles = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    employee_id:{
        type: String,
        required: true,
    },
    date: String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    requestfile:{
        type: String,
        required: true,
    },
    information: {
        employee_id:String,
        hireddate:String,
        pagibig:String,
        philhealth:String,
        tin:String,
        sss: String,
        
    },
    employment:{
        name: String,
        date: String,
        position: String,
    }
});


const requestedfiles = mongoose.models.requestfiles || mongoose.model('requestfiles', requestfiles);

export default requestedfiles;
