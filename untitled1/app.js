const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const config = require('./config/db');

mongoose.connect(config.url, { useFindAndModify: false });
mongoose.connection.on('connected', () => {
    console.log('Connected to Db' + config.url);
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});

let app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// pasport(passport);
// let urlencoded = bodyParser.urlencoded({ extended: false});
app.use('/users', users);

app.get('/',  (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req,res) => {
   res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(port, () => {
    console.log('Server Started on port' + port);
});


