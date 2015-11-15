module.exports = createapi;

function createapi(storage) {
    'use strict';

    return {
      PutVote : PutVote,
      GetVotes : GetVotes,
      ResetVotes : ResetVotes
    }

    function PutVote(req, res) {
        // validation
        var blank = getBlank();
        if (!("gender" in req.body) || !(req.body.gender in blank)) {
            res.status(200).send({error: "bad request, please send 'gender' as 'male' or 'female' in a literal"});
            return;
        }
        var voteHash = storage.Read();
        if (voteHash == -1) {
            voteHash = getBlank();
        }
        voteHash[req.body.gender] = voteHash[req.body.gender] + 1;
        // update
        storage.Update(voteHash);
        //response
        res.status(200).send("ok");
    }

    function GetVotes(req, res) {
        var result = storage.Read();
        if (result == -1) {
            result = getBlank();
            storage.Update(result);
        }
        res.status(200).send(result);

    };

    function ResetVotes(req, res) {
        storage.Update(getBlank());
        res.status(200).send({message: "votes reset"});
    }


    function getBlank(){
        return { male: 0, female: 0  };
    }
}





