# Introduction

A purely Frontend project made with HTML, CSS, JavaScript, Express, and SQLite. The implemented application allows users to write, execute, and view the results of SQL queries directly from a browser.

## Getting Started

### Installing SQLite

Ensure that you have SQLite installed. The database can be found in the 'bdd' directory. After extracting the database, don't forget to specify the absolute path on your machine in [app.js](./app.js).

### Installing Dependencies

```bash
npm install
```

### Starting the Server

```bash
node app.js
```

## Test Queries

To be executed on the application interface.

### Creating the `test` Table

```sql
CREATE TABLE test (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER
);
```

### Inserting into the Table

```sql
INSERT INTO test (nom, age) VALUES 
('Alice', 25),
('Bob', 30),
('Charlie', 35),
('David', 40),
('Emma', 22),
('Frank', 27),
('Grace', 32),
('Hannah', 37),
('Isaac', 42),
('Julia', 20),
('Kevin', 29),
('Linda', 34),
('Michael', 39),
('Natalie', 24),
('Oliver', 26),
('Patricia', 31),
('Quentin', 36),
('Rachel', 41),
('Samuel', 23),
('Tina', 28),
('Ursula', 33),
('Victor', 38),
('Wendy', 21),
('Xavier', 25),
('Yolanda', 30),
('Zack', 35),
('Amy', 22),
('Brian', 27),
('Cindy', 32),
('Daniel', 37);
```

### Modifying in the Table

```sql
UPDATE test SET name = 'Edli' WHERE age=25;
```

### Selecting from the Table

```sql
SELECT * FROM test;
```

### Deleting from the Table

```sql
DELETE FROM test WHERE age<=21;
```

### Adding a Column to the Table

```sql
ALTER TABLE test ADD COLUMN test_desc TEXT;
```

### Dropping the `test` Table

```sql
DROP TABLE test;
```
