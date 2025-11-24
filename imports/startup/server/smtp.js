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