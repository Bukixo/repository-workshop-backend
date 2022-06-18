if nodemon server isnt running sudo npm install -g --force nodemon

install mongo 
run mongo community

1) lets create our folder structure
mkdir config src src/controllers src/services src/helpers

2) move our server.js into the config file

3) lets refactor our code

3.1)

Nest we will export our server in our server.js

~~~
module.exports = server;
~~~

And move the following code into the index.js
~~~
const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
    console.log('Listening to port' + port);
})

~~~

into index.js and require the server

~~
const server = require('./config/server.js');
~~~

((change config to connection))

stays the same
~~~
const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');
cakeRoutes = require('./api/routes/cake.route');
connection = require('../config/database');
~~~~


Next we want to remove this
// mongoose.connect(config.DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(() => { console.log('Database is connected') },
//     err => { console.log('Unable to connect to the databse' + err) }
// );

and also replace these three lines of code 
~~~
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/cakes', cakeRoutes);
~~~

with these two lines 

sserver.use(bodyParser.json());
server.use(cors());

At this point when you run nodemon, it should be listening on a port in your console
[add image]


SETUP Database
move database (db.js) insode config folder.

Copy the commeneted code about the mongo connection and paste it into the database.js.

inside the file keep the url 'mongodb://localhost:27017/cakeServer'
 but remove everything else

At the top of the file we makse sure to require mongoose. Then we create a class called Connection. Inside the class we define the url, so move the url into the definition. We will also add a log using console log for reassrucance that we have established a connection.

Then go back to your server.js and cut the all the mongoose config and paste it into the databse.js.

Lastly, we will export our class.
That way we can make use of our connection class multiple times when we have only created one instance (singleton instance)
this is what we expect to see

//database.js

const mongoose = require('mongoose');

class Connection {
  constructor() {
    const url =
    process.env.MONGODB_URI || `mongodb://localhost:27017/cakeServer`;
    console.log("Establish new connection with url", url);
    mongoose.Promise = global.Promise;
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
  }
}

module.exports.Connection = new Connection;

Inside index.js we import our database

const server = require('./config/server.js');

Check if youre database is running by running nodemon. At this point you should see the log we wrote in out ocnsole.log

[image]

We leave our model the way it is, all we do is move our current models file into the src folder

Next we create our API that will contain all of our CRUD functions. Using dependency injection, we will be able to then use the services inherit other services, so that the functionality becomes availble across the application wuthout duplicating out code.

inside //src/services/Services.js
lets create a services.js file


