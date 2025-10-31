import mysql from "mysql2/promise";

const instanceConnection = process.env.INSTANCE_CONNECTION;

const pool = mysql.createPool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,

	// Cloud SQL Unix socket
	socketPath: `/cloudsql/${instanceConnection}`,

	waitForConnections: true,
	connectionLimit: 5,
	queueLimit: 0,
});

export default pool;
