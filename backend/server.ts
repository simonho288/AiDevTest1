import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Ensure __dirname is defined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to SQLite database (create if it doesn't exist)
const db = new sqlite3.Database('./database.db');

app.use(express.json()); // Parse JSON request bodies

// Example route: Get all scores
app.get('/scores', async (req, res) => {
    try {
        const rows = await new Promise<any[]>((resolve, reject) => {
            db.all("SELECT * FROM scores ORDER BY score DESC", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        res.json(rows);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Example route: Submit a new score
app.post('/scores', async (req, res) => {
    try {
        const { username, score } = req.body;
        if (!username || !score) {
            return res.status(400).send('Missing username or score.');
        }

        const result = await new Promise<{ id: number, username: string, score: number }>((resolve, reject) => {
            db.run("INSERT INTO scores (username, score) VALUES (?, ?)", [username, score], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, username, score });
                }
            });
        });

        res.status(201).json(result);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

// Serve static files (optional: if you want to serve the frontend from the backend)
//app.use(express.static(path.join(__dirname, '../frontend')));

async function initialize() {
    try {
        await new Promise<void>((resolve, reject) => {
            db.run(`
                CREATE TABLE IF NOT EXISTS scores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    score INTEGER NOT NULL
                )
            `, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        console.log('Connected to the database.');

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Error during initialization:', err);
    }
}

initialize();