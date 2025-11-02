import mysql from "mysql2/promise";

const instanceConnection = process.env.INSTANCE_CONNECTION;

const sharedConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 5,
	queueLimit: 0,
};

let pool;

if (process.env.NODE_ENV === "development") {
	pool = mysql.createPool({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		...sharedConfig,
	});
} else {
	pool = mysql.createPool({
		socketPath: `/cloudsql/${instanceConnection}`,
		...sharedConfig,
	});
}

export default pool;
