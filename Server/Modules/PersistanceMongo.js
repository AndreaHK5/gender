module.exports = storage;
var mongodb = require('mongodb');


function storage(connectionString) {
    'use strict';

    return {
      Update : Update,
      Read : Read,
    }

    var MongoClient = mongodb.MongoClient;

    function Update(newObject) {     
      MongoClient.connect(connectionString, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          newObject.title = "Votes Registry";
          var votesCollection = db.collection("votes");

          votesCollection.update({title : "Votes Registry"},newObject, true);

          db.close();
        }
      });
    }   

    function Read() {
      var deferred = Promise.defer();
      
      MongoClient.connect(connectionString, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
          deferred.reject(err);
        } else {
        
          var votesCollection = db.collection("votes");
          var votes = votesCollection.find({title : "Votes Registry"}).toArray(function (err, result) {
            if (err) {
              deferred.reject(err);
            } else if (result.length) {
              deferred.resolve(result[0]);
            } else {
              deferred.resolve(-1);
            }
            db.close();
          }); 
        }
      });
      
      return deferred.promise;
    }   

}




