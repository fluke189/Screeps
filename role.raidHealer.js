var roleRaidHealer = 
{
    run: function(creep)
    {
        var raider;
        if(creep.hits < creep.hitsMax)
        {
            creep.heal(creep);
        }
        
        if(creep.memory.raider)
        {
            raider = game.getObjectById(creep.memory.raider);
            if(raider)
            {
                creep.moveTo(raider);
                if(creep.hits == creep.hitsMax)
                {
                    creep.heal(raider);
                }
            }
            else
            {
                creep.memory.raider = false;
            }
        }
        if(!creep.memory.raider)
        {
            if(Game.flags.RaidCamp)
            {
                creep.moveTo(Game.flags.RaidCamp);
            }
            if(creep.room == Game.flags.RaidCamp.room)
            {
                
            }
        }
    }
};


module.exports = roleRaidHealer