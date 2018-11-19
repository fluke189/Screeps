var roleUpgrader = require ('role.upgrader');

var roleClaimer = {
    run: function(creep) 
    {
        if(Game.flags.NewColony)
        {
            if(creep.room != Game.flags.NewColony.room)
            {
                creep.moveTo(Game.flags.NewColony);
            }
            if(creep.room == Game.flags.NewColony.room){
                if(creep.room.controller)
                {
                    creep.moveTo(creep.room.controller);
                    creep.signController(creep.room.controller, "Domain of the Principality of Antioch [PoA]");
                    if(creep.claimController(creep.room.controller) == 0) 
                    {
                        var name = creep.room.name;
                        Memory.rooms[name] = {};
                        Memory.rooms[name].numHarvesters = 0;
                        Memory.rooms[name].numUpgraders = 0;
                        Memory.rooms[name].numBuilders = 0;
                        Memory.rooms[name].numSources;
                        Memory.rooms[name].sourceIds = [];
                        Memory.rooms[name].defcon = 5;
                        Memory.rooms[name].Type = "Colony";
                    }
                }
            }
        }
        else if(Game.flags.NewRemoteMine)
        {
            if(creep.room != Game.flags.NewRemoteMine.room)
            {
                creep.moveTo(Game.flags.NewRemoteMine);
            }
            if(creep.room = Game.flags.NewRemoteMine.room){
                if(creep.room.controller)
                {
                    creep.moveTo(creep.room.controller);
                    if(creep.claimController(creep.room.controller) == 0) 
                    {
                        var name = creep.room.name;
                        Memory.rooms[name] = {};
                        Memory.rooms[name].numSources;
                        Memory.rooms.sourceIds = [];
                        Memory.rooms[name].defcon = 5;
                        Memory.rooms[name].Type = "Remote";
                        Memory.rooms[name].MotherColony = creep.memory.home;
                        creep.signController(targets, "Remote Room of the Principality of Antioch [PoA]");
                    }
                }
            }
        }
    }
};

module.exports = roleClaimer;