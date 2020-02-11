const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome');
});

//LOGIN PAGE
router.get('/login', (req, res) => {
    res.render('login');
});

//REGISTER PAGE
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
        const {name, email, password} = req.body;

        let errors = [];
        let success = 'Congratulations, now you are registered and can log in!';

        if (!name || !email || !password) {
            errors.push({msg: 'Please fill in all fields'})
        }

        if (password.length < 7) {
            errors.push({msg: 'Please enter password more then 6 simbols'})
        }
        if (errors.length > 0) {
            res.render('register', {
                errors,
                name,
                email,
                password,
            });
        } else {
            User.findOne({email: email}).then(user => {
                if (user) {
                    errors.push({msg: 'Email already exists'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                    });
                } else {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, function (err, hash) {
                            if (err) throw err;
                            user.password = hash;

                            user.save()
                                .then((doc) => {
                                    console.log("saved user", doc);
                                    res.redirect('/login');
                                    mongoose.disconnect();
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    mongoose.disconnect();
                                });
                        });
                    });
                }
            })
        }
    }
);

module.exports = router;