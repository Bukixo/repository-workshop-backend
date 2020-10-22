const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cake = new Schema({
    CakeFlavour: {
        type: String
    },
    CakeTier: {
        type: Number
    },
    CakeImage: {
        type: String
    }
},
    {
        collection: 'Cake'
    });

    module.exports = mongoose.model('Cake', Cake);