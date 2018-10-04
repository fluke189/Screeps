/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.remoteWorker');
 * mod.thing == 'a thing'; // true
 */

var remoteWorker = 
{
    run: function(creep)
    {
        if(creep.carry.energy == 0) 
        {
                creep.memory.isHarvesting = true;
        }
        else if(creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.isHarvesting = false;
        }
        
        var isHarvesting = creep.memory.isHarvesting;
        
        
        if(isHarvesting)
        {
            if(Game.flags.remoteHarvest && creep.room != Game.flags.remoteHarvest.room)
            {
                creep.moveTo(Game.flags.remoteHarvest);
            }
            else if(Game.flags.remoteHarvest && creep.room == Game.flags.remoteHarvest.room)
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
        else
        {
            if(Game.flags.remoteWork && creep.room != Game.flags.remoteWork.room)
            {
                creep.moveTo(Game.flags.remoteWork);
            }
            else if(Game.flags.remoteWork && creep.room == Game.flags.remoteWork.room)
            {
                if(creep.memory.building && creep.carry.energy == 0)
        	    {
                    creep.memory.building = false;
        	    }
        
        	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity)
        	    {
        	        creep.memory.building = true;
        	    }
        
        
        	    if(creep.memory.building) {
        	        var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if(targets) {
                        if(creep.build(targets) != -6) {
                            creep.moveTo(targets);
                        }
                    }
                    else
                    {
                        targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax * 9/10 && s.structureType != STRUCTURE_WALL});
                        if(targets) 
                        {
                            if(creep.repair(targets) != 0)
                            {
                                creep.moveTo(targets);   
                            }
                        }
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
            }
        }
    }
}

module.exports = remoteWorker;