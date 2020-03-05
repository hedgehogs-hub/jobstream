const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getUsers = (req, res, next) => {
    User.getAllUsers((err,users) => {
        if(err) throw err;
        res.send({
            success: true,
            msg: {
                user: users
            }
        });
    })
};

exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err,user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success:false , msg: 'Invalid Email or Password'})
        }
        User.comparePassword(password, user.password, (err,isMatch) => {
            if(err) throw err;
            if(isMatch) {
                if(user.status){
                    const token = jwt.sign(user.toJSON(), process.env.DATABASE_SECRET, {
                        expiresIn: 60 * 60 * 2 //2 hours
                    });
                    user.lastLoginDate = new Date();
                    user.save();
                    console.log(user);
                    res.json({
                        success: true,
                        msg: {
                            expiresIn: 60*60*2,
                            token: 'JWT ' + token,
                            user: user
                        }
                    });
                }else {
                    return res.json({success: false, msg: "Sorry. You can't Sign In!!!"});
                }
            }else {
                return res.json({success: false, msg: 'Invalid Email or Password'});
            }
        })
    })
};

exports.addUser = (req, res, next) => {
    if(!(req.body.firstName || req.body.lastName)) {
        return res.json({success: false, msg: 'Fill in Name or Surname'})
    }
    if(req.body.password !== req.body.confPassword) {
        return res.json({success: false, msg: 'Password and Confirm Password do not match'})
    }
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    User.getUserByEmail(newUser.email, (err,user) => {
        if (user) {
            return res.json({success: false, msg: 'A registered user already exists with this Email'})
        }else {
            User.addUser(newUser, (err, user) => {
                if(err) {
                    res.json({success: false, msg: 'Failed'})
                }else {
                    User.getAllUsers((err,users) => {
                        if(err) throw err;
                        return res.send({
                            success: true,
                            msg: 'User Created Successfully'
                        });
                    })
                }
            });
        }
    });
};

exports.editUser = (req, res, next) => {
    if(!("status" in req.body)){
        console.log(1);
        if(!(req.body.firstName || req.body.lastName)) {
            return res.json({success: false, msg: 'Fill in Name or Surname'})
        }
        if(req.body.password !== req.body.confPassword) {
            return res.json({success: false, msg: 'Password and Confirm Password do not match'})
        }
        User.getUserById(req.body.id, (err,user) => {
            if(err) throw err;
            User.getUserByEmail(req.body.email, (err,userr) => {
                if (!userr || userr._id.toString() === user._id.toString()) {
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.email = req.body.email;
                    bcrypt.genSalt(10,(err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if(err) throw err;
                            console.log(hash);
                            user.password = hash;
                            user.save();
                        })
                    });
                    if(err) throw err;
                    return res.send({
                        success: true,
                        msg: 'User Updated Successfully'
                    });
                } else {
                    return res.json({success: false, msg: 'A registered user already exists with this Email'})
                }

            });

        });
    }else {
        User.getUserById(req.body._id, (err,user) => {
            if (err) {
                return res.json({success: false, msg: 'Something went wrong'})
            }
            user.status = req.body.status;
            user.save();
            return res.send({
                success: true,
                msg: 'Status Updated Successfully'
            });
        });
    }

};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.userId }, (err) => {
        if(err) {
            return res.json({success: false, msg: 'Something went wrong'});
        }else {
            return res.send({success: true, msg: 'User Successfully Deleted'});
        }
    });
}
