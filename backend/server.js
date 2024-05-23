const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Baza danych
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, done BOOLEAN, isDaily BOOLEAN)');
});

// Endpointy
app.get('/todos', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.post('/todos', (req, res) => {
    const { task, isDaily } = req.body;
    console.log("Received task:", task, "Is Daily:", isDaily); // Dodaj ten wiersz
    if (!task) {
        return res.status(400).json({ "error": "Task content is required" });
    }
    db.run('INSERT INTO todos (task, done, isDaily) VALUES (?, ?, ?)', [task, false, isDaily], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, task, done: false, isDaily }
        });
    });
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM todos WHERE id = ?', id, function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({"message": "deleted", "changes": this.changes});
    });
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;
    db.run('UPDATE todos SET done = ? WHERE id = ?', [done, id], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id, done }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
