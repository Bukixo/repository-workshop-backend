const Service = require('../services/Services');

class CakeService extends Service {
    constructor(model) {
        super(model);
    }
};

module.exports = new CakeService;