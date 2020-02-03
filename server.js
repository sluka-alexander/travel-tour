const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
//
app.get('/register', function(req, res) {
    res.send('register');
});

app.listen(PORT, ()=>{
    console.log('server started');
});


