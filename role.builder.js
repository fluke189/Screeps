var roleHarvester = require('role.harvester');
var roleBuilder = {

    run: function(creep) 
    {
        if(creep.memory.hasOwnProperty("checkpoint") && creep.room.name != creep.memory.home)
        {
            checkpoint = "WorkCheckpoint" + creep.memory.checkpoint;
            
            if(Game.flags[checkpoint])
            {
                if(creep.pos.x == Game.flags[checkpoint].pos.x && creep.pos.y == Game.flags[checkpoint].pos.y)
                {
                    creep.memory.checkpoint++;
                }
                creep.moveTo(Game.flags[checkpoint]);
            }
            else
            {
                creep.moveTo(Game.rooms[creep.memory.home].controller);
            }
        }
        
        else
        {
            if(creep.memory.building && creep.carry.energy == 0)
    	    {
                creep.memory.building = false;
    	    }
    
    	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity)
    	    {
    	        creep.memory.building = true;
    	    }
    
    
    	    if(creep.memory.building)
    	    {
    	        var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(targets) {
                    if(creep.build(targets) != -6) {
                        creep.moveTo(targets);
                    }
                } else {
                    roleHarvester.run(creep);
                }
    	    }
    	    else 
    	    {
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
};

module.exports = roleBuilder;