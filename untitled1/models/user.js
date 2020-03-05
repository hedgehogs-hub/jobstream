const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    lastLoginDate: {
        type: Date
    }
});

const User = module.exports = mongoose.model('User', UserSchema);


module.exports.seedUser = function () {
    let newUser = new User({
        firstName: 'Arto',
        lastName: 'Hayrapetyan',
        email: 'arto.hayrapetyan@gmail.com',
        password: 'art123'
    });
    User.getUserByEmail(newUser.email, (err,user) => {
        if (user) {
            return false;
        }else {
            User.addUser(newUser, (err, user) => {
                if(err) {
                    return false;
                }
                return true;
            });
        }
    });
};
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
    const query = {email: email};
    User.findOne(query, callback);
};
module.exports.getAllUsers = function (callback) {
    User.find(callback);
};
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
};
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null,isMatch);
    })
};
