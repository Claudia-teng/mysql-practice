const express = require('express');
const req = require('express/lib/request');
const mysql = require('mysql');
const PORT = 3000;
require('dotenv').config();

const app = express();

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'mydb'
})

// Connect
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!')
})

// Create DB
app.get('/createDB', (req, res) => {
  let sql = 'CREATE DATABASE mydb';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created!')
  })
})

// Create table
app.get('/createTable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Table created!')
  })
})

// Insert post 1
app.get('/addPost1', (req, res) => {
  let post = {
    title: 'Post 1',
    body: 'This is Post 1'
  }
  let sql = 'INSERT INTO posts SET ?';
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post 1 added!')
  })
})

// Insert post 2
app.get('/addPost2', (req, res) => {
  let sql = 'INSERT INTO posts (title, body) VALUES ("Post 2", "This is Post 2")';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post 2 added!')
  })
})

// Select all post
app.get('/getPosts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts fetched!')
  })
})

// Select single customers
app.get('/getPosts/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post fetched!')
  })
})

// Update post
app.get('/updatePost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post updated!')
  })
})

// Delete post
app.get('/deletePost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post deleted!')
  })
})

// Drop table
app.get('/dropTable', (req, res) => {
  let sql = 'DROP TABLE posts';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Table deleted!')
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})