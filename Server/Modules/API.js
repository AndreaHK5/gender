module.exports = createapi;

function createapi(voteHash) {
    'use strict';

    return {
      PutVote : PutVote,
      GetVotes : GetVotes
    }

    voteHash = voteHash || { male: 0, female: 0  };

    function PutVote(req, res) {
        // validation
        console.log(req.body);
        if (!("gender" in req.body ) || !(req.body.gender in voteHash)) {
            res.status(200).send("bad request, please send 'gender' as 'male' or 'female' in a literal");
            return;
        }
        // update of hash
        voteHash[req.body.gender] = voteHash[req.body.gender] + 1;
        //response
        console.log(voteHash);
        res.status(200).send("ok");
    }   

    function GetVotes(req, res) {
        res.status(200).send(voteHash);
    }; 
}





