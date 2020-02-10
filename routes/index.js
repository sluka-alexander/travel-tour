const express = require('express');
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
    const { name, email, password } = req.body;
    let errors = [];

    // const input = document.getElementsByTagName('input');
    // input.value = localStorage.getItem('input');
    // input.oninput = () => {
    //     localStorage.setItem('input', input.value)
    // };

    if(!name || !email || !password) {
        errors.push({msg: 'Please fill in all fields'})
    }
    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password
        });
    }
    else {
        res.send(req.body);
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        user.save()
            .then(function(doc){
                console.log("saved user", doc);
                res.sendStatus(200);
                mongoose.disconnect();
            })
            .catch(function (err){
                console.log(err);
                mongoose.disconnect();
            });
    }
});

module.exports = router;