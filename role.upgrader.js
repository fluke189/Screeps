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
            if(targets) {
                if(creep.upgradeController(targets) != -6) {
                    creep.moveTo(targets);
                }
	        }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};


module.exports = roleUpgrader;