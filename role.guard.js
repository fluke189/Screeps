var roleGuard = 
{
    run: function(creep)
    {
        
        if(Game.flags.Guard)
        {
            creep.moveTo(Game.flags.Guard);
            
            if(creep.room == Game.flags.Guard.room)
            {
                var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                    filter: (structure) => 
                    {
                        return !Memory.allies.hasOwnProperty(structure.owner.username)
                    }
                });
                if(target)
                {
                    creep.moveTo(target);
                    creep.attack(target);
                    creep.rangedAttack(target);
                    creep.heal(creep);
                }
            }
        }
    }
};

module.exports = roleGuard;