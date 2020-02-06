const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const Tour = require('./models/Tour');
const User = require('./models/User');
const key = require('./keys/key');

const app = express();
const PORT = 5000;

let tours = [];
let db;

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

app.get('/users', (req, res) => {
    db.collection('users').find().toArray((err,docs)=>{
        if(err){
          console.log(err);
        }
        res.send(docs);
    })
});



app.get('/tours/:id', (req, res) => {
    db.collection('tours').findOne({ _id: ObjectId(req.params.id) }, (err,docs)=>{
        if(err){
          console.log(err);
            return res.sendStatus(500);
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
    db.collection('tours').updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: req.body.name } },
        { upsert: true }, (err,docs)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
});

app.delete('/tours/:id', (req, res) => {
    db.collection('tours').deleteOne({ _id: ObjectId(req.params.id) }, (err, result)=>{
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
});

mongoose.connect(key, {
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


