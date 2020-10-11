const MongoClient  = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017';
// const dbo = MongoClient.connect("mongodb://localhost:27017")
// .then (db=>{
//     let dbase = db.db("demo"); //here
    
//     return dbase;
// })
// .catch(err => console.log('Database Connection Failed! Bad Config: ', err))
// module.exports = dbo;

let _db = [];

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
            _db = client.db('demo');
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
};