import mongoose, { Schema } from 'mongoose';

const UserSignup = new Schema({

	email: {
		type: String,
		required: true
	},
	name:{
		type: String,
		required:true
	},
	username: {
		type: String,
		required:true
	},
	password: {
		type: String,
		required:true
	}
});

export default mongoose.model('UserSignup', UserSignup);