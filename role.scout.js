var roleScout = {
    run: function(creep) 
    {
        if(creep.hits < creep.hitsMax * .7)
        {
            creep.memory.hurt = true;
        }
        else
        {
            creep.memory.hurt = false;
        }
        
        if(creep.memory.hurt)
        {
            var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            var structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
            
            if(Game.flags.Heal && creep.room != Game.flags.Heal.room)
            {
                creep.moveTo(Game.flags.Heal);
                creep.rangedAttack(target);
                if(creep.hits < creep.hitsMax)
                {
                    creep.heal(creep);
                }
            }
            else
            {
                creep.moveTo(Game.rooms[Memory.creeps[creep.name].home].controller);
            }
            if(target) 
            {
                if(creep.rangedAttack(target) != 0)
                {
                    creep.heal(creep);
                }
            }
            else if(structure)
            {
                if(creep.rangedAttack(structure) != 0)
                {
                    creep.heal(creep);
                }
                if(creep.hits < creep.hitsMax)
                {
                    creep.heal(creep);
                }
            }
            else
            {
                creep.heal(creep);
            }
        }
        else
        {
            var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            var structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
            
            if(Game.flags.Scout && creep.room != Game.flags.Scout.room)
            {
                creep.moveTo(Game.flags.Scout);
                if(creep.hits < creep.hitsMax)
                {
                    creep.heal(creep);
                }
            }
            
            else if(target) 
            {
                if(creep.rangedAttack(target) != 0)
                {
                    creep.heal(creep);
                    creep.moveTo(target);
                }
            }
            else if(structure)
            {
                if(creep.rangedAttack(structure) != 0)
                {
                    creep.heal(creep);
                    creep.moveTo(structure);
                }
                if(creep.hits < creep.hitsMax)
                {
                    creep.heal(creep);
                }
            }
            else
            {
                creep.heal(creep);
            }
        }
        
        
    }
};

module.exports = roleScout;