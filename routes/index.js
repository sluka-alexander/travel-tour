const express = require('express');
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
    res.send(req.body);
});




module.exports = router;