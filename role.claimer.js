var roleClaimer = {
    run: function(creep) {
        if(creep.room != Game.flags.Claim.room)
        {
            creep.moveTo(Game.flags.Claim, {visualizePathStyle: {stroke: '#8a2be2'}});
        }
        if(creep.room = Game.flags.Claim.room){
            if(creep.room.controller){
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#8a2be2'}});
                }
            }
        }
    }
};

module.exports = roleClaimer;