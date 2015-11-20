module.exports = createapi;

function createapi(votesService) {
    'use strict';

    return {
      PutVote : PutVote,
      GetVotes : GetVotes,
      ResetVotes : ResetVotes
    }

    function PutVote(req, res) {
        if (!("gender" in req.body) || (['male','female'].indexOf(req.body.gender) == -1)) {
            res.status(200).send({error: "bad request, please send 'gender' as 'male' or 'female' in a literal"});
            return;
        }
        votesService.addVote(req.body.gender).then(onsuccess, onfailure);

        function onsuccess(){
            res.status(200).send({message: "ok"});
        }
    }

    function GetVotes(req, res) {
        votesService.retrieveVotes().then(onsuccess, onfailure);
        function onsuccess(result){
            res.status(200).send(result);
        }
    };

    function ResetVotes(req, res) {
        votesService.resetVotes().then(onsuccess, onfailure);
        function onsuccess(){
            res.status(200).send({message:"votes reset"});
        }
    }

    function onfailure(err) {
        res.status(500).send({error : "server error " + err});
    }

}





