var roleUpgrader = {

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
            if(creep.carry.energy == 0)
            {
                creep.memory.upgrading = false;
    	    }
    
    	    if(creep.carry.energy == creep.carryCapacity)
    	    {
    	        creep.memory.upgrading = true;
    	    }
    
    	    if(creep.memory.upgrading) 
    	    {
    	        var targets = creep.room.controller;
                if(targets) 
                {
                    if(creep.upgradeController(targets) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targets);
                    }
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


module.exports = roleUpgrader;