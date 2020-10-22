const express = require('express');
const app = express();
const cakeRoutes = express.Router();

let Cake = require('../models/Cake');

cakeRoutes.route('/add').post(function (req, res) {
    let cake = new Cake(req.body);
    cake.save()
    .then(cake => {
        res.status(200).json({ 'Cake': 'Cake as been added successfully'})
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

cakeRoutes.route('/').get(function (req, res) {
    Cake.find(function (err, cakes) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(cakes);
        }
    });
});

cakeRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Cake.findById(id, function (err, cake) {
        console.log(cake);
        res.json(cake);
    });
});

cakeRoutes.route('/update/:id').post(function (req, res) {
    Cake.findById(req.params.id, function (err, cake) {
        if (!cake)
        res.status(404).send("Record not found");
        else {
            cake.CakeFlavour = req.body.CakeFlavour;
            cake.CakeImage = req.body.CakeImage;
            cake.CakeTier = req.body.CakeTier;

            cake.save().then(member => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});

cakeRoutes.route('/delete/:id').get(function (req, res) {
    Cake.findByIdAndRemove({ _id: req.params.id }, function (err, cake) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = cakeRoutes;