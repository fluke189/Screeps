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
                if(creep.claimController(creep.room.controller) == 0) 
                {
                    var name = creep.room.name;
                    Memory.rooms[name] = {};
                    Memory.rooms[name].numHarvesters = 0;
                    Memory.rooms[name].numUpgraders = 0;
                    Memory.rooms[name].numBuilders = 0;
                }
            }
        }
    }
};

module.exports = roleClaimer;