const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://felipe:87109930@cluster0-he4px.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// {origin: 'http://localhost:3000'}
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);