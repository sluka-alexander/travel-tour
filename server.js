const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 5000;

const Tour = require('./models/Tour');
const key = require('./keys/key');
let db;
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));

app.use('/', require('./routes/index'));


//---------ВЫВОД ВСЕГО СПИСКА ТУРОВ

app.get('/tours', (req, res) => {
    db.collection('tours').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
        }
        res.send(docs);
    })
});
//---------ВЫВОД ТУРА ПО ID

app.get('/tours/:id', (req, res) => {
    db.collection('tours').findOne({_id: ObjectId(req.params.id)}, (err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
});

//---------ДОБАВЛЕНИЕ ТУРА

app.post('/tours', (req, res) => {
    let tour = new Tour({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
    });
    tour.save()
        .then(function (doc) {
            console.log("Сохранен объект", doc);
            res.sendStatus(200);
            mongoose.disconnect();
        })
        .catch(function (err) {
            console.log(err);
            mongoose.disconnect();
        });
});

//---------РЕДАКТИРОВАНИЕ ТУРА ПО ID

app.put('/tours/:id', (req, res) => {
    db.collection('tours').updateOne({_id: ObjectId(req.params.id)},
        {$set: {name: req.body.name, category: req.body.category, price: Number(req.body.price)}},
        (err, docs) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        })
});

//---------УДАЛЕНИЕ ТУРА ПО ID

app.delete('/tours/:id', (req, res) => {
    db.collection('tours').deleteOne({_id: ObjectId(req.params.id)}, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
});

//---------ПОДКЛЮЧЕНИЕ MONGODB

mongoose.connect(key, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, database) => {
    if (err) {
        console.log(err);
    }
    db = database;
})
    .then(() => console.log('db connected...'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log('server started');
});


