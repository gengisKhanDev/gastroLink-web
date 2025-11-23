import path from 'path';
import dotenv from 'dotenv';

if (Meteor.isServer) {
	const appRoot = process.env.PWD || process.cwd();
	const envPath = path.join(appRoot, '.env');

	dotenv.config({ path: envPath });

	if (!process.env.MAIL_URL) {
		console.error('MAIL_URL no está definida en el archivo .env');
	} else {
		console.log('MAIL_URL cargada correctamente ✅');
	}
}


if (Meteor.isServer) {
	process.env.MAIL_URL = "smtp://fer.hinojosa36@gmail.com:OVZWCMzh47f3t8S1@smtp-relay.brevo.com:587";
}