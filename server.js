const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('./models/event');

const dbUrl = 'mongodb://localhost:27017/demo';
mongoose.connect(dbUrl)
    .then((result) => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB', err);
    })

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/events', (req, res) => {
    Event.find()
        .then((result) => {
            res.render('index', { title: 'All event', events: result })
        })
        .catch((err) => {
            console.error(err);
        })
})

app.post('/events', (req, res) => {
    const event = new Event(req.body);
    event.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
        });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});