var roleUpgrader = require ('role.upgrader');

var roleClaimer = {
    run: function(creep) {
        if(creep.room != Game.flags.Claim.room)
        {
            creep.moveTo(Game.flags.Claim, {visualizePathStyle: {stroke: '#8a2be2'}});
        }
        if(creep.room = Game.flags.Claim.room){
            if(creep.room.controller)
            {
                creep.moveTo(creep.room.controller);
                if(creep.claimController(creep.room.controller) == ERR_INVALID_TARGET) 
                {
                    roleUpgrader.run(creep);
                }
            }
        }
    }
};

module.exports = roleClaimer;