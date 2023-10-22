import mongoose from 'mongoose';

const files = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
		unique: true,
    },
    hiredDate: {
        type: String,
		default: '',
    },
    pagibigNumber: {
        type: String,
		default: '',
    },
	philhealth: {
		type: String,
		default: '',
	},
	tinNumber:{
        type: String,
		default: '',
    },
    sss: {
		type: string,
		default: '',
	},
	note: {
		type: String,
		default: '',
	},
});


const employeefile = mongoose.models.files || mongoose.model('files', files);

export default employeefile;
