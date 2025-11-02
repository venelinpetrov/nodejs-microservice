import express from 'express';
import cors from 'cors';
import pool from "./db.js";

const VERSION_INFO = {
	version: process.env.BUILD_VERSION || 'unknown',
	commit: process.env.BUILD_COMMIT || 'unknown',
	built_at: process.env.BUILD_TIME || new Date().toISOString()
};
const allowedOrigin = process.env.ALLOWED_ORIGIN;

const app = express();

app.use(cors({
	origin: allowedOrigin,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	credentials: false,
}));

app.get('/', async (req, res) => {
	res.send('Hi!');
});

app.get("/users", async (req, res) => {
	const [rows] = await pool.query("SELECT * FROM users");
	res.json(rows);
});

app.get('/version', async (req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(VERSION_INFO, null, 2));
});

export default app;
