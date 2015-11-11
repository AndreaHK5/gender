module.exports = createapi;

var votesPath = "./Storage/votes.json";
var storage = require('./Storage.js').call({}, votesPath);

function createapi(voteHash) {
    'use strict';

    return {
      PutVote : PutVote,
      GetVotes : GetVotes
    }

    voteHash = { male: 0, female: 0  };

    function PutVote(req, res) {
        // validation
        voteHash = storage.Read();
        if (!("gender" in req.body ) || !(req.body.gender in voteHash)) {
            res.status(200).send("bad request, please send 'gender' as 'male' or 'female' in a literal");
            return;
        }
        voteHash[req.body.gender] = voteHash[req.body.gender] + 1;
        // update
        storage.Update(voteHash);
        //response
        res.status(200).send("ok");
    }   

    function GetVotes(req, res) {
        res.status(200).send(storage.Read());
    }; 
}





