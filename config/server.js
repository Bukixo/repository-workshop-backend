
const express = require('express'),
bodyParser = require('body-parser'),
connection = require('../config/database'),
cors = require('cors')
setRoutes = require('../src/routes/cake.route');
// const server = express.Router();


// mongoose.Promise = global.Promise
// mongoose.connect(config.DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(() => { console.log('Database is connected') },
//     err => { console.log('Unable to connect to the databse' + err) }
// );

const server = express();
setRoutes(server);
server.use(bodyParser.json());
server.use(cors());
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/cakes', cakeRoutes);

module.exports = server;

// const port = process.env.PORT || 4000;

// const server = app.listen(port, function () {
//     console.log('Listening to port' + port);
// })