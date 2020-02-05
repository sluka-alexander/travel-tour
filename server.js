const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Schema = mongoose.Schema;

const app = express();
const PORT = 5000;

let tours = [];
let db;

const tourSchema = new Schema({
    name: String,
    category: String,
    price: Number,
});

const Tour = mongoose.model("tour", tourSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/tours', (req, res) => {
    db.collection('tours').find().toArray((err,docs)=>{
        if(err){
          console.log(err);
        }
        res.send(docs);
    })
});

app.post('/tours', (req, res) => {

    let tour = new Tour({
        name: req.body.name,
        price: req.body.price,
    });
    tour.save()
        .then(function(doc){
            console.log("Сохранен объект", doc);
            res.sendStatus(200);
            mongoose.disconnect();  // отключение от базы данных
        })
        .catch(function (err){
            console.log(err);
            mongoose.disconnect();
        });
});

app.put('/tours/:id', (req, res) => {
    let tour = tours.find((tour)=>{
        return tour.id === Number(req.params.id);
    });
    tour.name = req.body.name;
    res.send(tour);
});

app.delete('/tours/:id', (req, res) => {
    tours = tours.filter((tour)=>{
        return tour.id !== Number(req.params.id);
    });
    res.sendStatus(200);
});

mongoose.connect('mongodb+srv://slukasane:sluka12345678@test-cluster-bfg9t.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, database)=>{
    if(err){
        console.log(err);
    }
    db = database;
})
    .then(() => console.log('db connected...'))
    .catch(err => console.log(err));


app.listen(PORT, () => {
    console.log('server started');
});


