
class Service {
    constructor(model) {
        this.model = model;
        this.listAll = this.listAll.bind(this);
        // this.put = this.put.bind(this);
        // this.update = this.update.bind(this);
        // this.delete = this.delete.bind(this);
    }

    async listAll(query) {
        let { skip, limit } = query;
    
        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
    
        delete query.skip;
        delete query.limit;
    
        if (query._id) {
          try {
            query._id = new mongoose.mongo.ObjectId(query._id);
          } catch (error) {
            console.log("not able to generate mongoose id with content", query._id);
          }
        }
    
        try {
          let items = await this.model
            .find(query)
            .skip(skip)
            .limit(limit);
          let total = await this.model.count();
    
          return {
            error: false,
            statusCode: 200,
            data: items,
            total
          };
        } catch (errors) {
          return {
            error: true,
            statusCode: 500,
            errors
          };
        }
      }
}

module.exports = new Service;