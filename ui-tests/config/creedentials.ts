import dotenv from 'dotenv';
dotenv.config();

export const credentials = {
	username: process.env.ADMIN_USERNAME,
	password: process.env.ADMIN_PASSWORD
};