var roleHealer = {
    run: function(creep) 
    {
        targets = creep.room.find(FIND_MY_CREEPS);
        
        if(targets)
        {
            //targets.sort(function(a.hits > b.hits);
        }
        
        if(Game.flags.Heal && creep.room != Game.flags.Heal.room)
        {
            if(targets)
            {
                creep.heal(targets[0]);
            }
            creep.moveTo(Game.flags.Tank);
            if(creep.hits < creep.hitsMax)
            {
                creep.heal(creep);
            }
        }
        else if(targets)
        {
            if(targets[0].hitsMax / targets[0].hits < creep.hitsMax / creep.hits)
            {
                if(creep.heal(targets[0]) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targets[0]);
                }
                else
                {
                    creep.heal(creep);
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHealer;