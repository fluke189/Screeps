var roleMobileUpgrader = {

    run: function(creep) {
        if(Game.flags.Room2 && creep.room != Game.flags.Room2.room)
        {
            creep.moveTo(Game.flags.Room2);
        }
        else
        {
            if(creep.carry.energy == 0) {
                creep.memory.upgrading = false;
    	    }
    
    	    if(creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.upgrading = true;
    	    }
    
    	    if(creep.memory.upgrading) {
    	        var targets = creep.room.controller;
                if(targets) {
                    creep.signController('Hello friends! This is a test.');
                    if(creep.upgradeController(targets) != -6) {
                        creep.moveTo(targets);
                    }
    	        }
    	    }
    	    else {
    	        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
    	    }
    	}
    }
};


module.exports = roleMobileUpgrader;