// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
//
// const tourRouter = require('./routes/tour');
//
// const PORT = process.env.PORT || 3000;
// const publicPath = path.join(__dirname,'public');
//
// const app = express();
//
// app.use('/api/tours',tourRouter);
// app.use(express.static(publicPath));
// app.listen(PORT, () => {
//     console.log('server started');
// });
//
// mongoose.connect('mongodb+srv://slukasane:Sluka7207089@test-cluster-bfg9t.mongodb.net/test?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('db connected...'))
//     .catch(err => console.log(err));
//

//----------------------------------------------
const express = require('express');

const app = express();

const PORT = 5000;

let tours = [
    {
        id: 1,
        name: 'Belarus'
    },
    {
        id: 2,
        name: 'Island'
    }
];
app.get('/', (req, res) => {
    res.send('hello')
});

app.get('/tours', (req, res) => {
    res.send(tours);
});

app.get('/tours/:id', (req,res)=>{
    console.log(req.params.id);
    let tour = tours.find((tour)=>{
        return tour.id
    });
});

app.listen(PORT, () => {
    console.log('server connected')
});




