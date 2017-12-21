var roleUpgrader = require('role.upgrader');

var roleHarvester = {

    run: function(creep) {
	    if(creep.carry.energy == 0) {
            creep.memory.isHarvesting = true;
        }
        else if(creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.isHarvesting = false;
        }
        
        if(!creep.memory.isHarvesting)
        {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                         return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_STORAGE) 
                                && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets) 
            {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            else
            {
                targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                         return (structure.structureType == STRUCTURE_TOWER) 
                                && structure.energy < structure.energyCapacity;
                    }
                });
                if(targets) 
                {
                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }
            }
        }
        else
        {
            var sources = creep.room.find(FIND_SOURCES);
            var index = 0;
            while(index < sources.length)
            {
                var test = creep.harvest(sources[index]);
                console.log(test);
                if(test != -6) 
                {
                    creep.moveTo(sources[index]);
                    index = sources.length;
                }
                index = index + 1;
            }
            
        }
	}
};

module.exports = roleHarvester;