const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb+srv://slukasane:Sluka7207089@test-cluster-bfg9t.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('db connected...'))
    .catch(() => console.log('error...'));


app.use('/', express.static("public"));

app.listen(PORT, () => {
    console.log('server started');
});


