import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true,
		},
		fullName: {
			type: String,
			require: true,
		},
		passwordHash: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
			require: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', UserSchema);
