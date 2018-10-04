var roleUpgrader = {

    run: function(creep) {

	    if(creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }

	    if(creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }


	    if(creep.memory.upgrading) {
	        var targets = creep.room.controller;
            if(targets) 
            {
                creep.upgradeController(targets);
                creep.moveTo(targets);
                creep.signController(targets, "Domain of the Principality of Antioch [PoA]");
	        }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
                var i = 0;
                while(i < sources.length)
                {
                    if(sources[i].energy > 0)
                    {
                        creep.harvest(sources[i]);
                        creep.moveTo(sources[i]);
                        i = sources.length;
                    }
                    i++;
                }
	    }
	    if(creep.room != Game.rooms[creep.memory.home])
        {
            creep.moveTo(Game.rooms[creep.memory.home].controller);
        }
	}
};


module.exports = roleUpgrader;