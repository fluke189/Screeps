var roleHealer = {
    run: function(creep) 
    {
        target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: (s) => s.hits < s.hitsMax });
        
        
        if(Game.flags.Heal && creep.room != Game.flags.Heal.room)
        {
            if(target)
            {
                creep.heal(target);
            }
            
            if(creep.memory.hasOwnProperty("checkpoint"))
            {
                checkpoint = "checkpoint" + creep.memory.checkpoint;
                
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
                    creep.moveTo(Game.flags.Heal);
                }
            }
            
            else if(target)
            {
                creep.heal(target);
            }
        }
        else if(target)
        {
            creep.heal(target);
            creep.moveTo(target);
        }
        else if(!target && Game.flags.Heal)
        {
            creep.moveTo(Game.flags.Heal);
        }
        
        
        if(creep.hits < creep.hitsMax)
        {
            creep.heal(creep);
        }
    }
};

module.exports = roleHealer;