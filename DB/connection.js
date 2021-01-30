var MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb+srv://aimnbrs:829365@cluster0.5dsrb.mongodb.net/sample_supplies?retryWrites=true&w=majority'

const connectionDb =  async (req, res) => {
    MongoClient.connect(URL, {
        useUnifiedTopology : true,
        useNewUrlParser : true
    }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sample_supplies");
        dbo.collection("sales").findOne({}, function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });
    
    
    
}

module.exports = connectionDb;