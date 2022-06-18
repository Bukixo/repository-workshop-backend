class Controller {
    constructor(service) {
        this.service = service;
        this.listAll = this.listAll.bind(this);
        // this.insert = this.insert.bind(this);
        // this.update = this.update.bind(this);
        // this.delete = this.delete.bind(this);
      }
    
      async listAll(req, res) {
        return res.status(200).send(await this.service.listAll(req.query));
      }

}

module.exports = new Controller;