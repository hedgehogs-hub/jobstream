const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useFindAndModify: false });
mongoose.connection.on('connected', () => {
    console.log('Connected to Db' + process.env.DATABASE_URL);
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});


let app = express();

const users = require('./routes/users');
const indeed = require('./routes/users');


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
// pasport(passport);
// let urlencoded = bodyParser.urlencoded({ extended: false});
app.use('/users', users);
app.use('/indeed', indeed);

app.get('/',  (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req,res) => {
   res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(process.env.PORT, () => {
    console.log('Server Started on port' + process.env.PORT);
});


