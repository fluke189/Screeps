var roleUpgrader = require('role.upgrader');
//var roleBuilder = require('role.builder');

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
                                    structure.structureType == STRUCTURE_SPAWN) 
                                    && (structure.energy < structure.energyCapacity);
                        }
                });
                
                if(targets && creep.room.find(FIND_HOSTILE_CREEPS, {
                        filter: (structure) => 
                        {
                            return !Memory.allies.hasOwnProperty(structure.owner.username)
                        }
                }).length == 0) 
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
                        if(!creep.memory.isHarvesting)
                        {
                	        var construct = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                            if(construct) {
                                if(creep.build(construct) != -6)
                                {
                                    creep.moveTo(construct);
                                }
                            } 
                            else
                            {
                                roleUpgrader.run(creep);
                            }
                	    }
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