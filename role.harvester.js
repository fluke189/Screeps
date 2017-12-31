var roleUpgrader = require('role.upgrader');

var roleHarvester = {

    run: function(creep) 
    {
        if(creep.room != Game.rooms[creep.memory.home])
        {
            creep.moveTo(Game.rooms[creep.memory.home].controller);
        }
        else
        {
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
                    else
                    {
                        roleUpgrader.run(creep);
                    }
                }
            }
            else
            {
                var sources = creep.room.find(FIND_SOURCES);
                var i = sources.length;
                while(i > 0)
                {
                    if(sources[i- 1].energy > 0)
                    {
                        creep.harvest(sources[i- 1]);
                        creep.moveTo(sources[i - 1]);
                        i = 0;
                    }
                    i--;
                }
            }
        }
	}
};

module.exports = roleHarvester;