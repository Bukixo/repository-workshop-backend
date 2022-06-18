const controller = require('./Controller');
const CakeService = require('../services/cakeService');
const Cake = require('../models/Cake');

const cakeService = CakeService(
    new Cake().getInstance()
);

class CakeController extends controller {
    constructor(service) {
        super(service);
    }
}

module.exports = new CakeController(cakeService);
