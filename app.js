const express = require('express'); 
const sqlite3 = require('sqlite3').verbose(); 
const path = require('path'); 
const app = express(); 
const port = 3000; 

const db = new sqlite3.Database('D:/sqlite_database/sql_editor.db');
console.log('Connected to SQLite database');

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming JSON data
app.use(express.json());

// Endpoint to handle POST requests for executing SQL queries
app.post('/query', (req, res) => {
    const query = req.body.query;
    console.log('Received query:', query);

    // Determine the type of query
    const queryType = getQueryType(query);

    // Execute the SQL query based on the query type
    if (queryType === 'SELECT') {
        // Use db.all() for SELECT queries
        db.all(query, (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ results: rows });
        });
    } else {
        // Use db.run() for other types of queries
        db.run(query, (err) => {
            if (err) {
                console.error('Error executing query:', err);
                // Check if the error message indicates a syntax error
                if (err.message.includes('syntax error')) {
                    res.status(400).json({ error: 'Syntax error in SQL query' });
                } else {
                    res.status(500).json({ error: err.message });
                }
                return;
            }
            // Generate and send an appropriate message based on the query type
            const message = getMessageForQueryType(queryType);
            res.json({ message: message });
        });
    }
});

// Start the Express server and listen for incoming connections
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Function to determine the type of SQL query
function getQueryType(query) {
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery.startsWith('select')) {
        return 'SELECT';
    } else if (trimmedQuery.startsWith('insert')) {
        return 'INSERT';
    } else if (trimmedQuery.startsWith('update')) {
        return 'UPDATE';
    } else if (trimmedQuery.startsWith('delete')) {
        return 'DELETE';
    } else if (trimmedQuery.startsWith('create')) {
        return 'CREATE';
    } else if (trimmedQuery.startsWith('alter')) {
        return 'ALTER';
    } else if (trimmedQuery.startsWith('drop')) {
        return 'DROP';
    } else {
        return 'OTHER';
    }
}

// Function to get a message based on the type of SQL query
function getMessageForQueryType(queryType) {
    switch (queryType) {
        case 'SELECT':
            return 'Query executed successfully. Results displayed below.';
        case 'INSERT':
            return 'Record(s) inserted successfully.';
        case 'UPDATE':
            return 'Record(s) updated successfully.';
        case 'DELETE':
            return 'Record(s) deleted successfully.';
        case 'CREATE':
            return 'Table created successfully.';
        case 'ALTER':
            return 'Table altered successfully.';
        case 'DROP':
            return 'Table dropped successfully.';
        default:
            return 'Query executed successfully.';
    }
}
