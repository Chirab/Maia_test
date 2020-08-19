const express = require('express');
const app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var port = process.env.PORT || 4000;
var bodyParser = require('body-parser');
const { mongoDB } = require('./util/config');
const productRouter = require('./routes/Product');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true})
const connection = mongoose.connection;
connection.once('open', () => {
        console.log("connected to mongodb")
    }
);

app.use('/product', productRouter);

app.listen(port, () => {
    console.log('server launched');
});
