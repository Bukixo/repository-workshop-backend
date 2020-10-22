const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');
cakeRoutes = require('./api/routes/cake.route');
config = require('./api/DB');

mongoose.Promise = global.Promise
mongoose.connect(config.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => { console.log('Database is connected') },
    err => { console.log('Unable to connect to the databse' + err) }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/cakes', cakeRoutes);

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
    console.log('Listening to port' + port);
})